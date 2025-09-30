"use client"

import Link from "next/link";
import ArrowLeftRightIcon from "../icons/ArrowLeftRightIcon";
import CalendarIcon from "../icons/CalendarIcon";
import ChatBubbleIcon from "../icons/ChatBubbleIcon";
import LogoIcon from "../icons/LogoIcon";
import ShoppingBagIcon from "../icons/ShoppingBagIcon";

const sidebar = [
    { label: "Главный", Icon: LogoIcon, path: "/", id: "navbar_main" },
    { label: "Платежи", Icon: ArrowLeftRightIcon, path: "/" },
    { label: "Для меня", Icon: ShoppingBagIcon, path: "/for-me", id: "navbar_for_me" },
    { label: "История", Icon: CalendarIcon, path: "/" },
    { label: "Помощь", Icon: ChatBubbleIcon, path: "/" },
]

const Navbar = () => {
    return (
        <aside className="fixed bottom-0 left-0 right-0 bg-white h-20 border-t border-[#ebebec] border-2" id="navbar">
            <nav className="h-full px-4">
                <ul className="h-full flex items-center justify-between">
                    {sidebar.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.path}
                                className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-[#2b61ec]"
                                id={item.id}
                            >
                                <item.Icon width={28} height={28} />
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Navbar;
