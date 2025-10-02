"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import BearLogoIcon from "../icons/BearLogoIcon";

const placeholders = [
    "Найти",
    "Перевести",
    "Банкоматы",
    "Открыть счет",
    "Бонусы"
]

const Header = ({ children }: { children: React.ReactNode }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % placeholders.length);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="grid grid-cols-[max-content_1fr_max-content] items-center gap-4 py-2 px-4">
            <Link href="/profile" className="flex-shrink-0">
                <BearLogoIcon width="32" height="32" id="profile_image" />
            </Link>
            <input className="flex-1 px-3 h-9 bg-[#ececec] rounded-lg min-w-0" placeholder={placeholders[index]} />
            <div className="flex gap-4">
                {children}
            </div>
        </header>
    )
}

export default Header;
