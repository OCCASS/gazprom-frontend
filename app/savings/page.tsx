import PlusIcon from "@/components/icons/PlusIcon";
import Layout from "@/components/Layout/Layout";
import { twMerge } from "tailwind-merge";

const switcher = [
    { label: "Все", selected: true },
    { label: "Вклады", selected: false },
    { label: "Счета", selected: false },
    { label: "Комбо", selected: false }
]

const Page = () => {
    return (
        <Layout>
            <header className="px-4 py-8">
                <h1 className="font-medium text-3xl">Сбережения и счета</h1>
            </header>
            <main className="px-4 space-y-5">
                <div className="bg-[#e2e2e2] rounded-[12px] overflow-hidden p-[2px] max-w-full w-fit">
                    <ul className="flex gap-2 overflow-auto">
                        {
                            switcher.map((item, index) =>
                                <li key={index}>
                                    <button className={twMerge("h-9 px-4", item.selected && "bg-white", index === 0 && "rounded-tl-[10px] rounded-bl-[10px]", index === switcher.length - 1 && "rounded-tr-[10px] rounded-br-[10px]")}>
                                        {item.label}
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div>
                    <ul className="flex gap-2 overflow-auto">
                        <li className="flex-shrink-0">
                            <button className="bg-[#e2e2e2] flex items-center gap-2 h-8 px-3 rounded-full cursor-pointer">
                                <PlusIcon width={18} height={18} />
                                <span>Фильтры</span>
                            </button>
                        </li>
                        <li className="flex-shrink-0">
                            <button className="bg-[#2B61EC] text-white flex items-center gap-2 h-8 px-3 rounded-full cursor-pointer">
                                Рубли
                            </button>
                        </li>
                        <li className="flex-shrink-0">
                            <button className="bg-[#e2e2e2] flex items-center gap-2 h-8 px-3 rounded-full cursor-pointer">
                                Евро
                            </button>
                        </li>
                        <li className="flex-shrink-0">
                            <button className="bg-[#e2e2e2] flex items-center gap-2 h-8 px-3 rounded-full cursor-pointer">
                                Юани
                            </button>
                        </li>
                        <li className="flex-shrink-0">
                            <button className="bg-[#e2e2e2] flex items-center gap-2 h-8 px-3 rounded-full cursor-pointer">
                                Лиры
                            </button>
                        </li>
                        <li className="flex-shrink-0">
                            <button className="bg-[#e2e2e2] flex items-center gap-2 h-8 px-3 rounded-full cursor-pointer">
                                Доллары
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="p-4 bg-[#2b61ec] text-white rounded-2xl space-y-3 min-h-24" id="banner2">
                    <p className="leading-none font-medium text-lg tracking-wide">Время отдохнуть после работы</p>
                    <p className="leading-none">Ваши жизни восстановились</p>
                </div>
                <section className="bg-white rounded-2xl px-4 py-6">
                    <div className="mb-3">
                        <h2 className="leading-6 font-medium text-xl mb-1">Накопительный счёт «Ежедневная
                            выгода»</h2>
                        <p className="leading-none text-lg">со снятием и пополнением</p>
                    </div>
                    <p className="text-[#2f67f9] text-3xl font-medium pb-3 border-b border-[#dfdfdf]">14,5 %</p>
                    <div className="py-3 grid grid-cols-2 gap-3 mb-3">
                        <div>
                            <p className="leading-none font-medium mb-1">любой</p>
                            <p className="leading-none">минимальный срок</p>
                        </div>
                        <div>
                            <p className="leading-none font-medium mb-1">любая</p>
                            <p className="leading-none">минимальная сумма</p>
                        </div>
                    </div>
                    <button className="w-full bg-[#2b61ec] text-white h-13 rounded-lg cursor-pointer">
                        Подробнее
                    </button>
                </section>
                <section className="grid place-items-center px-4 py-4">
                    <p>Далее идет то, что не относится к хакатону</p>
                </section>
            </main>
        </Layout>
    )
}

export default Page;
