"use client";

import { redirect } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";

type Step = {
    selector: string;
    text: string;
    canClick: boolean;
};

const TOOLTIP_WIDTH = 300;
const TOOLTIP_MIN_HEIGHT = 120;
const TOOLTIP_OFFSET = 10;
const HIGHLIGHT_Z_INDEX = "9999";
const MAX_RETRY_ATTEMPTS = 20;
const RETRY_DELAY = 50;

type HighlightPosition = {
    top: number;
    left: number;
    width: number;
    height: number;
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
    const [currentElement, setCurrentElement] = useState<HTMLElement | null>(null)
    const retryCountRef = useRef(0);

    useEffect(() => {
        const completedRaw = localStorage.getItem("siteTourCompleted")
        if (!completedRaw) setRunTour(true)
        else setRunTour(!JSON.parse(completedRaw))
    }, [])

    const completeTour = useCallback(() => {
        setRunTour(false);
        localStorage.setItem("siteTourCompleted", "true");
        redirect("/")
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

    const calculateTooltipPosition = (highlight: HighlightPosition) => {
        const tooltipBottom = highlight.top + highlight.height + TOOLTIP_OFFSET + TOOLTIP_MIN_HEIGHT;
        const isOverflowingBottom = tooltipBottom > window.innerHeight;

        const top = isOverflowingBottom
            ? window.innerHeight - TOOLTIP_MIN_HEIGHT - TOOLTIP_OFFSET - highlight.height
            : highlight.top + highlight.height + TOOLTIP_OFFSET;

        const tooltipRight = highlight.left + TOOLTIP_WIDTH + TOOLTIP_OFFSET;
        const isOverflowingRight = tooltipRight > window.innerWidth;

        const left = isOverflowingRight
            ? window.innerWidth - TOOLTIP_WIDTH - TOOLTIP_OFFSET
            : highlight.left + TOOLTIP_OFFSET;

        return { top, left };
    };

    const currentElementRef = useRef<HTMLElement | null>(null);
    const parentElementRef = useRef<HTMLElement | null>(null);

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
            setCurrentElement(null)
        }
        if (parentElementRef.current) {
            const element = parentElementRef.current;
            element.style.zIndex = '';
        }
    }, []);

    const setupElementHighlight = useCallback((element: Element, parentElement: Element | null) => {
        cleanupCurrentElement();

        if (parentElement)
            parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
        else
            element.scrollIntoView({ behavior: "smooth", block: "center" });

        // Небольшая задержка только для плавного скролла
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                var position;
                if (parentElement)
                    position = getElementPosition(parentElement);
                else
                    position = getElementPosition(element);
                setHighlightPos(position);
            });
        });

        const htmlElement = element as HTMLElement;

        // Сохраняем оригинальные стили в атрибутах
        htmlElement.setAttribute('data-original-zindex', htmlElement.style.zIndex);
        htmlElement.setAttribute('data-original-position', htmlElement.style.position);

        htmlElement.style.zIndex = HIGHLIGHT_Z_INDEX;
        if (parentElement)
            (parentElement as HTMLElement).style.zIndex = HIGHLIGHT_Z_INDEX;

        // Проверяем, не находится ли элемент внутри fixed/sticky контейнера
        const computedPosition = window.getComputedStyle(htmlElement).position;
        if (computedPosition === "static") {
            htmlElement.style.position = "relative";
        }

        currentElementRef.current = htmlElement;
        setCurrentElement(htmlElement)
        if (parentElement)
            parentElementRef.current = parentElement as HTMLElement;
    }, [cleanupCurrentElement]);

    const findAndHighlightElement = useCallback(() => {
        if (!runTour || currentStep >= steps.length) return;

        const step = steps[currentStep];
        console.log(`Шаг ${currentStep}: ищем элемент с селектором "${step.selector}"`);
        const element = document.querySelector(step.selector);
        const parentElement = document.querySelector(step.parentSelector)

        if (element) {
            console.log(`Элемент найден:`, element);
            retryCountRef.current = 0;
            setupElementHighlight(element, parentElement);
        } else if (retryCountRef.current < MAX_RETRY_ATTEMPTS) {
            retryCountRef.current++;
            console.log(`Попытка ${retryCountRef.current}/${MAX_RETRY_ATTEMPTS}`);
            const timeoutId = setTimeout(findAndHighlightElement, RETRY_DELAY);
            return () => clearTimeout(timeoutId);
        } else {
            console.warn(`Элемент с селектором "${step.selector}" не найден после ${MAX_RETRY_ATTEMPTS} попыток`);
            console.log('Доступные элементы с id:', Array.from(document.querySelectorAll('[id]')).map(el => `#${el.id}`));
        }
    }, [runTour, currentStep, steps, setupElementHighlight]);

    useEffect(() => {
        findAndHighlightElement();

        return () => {
            cleanupCurrentElement();
        };
    }, [currentStep, runTour, steps, findAndHighlightElement, cleanupCurrentElement]);

    useEffect(() => {
        if (!runTour || currentStep >= steps.length) return;

        const step = steps[currentStep];
        if (!step.canClick) return;

        console.log(step, currentElement)

        if (!currentElement) return

        const handleElementClick = () => {
            goToNextStep();
        };

        currentElement.addEventListener("click", handleElementClick, { once: true });

        return () => {
            currentElement.removeEventListener("click", handleElementClick)
        };
    }, [currentElement, runTour, steps, goToNextStep]);

    if (!runTour || !highlightPos) return <>{children}</>;

    const tooltipPosition = calculateTooltipPosition(highlightPos);
    const isLastStep = currentStep === steps.length - 1;
    const currentStepData = steps[currentStep];

    return (
        <>
            {children}
            <div className="fixed inset-0 z-50 pointer-events-none">
                <div
                    className="absolute inset-0 bg-white/30 backdrop-blur-xs border border-white/20 rounded-lg transition-all duration-200 pointer-events-auto"
                />

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
                        top: tooltipPosition.top,
                        left: tooltipPosition.left,
                        width: TOOLTIP_WIDTH,
                        minHeight: TOOLTIP_MIN_HEIGHT,
                    }}
                >
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
