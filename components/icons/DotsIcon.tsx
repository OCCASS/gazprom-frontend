const DotsIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 3 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            <circle cx="1.5" cy="8.5" r="1.5" fill="currentColor" />
            <circle cx="1.5" cy="15.5" r="1.5" fill="currentColor" />
        </svg>
    )
}

export default DotsIcon;
