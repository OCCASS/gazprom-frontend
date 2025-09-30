const CapIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12.5625 3.16248L5.03752 8.07498C2.62502 9.64998 2.62502 13.175 5.03752 14.75L12.5625 19.6625C13.9125 20.55 16.1375 20.55 17.4875 19.6625L24.975 14.75C27.375 13.175 27.375 9.66248 24.975 8.08748L17.4875 3.17498C16.1375 2.27498 13.9125 2.27498 12.5625 3.16248Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.03752 16.35L7.02502 22.2125C7.02502 23.8 8.25002 25.5 9.75002 26L13.7375 27.325C14.425 27.55 15.5625 27.55 16.2625 27.325L20.25 26C21.75 25.5 22.975 23.8 22.975 22.2125V16.4125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26.75 18.75V11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default CapIcon;
