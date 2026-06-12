import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { Product } from "@/lib/models/product"
import { connectDB } from "@/lib/mongodb"

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await connectDB()
  const products = await Product.find().sort({ createdAt: -1 }).lean()
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  await connectDB()
  const product = await Product.create(body)
  return NextResponse.json(product, { status: 201 })
}
