"use client"

import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter()

    return (
        <button className="cursor-pointer text-[#2b61ec] p-4" onClick={() => router.back()}>
            Вернуться назад
        </button>
    )
}

export default BackButton;
