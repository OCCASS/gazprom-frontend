"use client";

import { useState, useEffect } from "react";
type Step = {
    selector: string;
    description: string
    text: string;
};
export default function Tour({
    steps,
    children,
}: {
    steps: Step[];
    children: React.ReactNode;
}) {
    const [currentStep, setCurrentStep] = useState(0);
    const [runTour, setRunTour] = useState(true);
    const [highlightPos, setHighlightPos] = useState<{
        top: number;
        left: number;
        width: number;
        height: number;
    } | null>(null);
    useEffect(() => {
        // const completed = localStorage.getItem("siteTourCompleted");
        // if (!completed) setRunTour(true);
    }, []);
    useEffect(() => {
        if (!runTour || currentStep >= steps.length) return;
        const element = document.querySelector(steps[currentStep].selector);
        if (!element) return;
        const updatePosition = () => {
            const rect = element.getBoundingClientRect();
            setHighlightPos({
                top: rect.top - 8,
                left: rect.left - 8,
                width: rect.width + 16,
                height: rect.height + 16,
            });
        };
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        updatePosition();
        window.addEventListener("scroll", updatePosition);
        return () => window.removeEventListener("scroll", updatePosition);
    }, [currentStep, runTour, steps]);
    const handleClick = () => {
        const nextStep = currentStep + 1;
        if (nextStep >= steps.length) {
            setRunTour(false);
            localStorage.setItem("siteTourCompleted", "true");
        } else {
            setCurrentStep(nextStep);
        }
    };
    if (!runTour || !highlightPos) return <>{children}</>;
    const buttonTop =
        highlightPos.top + highlightPos.height + 10 + 20 > window.innerHeight
            ? highlightPos.top - 20
            : highlightPos.top + highlightPos.height + 5;
    const buttonLeft =
        highlightPos.left + 180 > window.innerWidth
            ? window.innerWidth - highlightPos.width * 2 - 10
            : highlightPos.left;
    return (
        <>
            {children}
            <div className="fixed inset-0 z-50 pointer-events-auto">
                <svg className="absolute inset-0 w-full h-full">
                    <defs>
                        <mask id="tour-mask">
                            <rect x="0" y="0" width="100%" height="100%" fill="white" />
                            <rect
                                x={highlightPos.left}
                                y={highlightPos.top}
                                width={highlightPos.width}
                                height={highlightPos.height}
                                rx="12"
                                fill="black"
                            />
                        </mask>
                    </defs>
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        mask="url(#tour-mask)"
                        fill="rgba(0,0,0,0.3)"
                    />
                </svg>
                <div
                    className="absolute border-2 border-[#2B61EC] rounded-xl pointer-events-auto bg-transparent"
                    style={{
                        top: highlightPos.top,
                        left: highlightPos.left,
                        width: highlightPos.width,
                        height: highlightPos.height,
                    }}
                ></div>
                <div
                    className="absolute z-60 space-y-2 p-1"
                    style={{
                        top: buttonTop,
                        left: buttonLeft,
                    }}
                >
                    <p className="text-white text-sm">{steps[currentStep].description}</p>
                    <button
                        onClick={handleClick}
                        className="px-4 py-2 bg-[#2b61ec] text-white rounded shadow-lg cursor-pointer"
                    >
                        {steps[currentStep].text}
                    </button>
                </div>
            </div>
        </>
    );
}
