"use client"

import React, { useRef, useEffect } from "react";

interface InteractiveLevelProps {
    SvgComponent: React.ComponentType;
    completedLevels?: number[];
    unlockedLevels?: number[];
    onLevelClick?: (level: number) => void;
}

const InteractiveLevel: React.FC<InteractiveLevelProps> = ({
    SvgComponent,
    unlockedLevels = [],
    onLevelClick
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const svgElement = containerRef.current.querySelector("svg");
        if (!svgElement) return;

        const levels = svgElement.querySelectorAll("[id^='level_']");
        const locks = svgElement.querySelectorAll("[id^='lock_']");

        levels.forEach((level) => {
            const levelId = level.getAttribute("id");
            const levelNumber = parseInt(levelId?.replace("level_", "") || "0");

            if (unlockedLevels.includes(levelNumber)) {
                (level as SVGElement).style.cursor = "pointer";
                (level as SVGElement).style.transition = "opacity 0.2s ease";

                const handleMouseEnter = () => {
                    (level as SVGElement).style.opacity = "0.8";
                };

                const handleMouseLeave = () => {
                    (level as SVGElement).style.opacity = "1";
                };

                const handleClick = () => {
                    if (onLevelClick) {
                        onLevelClick(levelNumber);
                    }
                };

                level.addEventListener("mouseenter", handleMouseEnter);
                level.addEventListener("mouseleave", handleMouseLeave);
                level.addEventListener("click", handleClick);

                return () => {
                    level.removeEventListener("mouseenter", handleMouseEnter);
                    level.removeEventListener("mouseleave", handleMouseLeave);
                    level.removeEventListener("click", handleClick);

                };
            } else {
                (level as SVGElement).style.cursor = "not-allowed";
            }
        });

        locks.forEach((lock) => {
            const lockId = lock.getAttribute("id");
            const levelNumber = parseInt(lockId?.replace("lock_", "") || "0");

            if (!unlockedLevels.includes(levelNumber)) {
                (lock as SVGElement).style.display = "block";
            } else {
                (lock as SVGElement).style.display = "none";
            }
        });
    }, [unlockedLevels, onLevelClick]);

    return (
        <div ref={containerRef} style={{ display: "inline-block", userSelect: "none", width: "100%" }}>
            <SvgComponent />
        </div>
    );
};

export default InteractiveLevel;
