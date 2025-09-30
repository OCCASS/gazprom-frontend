"use client"

import { useRouter } from "next/navigation";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

export type TBackButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const BackButton = (props: TBackButtonProps) => {
    const router = useRouter()

    return (
        <button className="cursor-pointer" onClick={() => router.back()} {...props}>
            <ArrowLeftIcon width="32" height="32" />
        </button>
    )
}

export default BackButton;
