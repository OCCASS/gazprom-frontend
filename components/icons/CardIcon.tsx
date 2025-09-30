const CardIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1.83337 7.7962H20.1667" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.5 15.1295H7.33333" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.625 15.1295H13.2917" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.90337 3.21289H16.0875C19.3509 3.21289 20.1667 4.01956 20.1667 7.23706V14.7629C20.1667 17.9804 19.3509 18.7871 16.0967 18.7871H5.90337C2.64921 18.7962 1.83337 17.9896 1.83337 14.7721V7.23706C1.83337 4.01956 2.64921 3.21289 5.90337 3.21289Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default CardIcon;
