"use client"

import EmptyHeartIcon from "@/components/icons/EmptyHeartIcon";
import FullHeartIcon from "@/components/icons/FullHeartIcon";
import Countdown from "@/game/components/Countdown";
import { MAX_HEALTH } from "@/game/constants";
import { useEffect, useState } from "react";

const Health = () => {
    const [health, setHealth] = useState(0)

    useEffect(() => {
        setHealth(Number.parseInt(localStorage.getItem("health") ?? `${MAX_HEALTH}`))
    }, [])

    if (health === 0) return <div className="flex justify-center"><Countdown /></div>

    return (
        <ul className="flex gap-1 justify-center">
            {new Array(MAX_HEALTH).fill(0).map((_, index) =>
                <li key={index}>
                    {
                        health > index ?
                            <FullHeartIcon width={36} height={36} />
                            :
                            <EmptyHeartIcon width={36} height={36} />
                    }
                </li>
            )}
        </ul>
    )
}

export default Health;
