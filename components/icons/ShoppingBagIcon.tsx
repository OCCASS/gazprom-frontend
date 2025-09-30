const ShoppingBagIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M22.0183 28.6667H10.8879C6.79938 28.6667 3.66284 27.1899 4.55377 21.2464L5.59114 13.1914C6.14034 10.2258 8.03203 9.09076 9.69183 9.09076H23.2631C24.9474 9.09076 26.7292 10.3112 27.3638 13.1914L28.4012 21.2464C29.1579 26.5187 26.1068 28.6667 22.0183 28.6667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22.2014 8.79786C22.2014 5.61643 19.6223 3.03737 16.4409 3.03737V3.03737C14.9089 3.03088 13.4374 3.63492 12.3518 4.71593C11.2662 5.79693 10.656 7.26585 10.656 8.79786H10.656" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.3951 14.8024H20.3341" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.6209 14.8024H12.5599" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default ShoppingBagIcon;
