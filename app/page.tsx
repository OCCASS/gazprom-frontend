import Header from "@/components/Header"
import PlusIcon from "@/components/icons/PlusIcon"
import XIcon from "@/components/icons/XIcon"
import Layout from "@/components/Layout/Layout"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

const tabs = [
    { label: "Карты", selected: true, path: "/" },
    { label: "Вклады и счета", selected: false, path: "/" },
    { label: "Кредиты", selected: false, path: "/" },
    { label: "Инвестиции", selected: false, path: "/" }
]

export default function Home() {
    return (
        <Layout>
            <Header>
                <button className="size-7 cursor-pointer rounded-full">
                    <img src="./eye.svg" width="28" height="28" />
                </button>
                <Link id="notification_button" href="/notifications" className="size-7 cursor-pointer rounded-full">
                    <img src="./notification.svg" width="28" height="28" />
                </Link>
            </Header>
            <main>
                <div className="px-4 mb-3">
                    <ul className="flex gap-2">
                        {
                            tabs.map((item, index) =>
                                <li key={index}>
                                    <button className={twMerge("cursor-pointer h-8 px-2 rounded-lg text-md", item.selected && "bg-white")}>
                                        {item.label}
                                    </button>
                                </li>)
                        }
                    </ul>
                </div>
                <section className="bg-white mx-4 p-4 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="font-medium text-lg">Карты</h2>
                            <button className="cursor-pointer size-5">
                                <img src="./stack.svg" width="20" height="20" />
                            </button>
                        </div>
                        <button className="cursor-pointer p-1 rounded-full bg-[#f5f5f5]">
                            <img src="./plus.svg" width="20" height="20" />
                        </button>
                    </div>
                    <div className="mb-2">
                        <ul>
                            <li className="grid grid-cols-[max-content_1fr] gap-4 py-2">
                                <img src="./card1.svg" width="36" height="28" />
                                <div className="grid grid-cols-[1fr_max-content] items-center gap-4 border-b border-[#dfdfdf] pb-2">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p>Дебетовая карта</p>
                                            <p className="text-[#6f6f6f]">· 0912</p>
                                        </div>
                                        <p className="font-bold text-md">0 ₽</p>
                                    </div>
                                    <button className="size-5 grid place-items-center">
                                        <img src="./dots.svg" width="3" height="20" />
                                    </button>
                                </div>
                            </li>
                            <li className="grid grid-cols-[max-content_1fr] gap-4 py-2">
                                <img src="./card2.svg" width="36" height="28" />
                                <div className="grid grid-cols-[1fr_max-content] items-center gap-4 border-b border-[#dfdfdf] pb-2">
                                    <div>
                                        <p>Повышенный кэшбек</p>
                                        <p className="text-[#6f6f6f] text-md">5%</p>
                                    </div>
                                    <button className="size-5 grid place-items-center">
                                        <XIcon width="20" height="20" className="text-[#6f6f6f]" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <button className="h-8 px-2 text-[#6f6f6f]">Настроить</button>
                </section>
                <section className="grid place-items-center px-4 py-4">
                    <button className="text-lg flex items-center gap-2 cursor-pointer">
                        <div className="bg-[#2b61ec] size-8 rounded-full grid place-items-center">
                            <PlusIcon width="20" height="20" className="text-white" />
                        </div>
                        <span>Открыть новый продукт</span>
                    </button>
                </section>
                <section className="bg-white mx-4 p-4 rounded-2xl mb-3">
                    <div className="grid grid-cols-[max-content_1fr_max-content] mb-2">
                        <div className="size-5" />
                        <p className="font-medium text-center">Как вам интернет-банк?</p>
                        <button className="size-5 grid place-items-center">
                            <XIcon width="20" height="20" className="text-[#6f6f6f]" />
                        </button>
                    </div>
                    <div>
                        <ul className="flex items-center justify-center gap-1">
                            {
                                new Array(5).fill(0).map((_, index) =>
                                    <li key={index}>
                                        <button className="size-10 cursor-pointer rounded-full">
                                            <img src="./star.svg" width="40" height="40" />
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </section>
                <section className="grid grid-cols-8 px-4 gap-2">
                    <div className="col-span-8 rounded-2xl bg-[#2b61ec] p-4 min-h-32" id="banner1">
                        <h2 className="text-white text-lg font-medium leading-none mb-1">Не забудь про задание от Миши!</h2>
                        <p className="text-white">Ваши жизни восстановились</p>
                    </div>
                    <div className="col-span-5 rounded-2xl bg-[#4a3d9b] p-4 min-h-32">
                        <div className="flex justify-between items-start gap-1">
                            <h2 className="flex-1 text-white text-md font-medium leading-none">Премиум карта</h2>
                            <button className="grid place-items-center bg-[#45398f] rounded-full size-4">
                                <XIcon width="14" height="14" />
                            </button>
                        </div>
                    </div>
                    <div className="col-span-3 rounded-2xl bg-[#a5304e] p-4 min-h-32">
                        <div className="flex justify-between items-start gap-1">
                            <h2 className="flex-1 text-white text-md font-medium leading-none">Премиум карта</h2>
                            <button className="grid place-items-center bg-[#992d48] rounded-full size-4">
                                <XIcon width="14" height="14" />
                            </button>
                        </div>
                    </div>
                </section>
                <section className="grid place-items-center px-4 py-4">
                    <p>Далее идет то, что не относится к хакатону</p>
                </section>
            </main>
        </Layout>
    )
}
