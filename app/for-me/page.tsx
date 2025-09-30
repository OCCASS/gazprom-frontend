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
                <section className="p-4 flex gap-2">
                    <Story title="Учитесь играя" image="./story1.png" />
                    <Story title="Банкоматы" image="./story2.png" />
                    <Story title="Тренды" image="./story2.png" />
                </section>
                <section className="bg-white rounded-2xl mx-4 p-4">
                    <h2 className="font-medium text-lg">Моя выгода</h2>
                    <div className="grid grid-cols-2">
                        <div className="bg-[#f5f5f5] rounded-xl p-3">
                            <p>Кешбек</p>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export default Page;
