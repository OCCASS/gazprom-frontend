import { twMerge } from "tailwind-merge";
import Navbar from "../Navbar";

const Layout = ({ children, withNavbar = true }: { withNavbar?: boolean, children: React.ReactNode }) => {
    return (
        <>
            <div className={twMerge(withNavbar ? "pb-24" : "pb-4")}>
                {children}
            </div>
            {withNavbar && <Navbar />}
        </>
    )
}

export default Layout;
