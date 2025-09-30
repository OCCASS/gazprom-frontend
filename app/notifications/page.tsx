import Layout from "@/components/Layout/Layout";
import Link from "next/link";

const notifications = [
    { title: "Время отдохнуть после работы", content: "Ваши жизни восстановились" }
]

const Page = () => {
    return (
        <Layout withNavbar={false}>
            <header className="py-4 px-4 space-y-2">
                <Link href="/" className="block">
                    <img src="./arrow-left.svg" width="32" height="32" />
                </Link>
                <h1 className="font-medium text-3xl">Уведомления</h1>
            </header>
            <main className="px-4 space-y-4">
                <ul>
                    {
                        notifications.map((item, index) =>
                            <li key={index} className="p-4 bg-[#2b61ec] text-white rounded-2xl space-y-3 min-h-24">
                                <p className="leading-none font-medium text-lg tracking-wide">{item.title}</p>
                                <p className="leading-none">{item.content}</p>
                            </li>
                        )
                    }
                </ul>
            </main>
        </Layout>
    )
}

export default Page;
