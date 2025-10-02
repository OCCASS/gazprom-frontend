import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Tour from "@/components/Tour";

const GazprombankSansFont = localFont({
    src: [
        {
            path: "../fonts/Gazprombank_Sans/Gazprombank_Sans_Normal.woff2",
            weight: "400",
            style: "normal"
        },
        {
            path: "../fonts/Gazprombank_Sans/Gazprombank_Sans_DemiBold.woff2",
            weight: "500",
            style: "normal"
        },
        {
            path: "../fonts/Gazprombank_Sans/Gazprombank_Sans_Bold.woff2",
            weight: "600",
            style: "normal"
        },
        {
            path: "../fonts/Gazprombank_Sans/Gazprombank_Sans_Normal_Italic.woff2",
            weight: "400",
            style: "italic"
        },
        {
            path: "../fonts/Gazprombank_Sans/Gazprombank_Sans_DemiBold_Italic.woff2",
            weight: "500",
            style: "italic"
        },
        {
            path: "../fonts/Gazprombank_Sans/Gazprombank_Sans_Bold_Italic.woff2",
            weight: "600",
            style: "italic"
        }
    ],
    variable: "--font-gazprom-font"
})

const HalvarBreitFont = localFont({
    src: [
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-Lt.woff2", weight: "400", style: "normal" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-LtSlanted.woff2", weight: "400", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-LtSuSlanted.woff2", weight: "400", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-Rg.woff2", weight: "500", style: "normal" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-RgSlanted.woff2", weight: "500", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-RgSuSlanted.woff2", weight: "500", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-Md.woff2", weight: "600", style: "normal" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-MdSlanted.woff2", weight: "600", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-MdSuSlanted.woff2", weight: "600", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-Bd.woff2", weight: "700", style: "normal" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-BdSlanted.woff2", weight: "700", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-BdSuSlanted.woff2", weight: "700", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-XBd.woff2", weight: "800", style: "normal" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-XBdSlanted.woff2", weight: "800", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-XBdSuSlanted.woff2", weight: "800", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-Th.woff2", weight: "300", style: "normal" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-ThSlanted.woff2", weight: "300", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-ThSuSlanted.woff2", weight: "300", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-XTh.woff2", weight: "200", style: "normal" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-XThSlanted.woff2", weight: "200", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-XThSuSlanted.woff2", weight: "200", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-Blk.woff2", weight: "900", style: "normal" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-BlkSlanted.woff2", weight: "900", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-BlkSuSlanted.woff2", weight: "900", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-Hl.woff2", weight: "550", style: "normal" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-Hl_1.woff2", weight: "550", style: "normal" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-HlSlanted.woff2", weight: "550", style: "italic" },
        { path: "../fonts/Halvar_Breitschrift/HalvarBreit-HlSuSlanted.woff2", weight: "550", style: "italic" },
    ],
    variable: "--font-halvar-font"
})

export const metadata: Metadata = {
    title: "Газпром",
    description: "Газпром",
};

const steps = [
    { selector: "#banner1", text: "Это основная точка входа", canClick: false },
    { selector: "#notification_button", text: "Чтобы перейти ко второй точке входа,необходимо зайти в раздел «Уведомления»", canClick: true },
    { selector: "#game_notification", text: "Чтобы перейти ко второй точке входа,необходимо зайти в раздел «Уведомления»", canClick: false },
    { selector: "#notifications_back", text: "Выйдите из этого раздела", canClick: true },
    { parentSelector: "#navbar", selector: "#navbar_for_me", text: "Для третьей точки входа перейдите в раздел «Для меня»", canClick: true },
    { parentSelector: "#for-me_options", selector: "#open_savings", text: "Для третьей точки входа нажмите на «Открыть вклад или счёт»", canClick: true },
    { selector: "#banner2", text: "Это третья точка входа", canClick: false },
    { parentSelector: "#navbar", selector: "#navbar_main", text: "Для четвертой точки входа перейдите в раздел «Главный»", canClick: true },
    { selector: "#profile_image", text: "Для четвертой точки входа перейдите в «Профиль»", canClick: true },
    { selector: "#profile_academy", text: "Для четвертой точки входа перейдите в «Академию»", canClick: true },
    { selector: "#academy_game", text: "Это четвертая точка входа", canClick: false },
]

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ru" className={`${GazprombankSansFont.variable} ${HalvarBreitFont.variable}`}>
            <body className="bg-[#f5f5f5] h-screen">
                <Tour steps={steps}>
                    {children}
                </Tour>
            </body>
        </html>
    );
}
