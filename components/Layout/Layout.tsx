import { twMerge } from "tailwind-merge";
import Navbar from "../Navbar";

const Layout = ({ children, className, withNavbar = true }: { withNavbar?: boolean, children: React.ReactNode, className?: string }) => {
    return (
        <>
            <div className={twMerge(withNavbar ? "pb-24" : "pb-4", className)}>
                {children}
            </div>
            {withNavbar && <Navbar />}
        </>
    )
}

export default Layout;
