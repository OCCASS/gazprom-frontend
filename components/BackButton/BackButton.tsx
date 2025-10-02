"use client"

import { useRouter } from "next/navigation";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { twMerge } from "tailwind-merge";

export type TBackButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const BackButton = ({ className, ...props }: TBackButtonProps) => {
    const router = useRouter()

    return (
        <button className={twMerge("cursor-pointer", className)} onClick={() => router.back()} {...props}>
            <ArrowLeftIcon width="32" height="32" />
        </button>
    )
}

export default BackButton;
