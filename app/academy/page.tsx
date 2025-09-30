import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const items = [
    { title: "Учись играя", subtitle: "Ответы на главные вопросы", image: "./academy1.png", background: "#b2deff", color: "#000000", id: "academy_game" },
    { title: "Проще онлайн", subtitle: "Когда не нужно идти в офис", image: "./academy2.png", background: "#ffffff", color: "#000000" },
    { title: "Ипотека", subtitle: "Как оформить, оплатить, погасить", image: "./academy3.png", background: "#d6c6b1", color: "#000000" },
    { title: "Счета и вклады", subtitle: "Отвечаем на частые вопросы", image: "./academy4.png", background: "#ffffff", color: "#000000" },
    { title: "Интернет-банк", subtitle: "Всегда под рукой", image: "./academy1.png", background: "#ffffff" },
    { title: "Дебетовые карты", subtitle: "Что настроить сразу", image: "./academy2.png", background: "#586078", color: "#ffffff" },
]

const Page = () => {
    return <Layout>
        <header className="py-4 px-4 space-y-2">
            <Link href="/" className="block">
                <img src="./arrow-left.svg" width="32" height="32" />
            </Link>
            <h1 className="font-medium text-3xl">Академия</h1>
        </header>
        <main className="px-4 grid grid-cols-2 gap-3">
            {items.map((item, index) =>
                <div key={index} className={`relative space-y-2 p-4 rounded-2xl h-64 overflow-hidden cursor-pointer`} style={{ backgroundColor: item.background, color: item.color }} id={item.id}>
                    <p className="font-medium text-lg">{item.title}</p>
                    <p className="leading-none text-lg">{item.subtitle}</p>
                    <img src={item.image} className={twMerge("absolute bottom-0 h-36", index % 2 === 0 ? "right-0" : "left-0")} />
                </div>
            )}
        </main>
    </Layout>
}

export default Page;
