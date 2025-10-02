"use client"

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const persons = [
    { id: "gely", name: "Геля" },
    { id: "bear", name: "Миша" }
]
const items = [
    { id: "item1", price: 500 },
    { id: "item2", price: 700 },
    { id: "item3", price: 300 },
    { id: "item4", price: 1000 },
    { id: "item5", price: 500 },
]

const ClothesTab = () => {
    const [person, setPerson] = useState<{ id: string, name: string }>()
    const [curPerson, setCurPerson] = useState(0)
    const [bonus, setBonus] = useState(0)
    const [selectedItem, setSelectedItem] = useState<string | null>(null)

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

    useEffect(() => {
        document.body.scrollIntoView({ behavior: "smooth", block: "center" });
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    return (
        <div>
            <div className="flex gap-6 justify-center">
                <button className="cursor-pointer" onClick={prevPerson}>
                    <ArrowLeftIcon className="size-6" />
                </button>
                <p className="text-xl text-[#1919EF] font-halvar font-medium">{person?.name}</p>
                <button className="cursor-pointer" onClick={nextPerson}>
                    <ArrowRightIcon className="size-6" />
                </button>
            </div>
            <div className="overflow-hidden pt-8 px-8 h-full">
                {person && <img src={`/${person.id}${selectedItem ? `_${selectedItem}` : ""}.svg`} className="m-auto h-1/2" width="239" />}
            </div>
            <div className="absolute bottom-4 left-4 right-4 px-4 py-8 bg-[#bdcefa] rounded-2xl">
                <div className="relative grid grid-cols-3 gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="cursor-pointer rounded-xl p-1 flex flex-col gap-2 justify-center items-center bg-[#a4bbf7]" onClick={() => setSelectedItem(item.id)}>
                            <img src={`/${item.id}.svg`} alt={"Продукт"} width="48" height="48" />
                            <p className="text-lg text-[#060698]">{item.price}</p>
                        </div>
                    ))}
                </div>
                <p className="absolute top-0 -translate-y-1/2 left-0 bg-[#1919ef] text-white px-6 py-2 rounded-lg user-select-none">
                    {bonus} бонусов
                </p>
                {selectedItem &&
                    <button className="cursor-pointer absolute top-0 -translate-y-1/2 right-0 bg-[#dd41db] text-white px-6 py-2 rounded-lg user-select-none">
                        Купить
                    </button>
                }
            </div>
        </div>
    )
}

export default ClothesTab;
