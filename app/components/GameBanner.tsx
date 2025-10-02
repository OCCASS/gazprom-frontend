"use client"

import { redirect, RedirectType } from "next/navigation";

const GameBanner = () => {
    return (
        <div
            className="col-span-8 rounded-2xl bg-[#2b61ec] p-4 min-h-32 cursor-pointer"
            id="banner1"
            onClick={() => redirect("/game", RedirectType.push)}
        >
            <h2 className="text-white text-lg font-medium leading-none mb-1">Не забудь про задание от Миши!</h2>
            <p className="text-white">Ваши жизни восстановились</p>
        </div>
    )
}

export default GameBanner;
