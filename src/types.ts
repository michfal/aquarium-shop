import type { Ref } from 'vue';

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url?: string;
  image?: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  category_id: number;
  image?: string;
  recommended?: boolean;
  slug: string;
  description?: string;
};

export type ProductWithUrl = Product & { imageUrl?: string | null };
export type CategoryWithUrl = Category & { imageUrl: string | null };

export type MaybeRef<T> = T | Ref<T>;

export type CartItem = Omit<ProductWithUrl, 'recommended'> & { qty: number };

export type ShippingOption = {
  id: string;
  name: string;
  price: number;
};

export type CartState = {
  items: CartItem[];
  shippingMethod: ShippingOption | null;
  discount: number;
  v: 1;
};
