const HomeIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M8.26837 2.60328L3.32754 6.45328C2.50254 7.09495 1.83337 8.46078 1.83337 9.49661V16.2891C1.83337 18.4158 3.56587 20.1574 5.69254 20.1574H16.3075C18.4342 20.1574 20.1667 18.4158 20.1667 16.2983V9.62494C20.1667 8.51578 19.4242 7.09495 18.5167 6.46245L12.8517 2.49328C11.5684 1.59495 9.50587 1.64078 8.26837 2.60328Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 16.4908V13.7408" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default HomeIcon;
