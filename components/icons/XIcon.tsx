const XIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M3.97059 3L11.5 11M3.5 11L11.5 3" stroke="currentColor" strokeLinecap="round" />
        </svg>
    )
}

export default XIcon;
