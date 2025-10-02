const EmptyHeartIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M5.74373 23.1966C3.59773 16.4966 6.10573 8.83864 13.1397 6.57264C16.8397 5.37864 20.9237 6.08264 23.9997 8.39664C26.9097 6.14664 31.1437 5.38664 34.8397 6.57264C41.8737 8.83864 44.3977 16.4966 42.2537 23.1966C38.9137 33.8166 23.9997 41.9966 23.9997 41.9966C23.9997 41.9966 9.19573 33.9406 5.74373 23.1966Z" stroke="#DD41DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 13.3999C34.14 14.0919 35.652 16.0019 35.834 18.2439" stroke="#DD41DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default EmptyHeartIcon;
