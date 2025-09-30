"use client"

import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter()

    return (
        <button className="cursor-pointer" onClick={() => router.back()}>
            <img src="./arrow-left.svg" width="32" height="32" />
        </button>
    )
}

export default BackButton;
