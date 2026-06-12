import { NextResponse } from "next/server"
import { Product } from "@/lib/models/product"
import { connectDB } from "@/lib/mongodb"

const products = [
  { name: "Osh", price: 30000, category: "Taomlar", description: "An'anaviy palov" },
  { name: "Manti", price: 25000, category: "Taomlar", description: "4 dona manti" },
  { name: "Somsa", price: 12000, category: "Non mahsulotlari", description: "Go'shtli somsa" },
  { name: "Shashlik", price: 15000, category: "Grill", description: "1 porsiya shashlik" },
  { name: "Lag'mon", price: 22000, category: "Taomlar", description: "Uy lag'mon" },
  { name: "Choy", price: 3000, category: "Ichimliklar", description: "Ko'k choy" },
  { name: "Non", price: 3000, category: "Non mahsulotlari", description: "Issiq non" },
  { name: "Salat", price: 8000, category: "Yengil taomlar", description: "Achiq-chuchuk" },
  { name: "Kompot", price: 5000, category: "Ichimliklar", description: "Uy kompoti" },
  { name: "Qozon kabob", price: 35000, category: "Taomlar", description: "Qozonda pishirilgan kabob" },
  { name: "Kotlet", price: 18000, category: "Taomlar", description: "Kartoshka bilan" },
  { name: "Mastava", price: 18000, category: "Sho'rvalar", description: "Guruchli mastava" },
  { name: "Sho'rva", price: 20000, category: "Sho'rvalar", description: "Mol go'shtli sho'rva" },
  { name: "Qatlam", price: 10000, category: "Non mahsulotlari", description: "Pishloqli qatlam" },
  { name: "Piyola qaymoq", price: 5000, category: "Yengil taomlar", description: "Qaymoq" },
]

export async function GET() {
  await connectDB()
  await Product.deleteMany({})
  await Product.insertMany(products)
  return NextResponse.json({ message: "Seed muvaffaqiyatli", count: products.length })
}
