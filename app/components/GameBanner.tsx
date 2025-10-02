"use client"

import BearIcon from "@/components/icons/BearIcon";
import { redirect, RedirectType } from "next/navigation";

const GameBanner = () => {
    return (
        <div
            className="relative overflow-hidden col-span-8 rounded-2xl bg-[#2b61ec] p-4 min-h-32 cursor-pointer"
            id="banner1"
            onClick={() => redirect("/game", RedirectType.push)}
        >
            <h2 className="text-white text-lg font-medium leading-none mb-1 z-2">Не забудь про задание от Миши!</h2>
            <p className="text-white z-2">Ваши жизни восстановились</p>
            <BearIcon width="120" className="absolute right-4 -bottom-full z-1" />
        </div>
    )
}

export default GameBanner;
