import type React from "react"
import "./globals.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "UCLA MSA Ramadan Schedule",
  description: "Ramadan schedule for UCLA Muslim Student Association",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'