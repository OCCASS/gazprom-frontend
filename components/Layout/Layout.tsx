import Navbar from "../Navbar";

const Layout = ({ children, withNavbar = true }: { withNavbar?: boolean, children: React.ReactNode }) => {
    return (
        <>
            {children}
            {withNavbar && <Navbar />}
        </>
    )
}

export default Layout;
