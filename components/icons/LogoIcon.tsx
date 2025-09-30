const LogoIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1 25C1 25 7.30862 25 12.1064 25M1 25H12.1064M1 25L5.31915 15.69M12.1064 25C14.3464 25 16.257 25 17.0426 25C19.5106 25 22.5957 21.8333 23.8298 19.3C25.0638 16.7667 30 6 30 6C30 6 19.5106 6 14.5745 6C9.6383 6 7.17021 11.7 7.17021 11.7L5.31915 15.69M12.1064 25C12.1064 25 16.4255 21.6433 17.6596 18.6667C18.8936 15.69 20.7447 11.7 20.7447 11.7C20.7447 11.7 14.5745 11.7 12.1064 11.7C9.6383 11.7 5.31915 15.69 5.31915 15.69" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

export default LogoIcon;
