"use client"

import EmptyHeartIcon from "@/components/icons/EmptyHeartIcon";
import FullHeartIcon from "@/components/icons/FullHeartIcon";
import { MAX_HEALTH } from "@/game/constants";
import { useEffect, useState } from "react";

const Health = () => {
    const [health, setHealth] = useState(MAX_HEALTH)

    useEffect(() => {
        setHealth(Number.parseInt(localStorage.getItem("health") ?? `${MAX_HEALTH}`))
    }, [])

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
