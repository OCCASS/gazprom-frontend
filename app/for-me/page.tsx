import Header from "@/components/Header";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import Story from "./components/Story";

const Page = () => {
    return (
        <Layout>
            <Header>
                <Link href="/settings" className="size-7 cursor-pointer rounded-full">
                    <img src="./settings.svg" width="28" height="28" />
                </Link>
            </Header>
            <main>
                <section className="p-4 flex gap-2 overflow-auto">
                    <Story title="Учитесь играя" image="./story1.png" />
                    <Story title="Банкоматы" image="./story2.png" />
                    <Story title="Тренды" image="./story2.png" />
                </section>
                <section className="bg-white rounded-2xl mx-4 mb-4 px-4 py-6">
                    <h2 className="font-medium text-xl mb-3">Моя выгода</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col justify-between min-h-32 bg-[#f5f5f5] rounded-xl p-4">
                            <p className="font-medium text-lg">Кешбек</p>
                            <div className="space-y-1">
                                <p className="leading-none font-medium text-lg">0 Б</p>
                                <p className="leading-none text-[#6f6f6f]">бонусов накоплено</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between min-h-32 bg-[#f5f5f5] rounded-xl p-4">
                            <p className="leading-none font-medium text-lg">Приведите друга</p>
                            <div className="w-fit bg-white px-3 py-1 rounded-full">
                                <span className="leading-none">до 8 000 ₽</span>
                            </div>
                        </div>
                        <div className="overflow-hidden relative col-span-2 flex flex-col justify-center min-h-16 bg-[#f5f5f5] rounded-xl p-4">
                            <p className="w-1/2 leading-none font-medium text-lg">Газпром бонус с подпиской в подарок</p>
                            <img src="./banner.png" className="absolute right-0" width="120" />
                        </div>
                    </div>
                </section>
                <section className="bg-white rounded-2xl mx-4 px-4 py-6 mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-medium text-xl">Акции от партнеров</h2>
                        <button className="text-[#4275F9] text-lg px-3 py-1 rounded-xl">Все</button>
                    </div>
                    <div className="flex overflow-auto gap-3">
                        <div className="flex-shrink-0 text-white h-64 max-w-64 rounded-xl p-4 space-y-4 bg-[linear-gradient(45deg,rgba(247,10,169,1)_0%,rgba(233,24,188,1)_50%,rgba(203,54,229,1)_100%)] cursor-pointer">
                            <div className="flex justify-between gap-8 items-end">
                                <p className="leading-none font-medium text-3xl">до 5%</p>
                                <img src="./rivgosh.png" className="rounded-full" />
                            </div>
                            <p className="leading-none">Кешбэк в интернет-магазине РИВ ГОШ</p>
                        </div>
                        <div className="flex-shrink-0 text-white h-64 max-w-64 rounded-xl p-4 space-y-4 bg-radial from-[#1E81D3] to-[#313664] cursor-pointer">
                            <div className="flex justify-between gap-8 items-end">
                                <p className="leading-none font-medium text-3xl">до 30%</p>
                                <img src="./rivgosh.png" className="rounded-full" />
                            </div>
                            <p className="leading-none">Скидка на карту для
                                оплаты за границей</p>
                        </div>
                    </div>
                </section>
                <section className="bg-white rounded-2xl mx-4 px-4 py-6 mb-4">
                    <h2 className="font-medium text-xl mb-3">Лучшие предложения</h2>
                    <div className="flex overflow-auto gap-3">
                        <div className="flex-shrink-0 relative text-white h-32 w-72 rounded-xl p-4 space-y-2 bg-gradient-to-br from-[#6E0F08] to-[#A4190F] cursor-pointer">
                            <p className="leading-none text-xl">Копите на счете</p>
                            <p>до 17% в рублях</p>
                            <img src="./banner2.png" className="absolute bottom-0 right-0" />
                        </div>
                        <div className="flex-shrink-0 relative text-white h-32 w-72 rounded-xl p-4 space-y-2 bg-gradient-to-br from-[#303D70] to-[#2175C1] cursor-pointer">
                            <p className="leading-none text-xl">Копите на счете</p>
                            <p>до 17% в рублях</p>
                            <img src="./banner2.png" className="absolute bottom-0 right-0" />
                        </div>
                    </div>
                </section>
                <section className="bg-white rounded-2xl mx-4 px-4 py-6">
                    <h2 className="font-medium text-xl mb-3">Открыть продукт</h2>
                    <ul>
                        <li className="flex items-center gap-4">
                            <img src="./card.svg" width="24" height="24" className="py-3" />
                            <Link href="#" className="py-3 flex-1 border-b border-[#dfdfdf]">Подобрать карту</Link>
                        </li>
                        <li className="flex items-center gap-4">
                            <img src="./percent.svg" width="24" height="24" className="py-3" />
                            <Link href="#" className="py-3 flex-1 border-b border-[#dfdfdf]">Взять кредит</Link>
                        </li>
                        <li className="flex items-center gap-4">
                            <img src="./strong-box.svg" width="24" height="24" className="py-3" />
                            <Link href="/savings" className="py-3 flex-1 border-b border-[#dfdfdf]">Открыть вклад или счёт</Link>
                        </li>
                        <li className="flex items-center gap-4">
                            <img src="./home.svg" width="24" height="24" className="py-3" />
                            <Link href="#" className="py-3 flex-1 border-b border-[#dfdfdf]">Оформить ипотеку</Link>
                        </li>
                        <li className="flex items-center gap-4">
                            <img src="./work-bag.svg" width="24" height="24" className="py-3" />
                            <Link href="#" className="py-3 flex-1">Инвестировать</Link>
                        </li>
                    </ul>
                </section>
            </main>
        </Layout>
    )
}

export default Page;
