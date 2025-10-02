import { CATEGOREIS } from "@/app/game/categories/constants";

export function canOpenLevel(categoryId: string, levelId: string) {
    // @ts-ignore
    if (CATEGOREIS[categoryId].levels[levelId].isDev) return false
    const health = localStorage.getItem("health")
    if (health === "0") return false
    return true
}
