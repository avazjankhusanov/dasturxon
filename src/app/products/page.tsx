import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Product } from "@/lib/models/product"
import { connectDB } from "@/lib/mongodb"

export default async function ProductsPage() {
  const { userId } = await auth()
  if (!userId) redirect("/")

  await connectDB()
  const products = await Product.find().sort({ createdAt: -1 }).lean()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-emerald-700">Dasturxon</h1>
          <span className="text-gray-500 text-sm">{products.length} ta mahsulot</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Barcha mahsulotlar</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p._id.toString()} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{p.name}</h3>
              {p.description && (
                <p className="text-gray-500 text-sm mb-3">{p.description}</p>
              )}
              <p className="text-emerald-600 font-bold text-xl">{p.price.toLocaleString()} so&apos;m</p>
              <span className="inline-block mt-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                {p.category}
              </span>
            </div>
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400">
              <p className="text-xl">Hozircha mahsulot yo&apos;q</p>
              <p className="text-sm mt-2">Mahsulot qo&apos;shish uchun admin panel orqali yoki API dan foydalaning</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
