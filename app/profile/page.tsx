import BackButton from "@/components/BackButton";
import BearLogoIcon from "@/components/icons/BearLogoIcon";
import CapIcon from "@/components/icons/CapIcon";
import LockIcon from "@/components/icons/LockIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import ShoppingBagIcon from "@/components/icons/solid/ShoppingBagIcon";
import WorkBagIcon from "@/components/icons/WorkBagIcon";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";

const Page = () => {
    return (
        <Layout withNavbar={false}>
            <header className="py-4 px-4 space-y-2">
                <BackButton />
            </header>
            <main className="px-4 space-y-4">
                <section className="grid grid-cols-[1fr_max-content] grid-rows-2 gap-4">
                    <div className="row-span-2 bg-white rounded-2xl px-4 py-6 flex flex-col items-center justify-center gap-2">
                        <BearLogoIcon width="120" height="120" id="profile_image" />
                        <div className="flex flex-col items-center gap-1">
                            <h2 className="text-2xl font-medium">Платон</h2>
                            <button className="leading-[1.2] cursor-pointer text-[#2f67f9] text-lg">
                                Сменить обращение
                            </button>
                        </div>
                    </div>
                    <button className="cursor-pointer bg-white rounded-2xl flex flex-col gap-1 items-center p-6 hover:text-[#2f67f9]">
                        <SettingsIcon width={44} height={44} strokeWidth={1} />
                        <p>Настройки</p>
                    </button>
                    <button className="cursor-pointer bg-white rounded-2xl flex flex-col gap-1 items-center p-6 hover:text-[#2f67f9]">
                        <WorkBagIcon width={44} height={44} strokeWidth={1} />
                        <p>Госуслуги</p>
                    </button>
                </section>
                <section className="relative bg-white rounded-2xl p-4 overflow-hidden">
                    <p>Газпром Бонус</p>
                    <p className="text-[#6f6f6f]">от 299 ₽/месяц</p>
                    <ShoppingBagIcon
                        width={89}
                        height={72}
                        className="absolute right-2 bottom-0 text-[#2F67F9]"
                    />
                </section>
                <section className="bg-white rounded-2xl p-4">
                    <ul>
                        <li className="flex items-center gap-4 hover:text-[#2B61EC]">
                            <ProfileIcon width={24} height={24} />
                            <Link href="#" className="py-3 flex-1 border-b border-[#dfdfdf]">Мои данные</Link>
                        </li>
                        <li className="flex items-center gap-4 hover:text-[#2B61EC]">
                            <LockIcon width={24} height={24} />
                            <Link href="#" className="py-3 flex-1">Кодовое слово</Link>
                        </li>
                    </ul>
                </section>
                <section className="bg-white rounded-2xl p-4" id="profile_academy">
                    <Link href="/academy" className="flex items-center gap-4">
                        <CapIcon width={40} height={40} className="size-10" />
                        <div className="space-y-1">
                            <p className="font-medium text-lg">Академия</p>
                            <p className="leading-none text-[#6f6f6f]">Советы о том, как пользоваться продуктами банка, и многое другое</p>
                        </div>
                    </Link>
                </section>
            </main>
        </Layout>
    )
}

export default Page;
