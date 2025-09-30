const CalendarIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M4.12352 12.539H27.8888" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21.9228 17.7463H21.9351" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.0062 17.7463H16.0185" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.0772 17.7463H10.0895" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21.9228 22.9283H21.9351" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.0062 22.9283H16.0185" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.0772 22.9283H10.0895" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21.3916 2.66669V7.05439" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.6207 2.66669V7.05439" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path fillRule="evenodd" clipRule="evenodd" d="M21.651 4.77228H10.3613C6.4457 4.77228 4 6.95352 4 10.963V23.0292C4 27.1017 6.4457 29.3333 10.3613 29.3333H21.6387C25.5666 29.3333 28 27.1395 28 23.13V10.963C28.0123 6.95352 25.579 4.77228 21.651 4.77228Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default CalendarIcon;
