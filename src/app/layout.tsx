import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dasturxon — Haqiqiy O'zbek ta'mi",
  description: "Dasturxon — Toshkentdagi milliy oshxona. An'anaviy o'zbek taomlari, yurak to'la mehmon-do'stlik.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="uz">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
