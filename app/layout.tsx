import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const GazprombankSansFont = localFont({
    src: [
        {
            path: "../fonts/Gazprombank_Sans_Normal.woff2",
            weight: "400",
            style: "normal"
        },
        {
            path: "../fonts/Gazprombank_Sans_DemiBold.woff2",
            weight: "500",
            style: "normal"
        },
        {
            path: "../fonts/Gazprombank_Sans_Bold.woff2",
            weight: "600",
            style: "normal"
        },
        {
            path: "../fonts/Gazprombank_Sans_Normal_Italic.woff2",
            weight: "400",
            style: "italic"
        },
        {
            path: "../fonts/Gazprombank_Sans_DemiBold_Italic.woff2",
            weight: "500",
            style: "italic"
        },
        {
            path: "../fonts/Gazprombank_Sans_Bold_Italic.woff2",
            weight: "600",
            style: "italic"
        }
    ]
})

export const metadata: Metadata = {
    title: "Газпром",
    description: "Газпром",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ru" className={GazprombankSansFont.className}>
            <body className="bg-[#f5f5f5]">
                {children}
            </body>
        </html>
    );
}
