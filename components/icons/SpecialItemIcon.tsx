const SpeicalItemIcon = ({ width, height, ...props }: React.SVGAttributes<SVGElement>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 73 78" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g filter="url(#filter0_dddd_233_5463)">
                <path d="M32.8067 20.8797C34.1731 17.5945 38.8269 17.5945 40.1933 20.8797L43.1001 27.8685C43.6761 29.2535 44.9786 30.1997 46.4737 30.3196L54.0187 30.9245C57.5653 31.2088 59.0034 35.6348 56.3013 37.9495L50.5528 42.8737C49.4136 43.8495 48.9162 45.3806 49.2642 46.8396L51.0204 54.2023C51.846 57.6632 48.081 60.3986 45.0446 58.544L38.585 54.5985C37.305 53.8167 35.695 53.8167 34.415 54.5985L27.9554 58.544C24.919 60.3986 21.154 57.6632 21.9796 54.2023L23.7358 46.8397C24.0838 45.3806 23.5864 43.8495 22.4472 42.8737L16.6987 37.9495C13.9966 35.6348 15.4347 31.2088 18.9813 30.9245L26.5263 30.3196C28.0214 30.1997 29.3239 29.2535 29.8999 27.8685L32.8067 20.8797Z" fill="#FF82BE" />
                <path d="M33.7305 21.2637C34.7553 18.8001 38.2447 18.8001 39.2695 21.2637L42.1768 28.2529C42.8968 29.9838 44.5248 31.1665 46.3936 31.3164L53.9385 31.9209C56.5984 32.1341 57.677 35.4544 55.6504 37.1904L49.9023 42.1143C48.4785 43.3339 47.8562 45.2477 48.291 47.0713L50.0479 54.4346C50.6668 57.0301 47.8426 59.0813 45.5654 57.6904L39.1064 53.7451C37.5064 52.7678 35.4936 52.7678 33.8936 53.7451L27.4346 57.6904C25.1573 59.0813 22.3332 57.0301 22.9521 54.4346L24.709 47.0713C25.1438 45.2477 24.5215 43.3339 23.0977 42.1143L17.3496 37.1904C15.323 35.4544 16.4016 32.1341 19.0615 31.9209L26.6064 31.3164C28.4752 31.1665 30.1032 29.9839 30.8232 28.2529L33.7305 21.2637Z" stroke="#DD41DB" strokeWidth="2" />
            </g>
            <defs>
                <filter id="filter0_dddd_233_5463" x="0.29528" y="0.416016" width="72.4094" height="76.7271" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="3" dy="6" />
                    <feGaussianBlur stdDeviation="6" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.866667 0 0 0 0 0.254902 0 0 0 0 0.858824 0 0 0 0.4 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_233_5463" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="3" dy="-6" />
                    <feGaussianBlur stdDeviation="6" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.866667 0 0 0 0 0.254902 0 0 0 0 0.858824 0 0 0 0.4 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow_233_5463" result="effect2_dropShadow_233_5463" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="-3" dy="-6" />
                    <feGaussianBlur stdDeviation="6" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.866667 0 0 0 0 0.254902 0 0 0 0 0.858824 0 0 0 0.3 0" />
                    <feBlend mode="normal" in2="effect2_dropShadow_233_5463" result="effect3_dropShadow_233_5463" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="-3" dy="6" />
                    <feGaussianBlur stdDeviation="6" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.866667 0 0 0 0 0.254902 0 0 0 0 0.858824 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect3_dropShadow_233_5463" result="effect4_dropShadow_233_5463" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_233_5463" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

export default SpeicalItemIcon;
