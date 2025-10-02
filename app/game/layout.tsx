"use client"

import { MAX_HEALTH } from "@/game/constants";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const tryRestoreHealth = () => {
            const restoreHealthAtRaw = localStorage.getItem("restoreHealthAt")
            if (!restoreHealthAtRaw) return
            const restoreHealthAt = Number.parseInt(restoreHealthAtRaw)
            const restoreHealthAtDate = new Date(restoreHealthAt)
            const now = new Date()
            if (restoreHealthAtDate <= now) {
                localStorage.setItem("health", `${MAX_HEALTH}`)
                return
            }
        }

        const interval = setInterval(tryRestoreHealth, 10000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return <div className="w-full h-full bg-[#eceef9]">{children}</div>
}

export default Layout;
