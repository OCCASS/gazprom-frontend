"use client"

import { use, useState } from "react";
import { CATEGOREIS } from "../../../constants";
import { Game } from "@/game";
import Dialog from "@/components/Dialog/Dialog";
import { redirect } from "next/navigation";

const Page = ({ params }: { params: Promise<{ id: string, levelId: string }> }) => {
    const { id, levelId } = use(params)
    // @ts-expect-error id is valid
    const level = CATEGOREIS[id].levels[levelId]
    const [showDialog, setShowDialog] = useState(true)

    const onCompleteDialog = () => {
        setShowDialog(false)
    }

    const onCompleteGame = ({ score }: { score: number }) => {
        const totalScore = Number.parseInt(localStorage.getItem("totalScore") ?? "0")
        localStorage.setItem("totalScore", `${totalScore + score}`)
        const completed = JSON.parse(localStorage.getItem("completed") ?? "{}")
        const levelIdNumber = Number.parseInt(levelId)
        if (completed[id] && !completed[id].includes(levelIdNumber)) completed[id].push(levelIdNumber)
        else completed[id] = [levelIdNumber]
        localStorage.setItem("completed", JSON.stringify(completed))
    }

    const nextLevel = () => {
        const levelIdNumber = Number.parseInt(levelId)
        redirect(`/game/categories/${id}/levels/${levelIdNumber + 1}`)
    }

    return (
        <div className="relative min-h-screen">
            {showDialog && <Dialog dialog={level.dialog} onComplete={onCompleteDialog} />}
            {!showDialog &&
                <Game
                    tips={level.tips}
                    endDialog={level.endDialog}
                    onComplete={onCompleteGame}
                    nextLevel={nextLevel}
                />
            }
        </div>
    );
};

export default Page;
