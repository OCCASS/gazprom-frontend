"use client"

import BackButton from "@/components/BackButton";
import InteractiveLevel from "@/components/InteractiveLevel";
import { Params } from "next/dist/server/request/params";
import { redirect, RedirectType } from "next/navigation";
import { use, useEffect, useState } from "react";
import { CATEGOREIS } from "../../constants";
import Health from "@/app/game/components/Health";

const Page = ({ params }: { params: Promise<Params> }) => {
    const { id } = use(params)
    const [unlockedLevels, setUnlockedLevels] = useState([])

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem("completed") ?? "{}")
        let completedLevels_ = completed[id] ?? []
        completedLevels_.push(Math.max(completedLevels_) + 1)
        setUnlockedLevels(completedLevels_)
    }, [])

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
                    SvgComponent={CATEGOREIS[id].levels.Component}
                    unlockedLevels={unlockedLevels}
                    onLevelClick={
                        (level) =>
                            redirect(`/game/categories/${id}/levels/${level}`, RedirectType.push)
                    }
                />
            </div>
        </>
    )
}

export default Page;
