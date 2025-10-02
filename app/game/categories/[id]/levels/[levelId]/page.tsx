"use client"

import { Params } from "next/dist/server/request/params";
import { use, useState } from "react";
import { CATEGOREIS } from "../../../constants";
import Dialog from "./components/Dialog";
import { Game } from "@/game";

const Page = ({ params }: { params: Promise<Params> }) => {
    const { id, levelId } = use(params)
    const level = CATEGOREIS[id].levels[levelId]
    const [showDialog, setShowDialog] = useState(true)

    const onCompleteDialog = () => {
        setShowDialog(false)
    }

    const onCompleteGame = ({ score }: { score: number }) => {
        const totalScore = Number.parseInt(localStorage.getItem("totalScore") ?? "0")
        localStorage.setItem("totalScore", `${totalScore + score}`)
        const completed = JSON.parse(localStorage.getItem("completed") ?? "{}")
        if (completed[id]) completed[id].push(Number.parseInt(levelId))
        else completed[id] = [Number.parseInt(levelId)]
        localStorage.setItem("completed", JSON.stringify(completed))
    }

    return (
        <div className="relative w-full h-full">
            {showDialog && <Dialog dialogs={level.dialog} onComplete={onCompleteDialog} />}
            {!showDialog && <Game tips={level.tips} onComplete={onCompleteGame} />}
        </div>
    );
};

export default Page;
