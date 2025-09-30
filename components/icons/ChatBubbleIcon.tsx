const ChatBubbleIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M25.4285 25.4265C21.3536 29.5018 15.3197 30.3822 10.3819 28.0987C9.65294 27.8052 9.05531 27.568 8.48716 27.568C6.90465 27.5774 4.93488 29.1118 3.91114 28.0893C2.8874 27.0654 4.42301 25.0941 4.42301 23.5021C4.42301 22.9338 4.19522 22.3469 3.90176 21.6165C1.61711 16.6795 2.49881 10.6436 6.57367 6.5696C11.7755 1.3659 20.2267 1.3659 25.4285 6.56826C30.6396 11.78 30.6303 20.2241 25.4285 25.4265Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21.2525 16.5507H21.2645" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.9072 16.5507H15.9192" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.5619 16.5507H10.5739" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default ChatBubbleIcon;
