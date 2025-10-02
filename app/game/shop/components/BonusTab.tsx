import Image from "next/image";

const shops = [
    { text: "Рив Гош", image: "/rivgosh.png" },
    { text: "ДоДо Пицца", image: "/dodo.png" },
    { text: "Лента", image: "/lenta.png" },
    { text: "Wink", image: "/wink.png" },
]

const BonusTab = () => {
    return (
        <>
            <p className="text-xl font-medium">Скидки за 3000 очков</p>
            <div className="flex gap-3 overflow-auto">
                {shops.map((item, index) => <div key={index} className="flex-shrink-0 flex flex-col items-center gap-2">
                    <Image width="80" height="80" alt={item.text} src={item.image} className="rounded-full" />
                    <p>{item.text}</p>
                </div>)}
            </div>
            <div>
            </div>
        </>
    )
}

export default BonusTab;
