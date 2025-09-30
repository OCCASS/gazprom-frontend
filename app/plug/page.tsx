import Layout from "@/components/Layout/Layout";
import BackButton from "./components/BackButton";

const Page = () => {
    return (
        <Layout>
            <main className="p-6 flex flex-col items-center">
                <p>Эта страница не относится к хакатону</p>
                <BackButton />
            </main>
        </Layout>
    )
}

export default Page;
