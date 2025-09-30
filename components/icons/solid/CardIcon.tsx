const CardIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 37 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect width="37" height="27" rx="4" fill="currentColor" />
        </svg>
    )
}

export default CardIcon;
