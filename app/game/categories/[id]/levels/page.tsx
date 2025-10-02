"use client"

import BackButton from "@/components/BackButton";
import InteractiveLevel from "@/components/InteractiveLevel";
import { redirect, RedirectType } from "next/navigation";
import { use, useEffect, useState } from "react";
import { CATEGOREIS } from "../../constants";
import Health from "@/app/game/components/Health";
import { canOpenLevel } from "@/utils/level";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)
    const [unlockedLevels, setUnlockedLevels] = useState([])

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem("completed") ?? "{}")
        const completedLevels = completed[id] ?? []
        completedLevels.push(Math.max(completedLevels) + 1)
        setUnlockedLevels(completedLevels)
    }, [id])

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
                    onLevelClick={
                        (level) => {
                            if (!canOpenLevel(id, `${level}`)) return
                            redirect(`/game/categories/${id}/levels/${level}`, RedirectType.push)
                        }
                    }
                />
            </div>
        </>
    )
}

export default Page;
