const PlusIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeLinecap="round" />
        </svg>
    )
}

export default PlusIcon;
