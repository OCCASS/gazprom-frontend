"use client"

import { useRouter } from "next/navigation";

export type TBackButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const BackButton = (props: TBackButtonProps) => {
    const router = useRouter()

    return (
        <button className="cursor-pointer" onClick={() => router.back()} {...props}>
            <img src="./arrow-left.svg" width="32" height="32" />
        </button>
    )
}

export default BackButton;
