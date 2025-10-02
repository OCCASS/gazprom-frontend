import BackButton from "@/components/BackButton";
import CategoryCard from "./components/CategoryCard";
import { CATEGOREIS } from "./constants";

const Page = () => {
    return (
        <div className="p-4">
            <div className="relative h-12 mb-8">
                <BackButton className="absolute left-0 top-1/2 -translate-y-1/2" />
                <h1
                    className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 font-halvar font-bold text-3xl text-center">
                    Категории
                </h1>
            </div>
            <div>
                <ul className="space-y-4">
                    {
                        Object.entries(CATEGOREIS).map(([key, value]) =>
                            <li key={key}>
                                <CategoryCard
                                    id={key}
                                    name={value.name}
                                    image={value.image}
                                    maxLevelCount={value.levels.maxCount}
                                    stars={value.stars}
                                />
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Page;
