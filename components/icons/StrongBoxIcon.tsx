const StrongBoxIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M8.25004 20.1666H13.75C18.3334 20.1666 20.1667 18.3333 20.1667 13.75V8.24998C20.1667 3.66665 18.3334 1.83331 13.75 1.83331H8.25004C3.66671 1.83331 1.83337 3.66665 1.83337 8.24998V13.75C1.83337 18.3333 3.66671 20.1666 8.25004 20.1666Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.1552 10.0009C13.0635 10.6518 12.6785 11.2018 12.1468 11.5318V13.3468C12.1468 13.9793 11.6335 14.4926 11.001 14.4926C10.3685 14.4926 9.85517 13.9793 9.85517 13.3468V11.5318C9.32351 11.2018 8.9385 10.6518 8.84683 10.0009C8.8285 9.90011 8.81934 9.79011 8.81934 9.68011C8.81934 8.28677 10.1394 7.20511 11.5877 7.59011C12.321 7.78261 12.9168 8.37845 13.1093 9.11178C13.1918 9.41428 13.201 9.71678 13.1552 10.0009Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
            <path d="M20.1681 10.001H13.1556" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
            <path d="M8.84587 10.0009H1.83337" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
        </svg>
    )
}

export default StrongBoxIcon;
