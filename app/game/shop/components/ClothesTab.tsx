"use client"

import BearIcon from "@/components/icons/BearIcon";
import GelyIcon from "@/components/icons/GelyIcon";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const persons = [
    { name: "Геля", Component: GelyIcon },
    { name: "Миша", Component: BearIcon }
]
const items = [
    { price: 500, image: "/item1.svg" },
    { price: 700, image: "/item2.svg" },
    { price: 300, image: "/item3.svg" },
    { price: 1000, image: "/item4.svg" },
    { price: 500, image: "/item5.svg" },
]

const ClothesTab = () => {
    const [person, setPerson] = useState<{ name: string, Component: React.ComponentType<{ className: string }> }>()
    const [curPerson, setCurPerson] = useState(0)
    const [bonus, setBonus] = useState(0)

    const nextPerson = () => {
        setCurPerson(prev => {
            if (prev === persons.length - 1) return 0
            return prev + 1
        })
    }

    const prevPerson = () => {
        setCurPerson(prev => {
            if (prev === 0) return persons.length - 1
            return prev - 1
        })
    }

    useEffect(() => {
        const totalScore = localStorage.getItem("totalScore")
        if (totalScore)
            setBonus(Number.parseInt(totalScore))
    }, [])

    useEffect(() => {
        setPerson(persons[curPerson])
    }, [curPerson])

    return (
        <>
            <div className="flex gap-6 justify-center">
                <button className="cursor-pointer" onClick={prevPerson}>
                    <ArrowLeftIcon className="size-6" />
                </button>
                <p className="text-xl text-[#1919EF] font-halvar font-medium">{person?.name}</p>
                <button className="cursor-pointer" onClick={nextPerson}>
                    <ArrowRightIcon className="size-6" />
                </button>
            </div>
            <div className="overflow-hidden pt-8 px-8">
                {person && <person.Component className="m-auto h-1/2" />}
            </div>
            <div className="absolute bottom-12 left-4 right-4 px-4 py-8 bg-[#bdcefa] rounded-2xl">
                <div className="relative grid grid-cols-3 gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="cursor-pointer rounded-xl p-1 flex flex-col gap-2 justify-center items-center bg-[#a4bbf7]">
                            <img src={item.image} alt={"Продукт"} width="64" height="64" />
                            <p className="text-lg text-[#060698]">{item.price}</p>
                        </div>
                    ))}
                </div>
                <p className="absolute top-0 -translate-y-1/2 left-0 bg-[#1919ef] text-white px-6 py-2 rounded-lg user-select-none">
                    {bonus} бонусов
                </p>
            </div>
        </>
    )
}

export default ClothesTab;
