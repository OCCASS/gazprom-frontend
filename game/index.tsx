"use client"

import { useRef, useEffect, useState, useCallback } from "react";
import type { Engine } from "excalibur";
import SadHead from "@/components/icons/SadHead";
import ResultBanner from "@/components/icons/ResultBanner";
import { GameResult } from "./types";
import HappyHead from "@/components/icons/HappyHead";
import { twMerge } from "tailwind-merge";
import Dialog, { DialogItem } from "@/components/Dialog/Dialog";
import FromBackground from "@/components/Dialog/FromBackground";
import { MAX_HEALTH } from "./constants";
import Countdown from "./components/Countdown";
import BackButton from "@/components/BackButton";

const HEALTH_RESTORE_DELAY_MS = 8 * 60 * 60 * 1000; // 8 часов
const STORAGE_KEYS = {
    HEALTH: "health",
    RESTORE_HEALTH_AT: "restoreHealthAt"
} as const;

interface GameProps {
    tips: string[];
    endDialog: DialogItem[];
    onComplete: (result: { score: number }) => void;
    nextLevel: () => void;
}

const useHealthStorage = () => {
    const getInitialHealth = useCallback((): number => {
        const storedHealth = localStorage.getItem(STORAGE_KEYS.HEALTH);
        return storedHealth ? Number.parseInt(storedHealth) : MAX_HEALTH;
    }, []);

    const updateRestoreHealthTime = useCallback(() => {
        const restoreAt = localStorage.getItem(STORAGE_KEYS.RESTORE_HEALTH_AT);
        const newRestoreTime = Date.now() + HEALTH_RESTORE_DELAY_MS;

        if (!restoreAt) {
            localStorage.setItem(STORAGE_KEYS.RESTORE_HEALTH_AT, `${newRestoreTime}`);
            return;
        }

        const restoreAtDate = new Date(Number.parseInt(restoreAt));
        const now = new Date();

        if (restoreAtDate < now) {
            localStorage.setItem(STORAGE_KEYS.RESTORE_HEALTH_AT, `${newRestoreTime}`);
        }
    }, []);

    return { getInitialHealth, updateRestoreHealthTime };
};

const TipOverlay = ({ tip, onClose }: { tip: string; onClose: () => void }) => (
    <div className="w-full h-full" onClick={onClose}>
        <FromBackground className="fixed bottom-0 inset-x-0 z-1" />
        <div className="absolute inset-x-6 bottom-32 bg-white rounded-2xl z-2">
            <div className="relative p-6 pt-8">
                <p className="leading-[1.4]">{tip}</p>
                <div className="absolute top-0 -translate-y-1/2 left-0 bg-[#1919ef] text-white px-6 py-2 rounded-lg">
                    Миша
                </div>
            </div>
        </div>
    </div>
);

const GameResultScreen = ({
    result,
    onNextLevel
}: {
    result: GameResult;
    onNextLevel: () => void;
}) => (
    <div className="p-4 flex flex-col items-center gap-4">
        <div className="w-full">
            <BackButton />
        </div>
        {result.success ? (
            <HappyHead width={128} height={128} />
        ) : (
            <SadHead width={128} height={128} />
        )}

        <div className="relative w-full">
            <ResultBanner />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-halvar text-2xl font-bold leading-none">
                {result.success ? "УСПЕХ" : "GAME OVER"}
            </p>
        </div>

        <div className="flex flex-col gap-1 items-center">
            <p className="text-[#060698] font-halvar font-bold text-4xl leading-none">
                {result.score}
            </p>
            <p className="font-halvar leading-none text-lg font-medium">очков</p>
        </div>

        {!result.success && <Countdown />}

        {result.success && (
            <button
                onClick={onNextLevel}
                className="cursor-pointer px-6 py-3 bg-[#1919ef] text-white rounded-lg font-halvar font-bold hover:bg-[#1414cc] transition-colors"
            >
                Следующий уровень
            </button>
        )}
    </div>
);

export const Game = ({ tips, endDialog, onComplete, nextLevel }: GameProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<Engine | null>(null);
    const isPausedRef = useRef(false);
    const isInitializingRef = useRef(false);
    const hasInitializedRef = useRef(false);

    const [gameResult, setGameResult] = useState<GameResult | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [showTip, setShowTip] = useState(false);
    const [currentTip, setCurrentTip] = useState<string>();
    const [showEndDialog, setShowEndDialog] = useState(true);

    const { getInitialHealth, updateRestoreHealthTime } = useHealthStorage();

    useEffect(() => {
        isPausedRef.current = showTip;
    }, [showTip]);

    const onCompleteRef = useRef(onComplete);
    const tipsRef = useRef(tips);

    useEffect(() => {
        onCompleteRef.current = onComplete;
        tipsRef.current = tips;
    }, [onComplete, tips]);

    const handleGameEnd = useCallback((result: GameResult) => {
        setGameResult(result);
        setGameOver(true);
        if (result.success) onCompleteRef.current({ score: result.score });
        updateRestoreHealthTime();
        gameRef.current?.stop();
    }, [updateRestoreHealthTime]);

    const handleSpecialItemCollect = useCallback((tipIndex: number) => {
        setShowTip(true);
        setCurrentTip(tipsRef.current[tipIndex - 1]);
    }, []);

    const isPaused = useCallback(() => isPausedRef.current, []);

    const handleCloseTip = useCallback(() => {
        setShowTip(false);
    }, []);

    const handleDialogComplete = useCallback(() => {
        setShowEndDialog(false);
    }, []);

    useEffect(() => {
        if (hasInitializedRef.current) {
            console.log("⚠️ Game already initialized, skipping...");
            return;
        }

        const stopGame = () => {
            if (gameRef.current) {
                console.log("🛑 Stopping game...");
                gameRef.current.stop();
                gameRef.current = null;
            }
        };

        const initGame = async () => {
            if (!canvasRef.current || isInitializingRef.current) {
                console.log("⚠️ Init blocked - no canvas or already initializing");
                return;
            }

            isInitializingRef.current = true;
            hasInitializedRef.current = true;
            console.log("🎮 Starting new game...");

            try {
                const initialHealth = getInitialHealth();
                const { initialize, start } = await import("./game");

                if (!canvasRef.current) {
                    console.log("⚠️ Canvas disappeared during init");
                    return;
                }

                gameRef.current = initialize(canvasRef.current);

                await start(
                    gameRef.current,
                    initialHealth,
                    tipsRef.current.length,
                    handleGameEnd,
                    handleSpecialItemCollect,
                    isPaused
                );

                console.log("✅ Game started successfully");
            } catch (error) {
                console.error("❌ Failed to start game:", error);
                hasInitializedRef.current = false;
            } finally {
                isInitializingRef.current = false;
            }
        };

        initGame();

        return () => {
            console.log("🧹 Cleanup called");
            stopGame();
        };
    }, []);

    const renderGame = () => {
        if (gameOver) {
            if (showEndDialog && gameResult?.success) {
                return <Dialog dialog={endDialog} onComplete={handleDialogComplete} />;
            }
            if (gameResult) {
                return <GameResultScreen result={gameResult} onNextLevel={nextLevel} />;
            }
            return null;
        }

        return (
            <>
                <canvas
                    ref={canvasRef}
                    className={twMerge(showTip && "hidden")}
                />
                {showTip && currentTip && (
                    <TipOverlay tip={currentTip} onClose={handleCloseTip} />
                )}
            </>
        );
    };

    return <>{renderGame()}</>;
};
