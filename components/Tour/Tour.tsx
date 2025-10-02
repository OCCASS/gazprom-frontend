"use client";

import { redirect, RedirectType } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";

type Step = {
    selector: string;
    parentSelector?: string;
    text: string;
    canClick: boolean;
};

const TOOLTIP_WIDTH = 300;
const TOOLTIP_MIN_HEIGHT = 120;
const TOOLTIP_OFFSET = 16;
const ARROW_SIZE = 8;
const HIGHLIGHT_Z_INDEX = "9999";
const MAX_RETRY_ATTEMPTS = 20;
const RETRY_DELAY = 50;
const SCREEN_PADDING = 16;

type HighlightPosition = {
    top: number;
    left: number;
    width: number;
    height: number;
};

type TooltipPosition = {
    top: number;
    left: number;
    arrowPosition: 'top' | 'bottom' | 'left' | 'right';
    arrowOffset: number;
};

export default function Tour({
    steps,
    children,
}: {
    steps: Step[];
    children: React.ReactNode;
}) {
    const [currentStep, setCurrentStep] = useState(0);
    const [runTour, setRunTour] = useState(false);
    const [highlightPos, setHighlightPos] = useState<HighlightPosition | null>(null);
    const [targetElementPos, setTargetElementPos] = useState<HighlightPosition | null>(null);
    const [tooltipPos, setTooltipPos] = useState<TooltipPosition | null>(null);
    const [currentElement, setCurrentElement] = useState<HTMLElement | null>(null);
    const retryCountRef = useRef(0);
    const currentElementRef = useRef<HTMLElement | null>(null);
    const parentElementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const completedRaw = localStorage.getItem("siteTourCompleted");
        if (!completedRaw) setRunTour(true);
        else setRunTour(!JSON.parse(completedRaw));
    }, []);

    const completeTour = useCallback(() => {
        setRunTour(false);
        localStorage.setItem("siteTourCompleted", "true");
        redirect("/", RedirectType.push);
    }, []);

    const goToNextStep = useCallback(() => {
        const nextStep = currentStep + 1;
        if (nextStep >= steps.length) {
            completeTour();
        } else {
            setCurrentStep(nextStep);
            retryCountRef.current = 0;
        }
    }, [currentStep, steps.length, completeTour]);

    const getElementPosition = (element: Element): HighlightPosition => {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        };
    };

    const calculateTooltipPosition = (
        targetPos: HighlightPosition,
        highlightPos: HighlightPosition
    ): TooltipPosition => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Центр целевого элемента
        const targetCenterX = targetPos.left + targetPos.width / 2;
        const targetCenterY = targetPos.top + targetPos.height / 2;

        // Проверяем возможность размещения снизу от целевого элемента
        const spaceBelow = viewportHeight - (targetPos.top + targetPos.height);
        const spaceAbove = targetPos.top;
        const spaceRight = viewportWidth - (targetPos.left + targetPos.width);
        const spaceLeft = targetPos.left;

        const tooltipHeight = TOOLTIP_MIN_HEIGHT;
        const neededHeight = tooltipHeight + TOOLTIP_OFFSET + ARROW_SIZE;
        const neededWidth = TOOLTIP_WIDTH + TOOLTIP_OFFSET + ARROW_SIZE;

        let position: TooltipPosition;

        // Приоритет: снизу > сверху > справа > слева
        if (spaceBelow >= neededHeight) {
            // Размещаем снизу
            const top = targetPos.top + targetPos.height + TOOLTIP_OFFSET + ARROW_SIZE;
            let left = targetCenterX - TOOLTIP_WIDTH / 2;

            // Корректируем если выходит за границы
            if (left < SCREEN_PADDING) {
                left = SCREEN_PADDING;
            } else if (left + TOOLTIP_WIDTH > viewportWidth - SCREEN_PADDING) {
                left = viewportWidth - TOOLTIP_WIDTH - SCREEN_PADDING;
            }

            const arrowOffset = targetCenterX - left;

            position = {
                top,
                left,
                arrowPosition: 'top',
                arrowOffset: Math.max(ARROW_SIZE * 2, Math.min(arrowOffset, TOOLTIP_WIDTH - ARROW_SIZE * 2))
            };
        } else if (spaceAbove >= neededHeight) {
            // Размещаем сверху
            const top = targetPos.top - tooltipHeight - TOOLTIP_OFFSET - ARROW_SIZE;
            let left = targetCenterX - TOOLTIP_WIDTH / 2;

            if (left < SCREEN_PADDING) {
                left = SCREEN_PADDING;
            } else if (left + TOOLTIP_WIDTH > viewportWidth - SCREEN_PADDING) {
                left = viewportWidth - TOOLTIP_WIDTH - SCREEN_PADDING;
            }

            const arrowOffset = targetCenterX - left;

            position = {
                top: Math.max(SCREEN_PADDING, top),
                left,
                arrowPosition: 'bottom',
                arrowOffset: Math.max(ARROW_SIZE * 2, Math.min(arrowOffset, TOOLTIP_WIDTH - ARROW_SIZE * 2))
            };
        } else if (spaceRight >= neededWidth) {
            // Размещаем справа
            const left = targetPos.left + targetPos.width + TOOLTIP_OFFSET + ARROW_SIZE;
            let top = targetCenterY - tooltipHeight / 2;

            if (top < SCREEN_PADDING) {
                top = SCREEN_PADDING;
            } else if (top + tooltipHeight > viewportHeight - SCREEN_PADDING) {
                top = viewportHeight - tooltipHeight - SCREEN_PADDING;
            }

            const arrowOffset = targetCenterY - top;

            position = {
                top,
                left,
                arrowPosition: 'left',
                arrowOffset: Math.max(ARROW_SIZE * 2, Math.min(arrowOffset, tooltipHeight - ARROW_SIZE * 2))
            };
        } else if (spaceLeft >= neededWidth) {
            // Размещаем слева
            const left = targetPos.left - TOOLTIP_WIDTH - TOOLTIP_OFFSET - ARROW_SIZE;
            let top = targetCenterY - tooltipHeight / 2;

            if (top < SCREEN_PADDING) {
                top = SCREEN_PADDING;
            } else if (top + tooltipHeight > viewportHeight - SCREEN_PADDING) {
                top = viewportHeight - tooltipHeight - SCREEN_PADDING;
            }

            const arrowOffset = targetCenterY - top;

            position = {
                top,
                left: Math.max(SCREEN_PADDING, left),
                arrowPosition: 'right',
                arrowOffset: Math.max(ARROW_SIZE * 2, Math.min(arrowOffset, tooltipHeight - ARROW_SIZE * 2))
            };
        } else {
            // Fallback: размещаем где больше места
            const maxSpace = Math.max(spaceBelow, spaceAbove, spaceRight, spaceLeft);

            if (maxSpace === spaceBelow || maxSpace === spaceAbove) {
                const top = maxSpace === spaceBelow
                    ? targetPos.top + targetPos.height + TOOLTIP_OFFSET + ARROW_SIZE
                    : viewportHeight - tooltipHeight - SCREEN_PADDING;

                let left = targetCenterX - TOOLTIP_WIDTH / 2;
                if (left < SCREEN_PADDING) {
                    left = SCREEN_PADDING;
                } else if (left + TOOLTIP_WIDTH > viewportWidth - SCREEN_PADDING) {
                    left = viewportWidth - TOOLTIP_WIDTH - SCREEN_PADDING;
                }

                const arrowOffset = targetCenterX - left;

                position = {
                    top: Math.max(SCREEN_PADDING, Math.min(top, viewportHeight - tooltipHeight - SCREEN_PADDING)),
                    left,
                    arrowPosition: maxSpace === spaceBelow ? 'top' : 'bottom',
                    arrowOffset: Math.max(ARROW_SIZE * 2, Math.min(arrowOffset, TOOLTIP_WIDTH - ARROW_SIZE * 2))
                };
            } else {
                const left = maxSpace === spaceRight
                    ? targetPos.left + targetPos.width + TOOLTIP_OFFSET + ARROW_SIZE
                    : viewportWidth - TOOLTIP_WIDTH - SCREEN_PADDING;

                let top = targetCenterY - tooltipHeight / 2;
                if (top < SCREEN_PADDING) {
                    top = SCREEN_PADDING;
                } else if (top + tooltipHeight > viewportHeight - SCREEN_PADDING) {
                    top = viewportHeight - tooltipHeight - SCREEN_PADDING;
                }

                const arrowOffset = targetCenterY - top;

                position = {
                    top,
                    left: Math.max(SCREEN_PADDING, Math.min(left, viewportWidth - TOOLTIP_WIDTH - SCREEN_PADDING)),
                    arrowPosition: maxSpace === spaceRight ? 'left' : 'right',
                    arrowOffset: Math.max(ARROW_SIZE * 2, Math.min(arrowOffset, tooltipHeight - ARROW_SIZE * 2))
                };
            }
        }

        return position;
    };

    const cleanupCurrentElement = useCallback(() => {
        if (currentElementRef.current) {
            const element = currentElementRef.current;
            const originalZIndex = element.getAttribute('data-original-zindex');
            const originalPosition = element.getAttribute('data-original-position');

            element.style.zIndex = originalZIndex || '';
            element.style.position = originalPosition || '';
            element.removeAttribute('data-original-zindex');
            element.removeAttribute('data-original-position');

            currentElementRef.current = null;
            setCurrentElement(null);
        }
        if (parentElementRef.current) {
            const element = parentElementRef.current;
            element.style.zIndex = '';
            parentElementRef.current = null;
        }
    }, []);

    const setupElementHighlight = useCallback((element: Element, parentElement: Element | null) => {
        cleanupCurrentElement();

        const scrollTarget = parentElement || element;
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "center" });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const targetPos = getElementPosition(element);
                const highlightPos = parentElement ? getElementPosition(parentElement) : targetPos;

                setTargetElementPos(targetPos);
                setHighlightPos(highlightPos);

                const tooltipPosition = calculateTooltipPosition(targetPos, highlightPos);
                setTooltipPos(tooltipPosition);
            });
        });

        const htmlElement = element as HTMLElement;

        htmlElement.setAttribute('data-original-zindex', htmlElement.style.zIndex);
        htmlElement.setAttribute('data-original-position', htmlElement.style.position);

        htmlElement.style.zIndex = HIGHLIGHT_Z_INDEX;

        if (parentElement) {
            (parentElement as HTMLElement).style.zIndex = HIGHLIGHT_Z_INDEX;
            parentElementRef.current = parentElement as HTMLElement;
        }

        const computedPosition = window.getComputedStyle(htmlElement).position;
        if (computedPosition === "static") {
            htmlElement.style.position = "relative";
        }

        currentElementRef.current = htmlElement;
        setCurrentElement(htmlElement);
    }, [cleanupCurrentElement]);

    const findAndHighlightElement = useCallback(() => {
        if (!runTour || currentStep >= steps.length) return;

        const step = steps[currentStep];
        const element = document.querySelector(step.selector);
        const parentElement = step.parentSelector ? document.querySelector(step.parentSelector) : null;

        if (element) {
            retryCountRef.current = 0;
            setupElementHighlight(element, parentElement);
        } else if (retryCountRef.current < MAX_RETRY_ATTEMPTS) {
            retryCountRef.current++;
            const timeoutId = setTimeout(findAndHighlightElement, RETRY_DELAY);
            return () => clearTimeout(timeoutId);
        } else {
            console.warn(`Element with selector "${step.selector}" not found after ${MAX_RETRY_ATTEMPTS} attempts`);
        }
    }, [runTour, currentStep, steps, setupElementHighlight]);

    const updatePositions = useCallback(() => {
        if (!currentElementRef.current) return;

        const element = currentElementRef.current;
        const parentElement = parentElementRef.current;

        const targetPos = getElementPosition(element);
        const highlightPos = parentElement ? getElementPosition(parentElement) : targetPos;

        setTargetElementPos(targetPos);
        setHighlightPos(highlightPos);

        const tooltipPosition = calculateTooltipPosition(targetPos, highlightPos);
        setTooltipPos(tooltipPosition);
    }, []);

    useEffect(() => {
        findAndHighlightElement();
        return () => cleanupCurrentElement();
    }, [currentStep, runTour, steps, findAndHighlightElement, cleanupCurrentElement]);

    useEffect(() => {
        if (!runTour || currentStep >= steps.length) return;

        const step = steps[currentStep];
        if (!step.canClick || !currentElement) return;

        const handleElementClick = () => {
            goToNextStep();
        };

        currentElement.addEventListener("click", handleElementClick, { once: true });

        return () => {
            currentElement.removeEventListener("click", handleElementClick);
        };
    }, [currentElement, currentStep, runTour, steps, goToNextStep]);

    useEffect(() => {
        if (!runTour) return;

        const handleResize = () => {
            updatePositions();
        };

        const handleScroll = () => {
            updatePositions();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [runTour, updatePositions]);

    if (!runTour || !highlightPos || !tooltipPos) return <>{children}</>;

    const isLastStep = currentStep === steps.length - 1;
    const currentStepData = steps[currentStep];

    const getArrowStyle = () => {
        const baseStyle = {
            position: 'absolute' as const,
            width: 0,
            height: 0,
        };

        const borderRadius = 12;
        const minOffset = borderRadius + ARROW_SIZE;
        const maxHorizontalOffset = TOOLTIP_WIDTH - borderRadius - ARROW_SIZE;

        switch (tooltipPos.arrowPosition) {
            case 'top':
                return {
                    ...baseStyle,
                    top: -ARROW_SIZE,
                    left: Math.max(minOffset, Math.min(tooltipPos.arrowOffset, maxHorizontalOffset)) - ARROW_SIZE,
                    borderLeft: `${ARROW_SIZE}px solid transparent`,
                    borderRight: `${ARROW_SIZE}px solid transparent`,
                    borderBottom: `${ARROW_SIZE}px solid black`,
                };
            case 'bottom':
                return {
                    ...baseStyle,
                    bottom: -ARROW_SIZE,
                    left: Math.max(minOffset, Math.min(tooltipPos.arrowOffset, maxHorizontalOffset)) - ARROW_SIZE,
                    borderLeft: `${ARROW_SIZE}px solid transparent`,
                    borderRight: `${ARROW_SIZE}px solid transparent`,
                    borderTop: `${ARROW_SIZE}px solid black`,
                };
            case 'left':
                return {
                    ...baseStyle,
                    left: -ARROW_SIZE,
                    top: Math.max(minOffset, Math.min(tooltipPos.arrowOffset, TOOLTIP_MIN_HEIGHT - borderRadius - ARROW_SIZE)) - ARROW_SIZE,
                    borderTop: `${ARROW_SIZE}px solid transparent`,
                    borderBottom: `${ARROW_SIZE}px solid transparent`,
                    borderRight: `${ARROW_SIZE}px solid black`,
                };
            case 'right':
                return {
                    ...baseStyle,
                    right: -ARROW_SIZE,
                    top: Math.max(minOffset, Math.min(tooltipPos.arrowOffset, TOOLTIP_MIN_HEIGHT - borderRadius - ARROW_SIZE)) - ARROW_SIZE,
                    borderTop: `${ARROW_SIZE}px solid transparent`,
                    borderBottom: `${ARROW_SIZE}px solid transparent`,
                    borderLeft: `${ARROW_SIZE}px solid black`,
                };
        }
    };

    return (
        <>
            {children}
            <div className="fixed inset-0 z-50 pointer-events-none">
                <div className="absolute inset-0 bg-white/30 backdrop-blur-xs border border-white/20 rounded-lg transition-all duration-200 pointer-events-auto" />

                <div
                    className="absolute rounded-lg pointer-events-none transition-all duration-200"
                    style={{
                        top: highlightPos.top,
                        left: highlightPos.left,
                        width: highlightPos.width,
                        height: highlightPos.height,
                    }}
                />

                <div
                    className="absolute z-[10000] space-y-2 p-3 bg-black text-white rounded-xl shadow-lg transition-all duration-200 pointer-events-auto"
                    style={{
                        top: tooltipPos.top,
                        left: tooltipPos.left,
                        width: TOOLTIP_WIDTH,
                        minHeight: TOOLTIP_MIN_HEIGHT,
                    }}
                >
                    <div style={getArrowStyle()} />

                    <p className="font-medium">
                        {currentStep + 1} шаг из {steps.length}
                    </p>
                    <p className="text-sm">{currentStepData.text}</p>

                    {!currentStepData.canClick && (
                        <button
                            className="text-[#989898] hover:text-white transition-colors cursor-pointer"
                            onClick={goToNextStep}
                        >
                            {isLastStep ? "Завершить обучение" : "Дальше"}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
