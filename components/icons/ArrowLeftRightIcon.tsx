const ArrowLeftRightIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M23.04 13.9333L28 8.9733L23.04 4.01334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 8.9733H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.95996 18.0667L4 23.0267L8.95996 27.9867" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28 23.0267H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default ArrowLeftRightIcon;
