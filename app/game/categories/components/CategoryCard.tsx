"use client"

import StarIcon from "@/components/icons/StarIcon";
import Image from "next/image";
import { redirect, RedirectType } from "next/navigation";

const CategoryCard = ({ id, name, maxLevelCount, stars, image }: { id: string, name: string, maxLevelCount: number, stars: number, image: string }) => {
    return (
        <section
            className="relative bg-[#bdcefa] px-8 py-6 rounded-3xl overflow-hidden cursor-pointer"
            onClick={() => redirect(`/game/categories/${id}/levels`, RedirectType.push)}
        >
            <p className="text-lg font-medium mb-8 z-2">{name}</p>
            <div className="flex gap-2">
                <div className="bg-[#a2bcfe] px-3 py-2 rounded-lg text-lg z-3">
                    0/{maxLevelCount}
                </div>
                <div className="flex gap-1 bg-[#a2bcfe] px-3 py-2 rounded-lg text-lg z-3">
                    <StarIcon className="text-[#1919ef]" width={24} height={24} />
                    <span>0/{stars}</span>
                </div>
            </div>
            <Image
                alt={name}
                src={image}
                width={220}
                height={200}
                className="absolute right-[-60] bottom-[-50] z-1"
            />
        </section>
    )
}

export default CategoryCard;
