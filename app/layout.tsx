import type React from "react";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
    title: "UCLA MSA Ramadan Schedule | Powered by AMIN",
    description: "Ramadan schedule for UCLA Muslim Student Association",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {children} <Analytics />
            </body>
        </html>
    );
}

import "./globals.css";
