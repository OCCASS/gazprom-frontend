const StackIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M17.5 11.5V17.5H2.5V11.5H17.5ZM17.5 2.5V8.5H2.5V2.5H17.5Z" stroke="currentColor" />
        </svg>
    )
}

export default StackIcon;
