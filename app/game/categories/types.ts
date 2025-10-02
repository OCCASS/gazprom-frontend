export interface GameCategory {
    name: string
    stars: number
    image: string
    levels: {
        maxCount: number
        Component: React.ComponentType
    }
}
