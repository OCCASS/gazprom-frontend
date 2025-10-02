"use client"

import { useRef, useEffect, useState } from "react";
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

function cleanUpPlayButtons() {
    const playButtons = document.querySelectorAll("#excalibur-play-root");

    playButtons.forEach((playButton) => {
        if (playButton.parentNode) {
            playButton.parentNode.removeChild(playButton);
        }
    });
}

export const Game = ({ tips, endDialog, onComplete, nextLevel }: { tips: string[], endDialog: DialogItem[], onComplete: ({ score: number }) => void, nextLevel: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<Engine>(null);
    const isPausedRef = useRef(false); // Добавляем ref для паузы
    const [gameResult, setGameResult] = useState<GameResult | null>(null)
    const [gameOver, setGameOver] = useState(false)
    const [showTip, setShowTip] = useState(false)
    const [tip, setTip] = useState<string>()
    const [showEndDialog, setShowEndDialog] = useState(true)

    const resetGame = () => {
        if (gameRef.current) {
            gameRef.current.stop();
        }
        cleanUpPlayButtons();
    };

    useEffect(() => {
        isPausedRef.current = showTip;
    }, [showTip]);

    const updateRestoreHealthAt = () => {
        const restoreAt = localStorage.getItem("restoreHealthAt")
        const newDate = Date.now() + 8 * 60 * 60 * 1000
        if (!restoreAt) {
            localStorage.setItem("restoreHealthAt", `${newDate}`)
            return
        }
        const restoreAtDate = new Date(Number.parseInt(restoreAt))
        const now = new Date()
        if (restoreAtDate < now) {
            localStorage.setItem("restoreHealthAt", `${newDate}`)
            return
        }
    }

    useEffect(() => {
        resetGame();

        const initialHealth = Number.parseInt(localStorage.getItem("health") ?? `${MAX_HEALTH}`)
        import("./game").then(({ initialize, start }) => {
            if (canvasRef.current) {
                gameRef.current = initialize(canvasRef.current);
                start(
                    gameRef.current,
                    initialHealth,
                    tips.length,
                    (result: GameResult) => {
                        setGameResult(result)
                        setGameOver(true)
                        onComplete({ score: result.score })
                        updateRestoreHealthAt()
                        gameRef?.current?.stop()
                    },
                    (number: number) => {
                        setShowTip(true)
                        setTip(tips[number - 1])
                    },
                    () => isPausedRef.current
                );
            }
        });

        return () => {
            gameRef?.current?.stop()
        };
    }, []);

    return <>
        {!gameOver && <canvas ref={canvasRef} className={twMerge(showTip && "hidden")}></canvas>}
        {(!gameOver && showTip) &&
            <div className="w-full h-full" onClick={() => setShowTip(false)}>
                <FromBackground className="fixed bottom-0 inset-x-0 z-1" />
                <div className="absolute inset-x-6 bottom-32 bg-white rounded-2xl z-2" >
                    <div className="relative p-6 pt-8">
                        <p className="leading-[1.4]">{tip}</p>
                        <div className="absolute top-0 -translate-y-1/2 left-0 bg-[#1919ef] text-white px-6 py-2 rounded-lg">
                            Миша
                        </div>
                    </div>
                </div>
            </div>
        }
        {gameOver && (
            (showEndDialog && gameResult?.success) ?
                <Dialog dialog={endDialog} onComplete={() => setShowEndDialog(false)} />
                :
                <div className="p-4 flex flex-col items-center gap-4">
                    {
                        gameResult?.success ?
                            <HappyHead width={128} height={128} />
                            :
                            <SadHead width={128} height={128} />
                    }
                    <div className="relative w-full">
                        <ResultBanner className="" />
                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-halvar text-2xl font-bold leading-none">
                            {gameResult?.success ? "УСПЕХ" : "GAME OVER"}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                        <p className="text-[#060698] font-halvar font-bold text-4xl leading-none">{gameResult?.score}</p>
                        <p className="font-halvar leading-none text-lg font-medium">очков</p>
                    </div>
                    {
                        !gameResult?.success &&
                        <Countdown />
                    }
                    {
                        gameResult?.success &&
                        <button onClick={nextLevel} className="cursor-pointer">Следующий уроввень</button>
                    }
                </div>
        )
        }
    </>
};
