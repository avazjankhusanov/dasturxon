import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-emerald-700">Dasturxon</h1>
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link href="/products" className="text-emerald-600 hover:text-emerald-800 font-medium">
                Mahsulotlar
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 cursor-pointer">
                  Kirish
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-20 text-center">
        <SignedOut>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Dasturxonga xush kelibsiz!</h2>
          <p className="text-lg text-gray-600 mb-8">Mahsulotlarimizni ko'rish uchun tizimga kiring</p>
          <SignInButton mode="modal">
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-emerald-700 cursor-pointer">
              Tizimga kirish
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Mahsulotlar katalogi</h2>
          <p className="text-lg text-gray-600 mb-8">Barcha mahsulotlarni ko'rish uchun pastdagi tugmani bosing</p>
          <Link href="/products">
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-emerald-700 cursor-pointer">
              Mahsulotlarni ko'rish
            </button>
          </Link>
        </SignedIn>
      </main>
    </div>
  )
}
