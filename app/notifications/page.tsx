"use client"

import Layout from "@/components/Layout/Layout";
import BackButton from "@/components/BackButton";
import BearIcon from "@/components/icons/BearIcon";
import { redirect, RedirectType } from "next/navigation";

const Page = () => {
    return (
        <Layout withNavbar={false}>
            <header className="py-4 px-4 space-y-2">
                <BackButton id="notifications_back" />
                <h1 className="font-medium text-3xl">Уведомления</h1>
            </header>
            <main className="px-4 space-y-4">
                <ul>
                    <li
                        id="game_notification"
                        className="relative overflow-hidden p-4 bg-[#2b61ec] text-white rounded-2xl space-y-3 min-h-24"
                        onClick={() => redirect("/game", RedirectType.push)}
                    >
                        <p className="leading-none font-medium text-lg tracking-wide">Время отдохнуть после работы</p>
                        <p className="leading-none">Ваши жизни восстановились</p>
                        <BearIcon width="100" className="absolute bottom-0 right-4" />
                    </li>
                </ul>
            </main>
        </Layout>
    )
}

export default Page;
