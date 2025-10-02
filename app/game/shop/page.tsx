"use client"

import BackButton from "@/components/BackButton";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import BonusTab from "./components/BonusTab";
import ClothesTab from "./components/ClothesTab";

const tabs = [
    { id: "bonus", text: "Бонусы" },
    { id: "clothes", text: "Одежда" },
]

const Page = () => {
    const [tab, setTab] = useState("bonus")

    return (
        <div className="p-4 space-y-6 min-h-screen">
            <div className="relative h-12">
                <BackButton className="absolute left-0 top-1/2 -translate-y-1/2" />
                <h1
                    className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 font-halvar font-bold text-3xl text-center">
                    Магазин
                </h1>
            </div>
            <div className="flex gap-8 justify-center font-halvar">
                {
                    tabs.map(item =>
                        <button
                            key={item.id}
                            className={twMerge("cursor-pointer text-2xl", tab === item.id && "underline")}
                            onClick={() => setTab(item.id)}
                        >
                            {item.text}
                        </button>
                    )}
            </div>
            {tab === "bonus" ? <BonusTab /> : <ClothesTab />}
        </div>
    )
}

export default Page;
