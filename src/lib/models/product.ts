import mongoose, { Schema, Document } from "mongoose"

export interface IProduct extends Document {
  name: string
  price: number
  category: string
  description?: string
  image?: string
  createdAt: Date
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
