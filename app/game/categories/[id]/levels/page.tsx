"use client"

import BackButton from "@/components/BackButton";
import InteractiveLevel from "@/components/InteractiveLevel";
import { redirect, RedirectType } from "next/navigation";
import { use, useEffect, useState } from "react";
import { CATEGOREIS } from "../../constants";
import Health from "@/app/game/components/Health";
import { canOpenLevel } from "@/utils/level";
import ItemIcon from "@/components/icons/ItemIcon";
import BadItemIcon from "@/components/icons/BadItemIcon";
import SpeicalItemIcon from "@/components/icons/SpecialItemIcon";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)
    const [unlockedLevels, setUnlockedLevels] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [afterModal, setAferModal] = useState<number | null>(null)

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem("completed") ?? "{}")
        const completedLevels = completed[id] ?? []
        completedLevels.push(Math.max(...completedLevels, 0) + 1)
        setUnlockedLevels(completedLevels)
    }, [id])


    const onLevelClick = (level: number) => {
        if (!canOpenLevel(id, `${level}`)) return

        const showInstructionRaw = localStorage.getItem("showInstruction")

        if (!showInstructionRaw || JSON.parse(showInstructionRaw)) {
            setShowModal(true)
            setAferModal(level)
            return
        }

        redirect(`/game/categories/${id}/levels/${level}`, RedirectType.push)
    }

    const closeModal = () => {
        setShowModal(false)
        localStorage.setItem("showInstruction", "false")

        if (afterModal !== null) {
            redirect(`/game/categories/${id}/levels/${afterModal}`, RedirectType.push)
        }
    }

    return (
        <>
            <div className="p-4 space-y-8">
                <div className="relative h-12">
                    <BackButton className="absolute left-0 top-1/2 -translate-y-1/2" />
                    <h1
                        className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 font-halvar font-bold text-3xl text-center">
                        Уровни
                    </h1>
                </div>
            </div>
            <Health />
            <div className="py-4">
                <InteractiveLevel
                    // @ts-expect-error id is valid
                    SvgComponent={CATEGOREIS[id].levelRoadComponent}
                    unlockedLevels={unlockedLevels}
                    onLevelClick={onLevelClick}
                />
            </div>
            {showModal && (
                <div className="absolute bg-white -translate-y-1/2 top-1/2 left-4 right-4 px-4 py-6 rounded-2xl flex flex-col gap-3 items-center shadow-lg z-50">
                    <h1
                        className="font-halvar font-bold text-3xl text-center">
                        Инструкция
                    </h1>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-1"><ItemIcon width={36} height={36} /><span> — их нужно собирать</span></li>
                        <li className="flex items-center gap-1"><BadItemIcon width={36} height={36} /><span> — с ними аккуратнее, они забирают здоровье</span></li>
                        <li className="flex items-center gap-1"><SpeicalItemIcon width={36} height={36} /><span> – их нужно обязательно собирать</span></li>
                    </ul>
                    <p>Также важно соблюдать баланс шаров с каждой стороны, если разница в количестве будет больше 5, то уберется одно здоровье</p>
                    <button onClick={closeModal} className="bg-[#1919EF] text-white px-6 py-2 rounded-xl">Понятно</button>
                </div>
            )}
        </>
    )
}

export default Page;
