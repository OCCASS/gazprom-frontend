import HeartIcon from "@/components/icons/HeartIcon";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function Countdown({ className }: { className?: string }) {
    const [timeLeft, setTimeLeft] = useState("00:00:00");

    useEffect(() => {
        const savedTime = localStorage.getItem("restoreHealthAt");
        if (!savedTime) return;

        const target = new Date(Number.parseInt(savedTime));

        const updateTimer = () => {
            const now = new Date();
            // @ts-ignore
            let diffMs = target - now;
            if (diffMs < 0) diffMs = 0;

            const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, "0");
            const minutes = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
            const seconds = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, "0");

            setTimeLeft(`${hours}:${minutes}:${seconds}`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <p className={twMerge("relative font-halvar bg-[#6088e4] text-white text-xl px-6 py-4 rounded-2xl font-bold", className)}>
            <HeartIcon
                width="120"
                height="120"
                className="absolute -left-3 top-1/2 -translate-y-1/2 -translate-x-1/2 animate-pulse-heart"
            />
            {timeLeft}
        </p>
    );
}

export default Countdown;
