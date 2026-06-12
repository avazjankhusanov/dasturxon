import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dasturxon",
  description: "Mahsulotlar katalogi",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="uz">
        <body className="bg-gray-50 min-h-screen">{children}</body>
      </html>
    </ClerkProvider>
  )
}
