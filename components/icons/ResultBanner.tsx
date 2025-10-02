const ResultBanner = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 315 57" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M9.36471 4.11901C9.36471 4.11901 4 4.70015 4 9.65965C4 14.6191 9.36471 17.6191 9.36471 28.8787C9.36471 40.1383 4 44.1191 4 47.7515C4 51.3839 9.36471 53.119 9.36471 53.119H305.462C305.462 53.119 311 53.884 311 47.7515C311 41.619 303.712 48.0978 303.5 28.8787C303.288 9.65965 311 16.619 311 9.65965C311 2.70028 305.462 4.11901 305.462 4.11901H9.36471Z" fill="#6088E4" stroke="#6088E4" strokeWidth="7" strokeLinecap="round" />
        </svg>
    )
}

export default ResultBanner;
