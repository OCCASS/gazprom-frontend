import BackButton from "@/components/BackButton";
import GameBackground from "./components/GameBackground";
import Link from "next/link";

const Page = () => {
    return (
        <div className="p-4">
            <div className="absolute left-4 right-4 top-16 z-1">
                <div className="relative">
                    <BackButton className="absolute left-0 top-1/2 -translate-y-1/2" />
                    <h1
                        className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 font-halvar font-bold text-5xl text-center">
                        BOOSTLE
                    </h1>
                </div>
            </div>
            <div className="absolute left-0 right-0 bottom-12 px-4 z-1">
                <div className="grid grid-cols-2 gap-6">
                    <Link
                        className="justify-self-center col-span-2 w-1/2 cursor-pointer bg-white rounded-xl text-2xl text-[#060698] h-13 outline-white outline-2 outline-offset-2 animate-pulse-outline grid place-items-center"
                        href="/game/categories"
                    >
                        Начать
                    </Link>
                    <button
                        className="cursor-pointer rounded-xl text-2xl text-white h-13 outline-white border-2 px-2"
                    >
                        Достижения
                    </button>
                    <Link
                        href="/game/shop"
                        className="cursor-pointer rounded-xl text-2xl text-white h-13 outline-white border-2 px-2 grid place-items-center"
                    >
                        Магазин
                    </Link>
                </div>
            </div>
            <div className="fixed bottom-[-30] inset-x-0">
                <GameBackground />
            </div>
        </div>
    )
}

export default Page;
