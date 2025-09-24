export type Category = {
  id: string
  name: string
  slug: string
  description: string
  image_url?: string
}

export type Product = {
  id: string
  name: string
  price: number
  category_id: string
  image_url?: string
  recommended?: boolean
}