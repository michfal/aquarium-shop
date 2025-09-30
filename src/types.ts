export type Category = {
  id: string
  name: string
  slug: string
  description: string
  image_url?: string
}

export type Product = {
  id: number
  name: string
  price: number
  category_id: number
  image?: string
  recommended?: boolean
  slug: string
}

export type ProductWitUrl = Product & { imageUrl: string | null }