import type { ProductWithUrl } from '@/types';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';

export function useCart() {
  const cart = useCartStore();

  const { products, itemQty, subtotal, lineTotal, isEmpty, total } = storeToRefs(cart);

  function addToCart(product: ProductWithUrl, qty = 1) {
    cart.add(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category_id: product.category_id,
        slug: product.slug,
        imageUrl: product?.imageUrl,
      },
      qty,
    );
    toast.info("Product Added")
  }

  function inc(id: number) {
    cart.setQty(id, itemQty.value(id) + 1);
  }

  function dec(id: number) {
    const next = itemQty.value(id) - 1;
    cart.setQty(id, next);
  }

  function setQtyFromInput(id: number, raw: string | number) {
    const value = typeof raw === 'number' ? raw : Number(raw);
    const safe = Number.isFinite(value) && value > 0 ? value : 1;
    cart.setQty(id, safe);
  }

  return {
    products,
    itemQty,
    subtotal,
    lineTotal,
    isEmpty,
    total,

    addToCart,
    inc,
    dec,
    setQtyFromInput,
    cart,
  };
}
