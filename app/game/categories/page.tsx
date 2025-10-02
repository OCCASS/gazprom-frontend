"use client"

import BackButton from "@/components/BackButton";
import CategoryCard from "./components/CategoryCard";
import { CATEGOREIS } from "./constants";
import Health from "../components/Health";
import { useEffect, useState } from "react";

const Page = () => {
    const [completed, setCompleted] = useState<Record<string, number[]>>({});

    useEffect(() => {
        const completedRaw = localStorage.getItem("completed")
        if (!completedRaw) return
        setCompleted(JSON.parse(completedRaw))
    }, [])

    return (
        <div className="p-4 space-y-8">
            <div className="relative h-12">
                <BackButton className="absolute left-0 top-1/2 -translate-y-1/2" />
                <h1
                    className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 font-halvar font-bold text-3xl text-center">
                    Категории
                </h1>
            </div>
            <Health />
            <div>
                <ul className="space-y-4">
                    {
                        Object.entries(CATEGOREIS).map(([key, value]) =>
                            <li key={key}>
                                <CategoryCard
                                    id={key}
                                    name={value.name}
                                    image={value.image}
                                    completedLevelCount={completed?.[key]?.length ?? 0}
                                    maxLevelCount={Object.keys(value.levels).length}
                                    stars={(completed?.[key]?.length ?? 0) * 3}
                                    maxStars={Object.keys(value.levels).length * 3}
                                />
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Page;
