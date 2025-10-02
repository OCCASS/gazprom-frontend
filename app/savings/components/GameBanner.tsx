"use client"

import BearIcon from "@/components/icons/BearIcon"
import { redirect, RedirectType } from "next/navigation"

const GameBanner = () => {
    return (
        <div
            className="relative overflow-hidden p-4 bg-[#2b61ec] text-white rounded-2xl space-y-3 min-h-24"
            id="banner2"
            onClick={() => redirect("/game", RedirectType.push)}
        >
            <p className="relative leading-none font-medium text-lg tracking-wide z-[2]">Время отдохнуть после работы</p>
            <p className="relative leading-none z-[2]">Ваши жизни восстановились</p>
            <BearIcon width="100" className="absolute -bottom-full right-4 z-[1]" />
        </div>
    )
}

export default GameBanner
