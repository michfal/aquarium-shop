// stores/cart.ts
import { defineStore } from 'pinia'
import type { CartItem, CartState, ShippingOption } from '@/types'

const STORAGE_KEY = 'cart-v1'

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    shippingMethod: null,
    discount: 0,
    v: 1,
  }),

  persist: {
    key: STORAGE_KEY, // trafia do localStorage
  },

  getters: {
    products: (state) => state.items,
    count: (state) => {
      return (id: number | string) => {
        const itemQty = state.items.find((item) => item.id === id)
        return itemQty?.qty ?? null
      }
    },
    countTotal: (state) => state.items.reduce((sum, item) => sum + item.qty, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    lineTotal: (state) => {
      return (id: number | string) => {
        const item = state.items.find((item) => item.id === id)
        return item ? item.price * item.qty : null
        
      }
    },
    isEmpty(): boolean { return this.items.length === 0 },
    shippingCost: (state) => state.shippingMethod?.price ?? 0,
    total(): number {
      const total = this.subtotal + this.shippingCost - this.discount   
      return total
    },
  },

  actions: {
    add(item: Omit<CartItem, 'qty'>, qty = 1) {
      if (qty <= 0) return
      const existing = this.items.find(i => i.id === item.id)
      if (existing) {
        existing.qty += qty
      } else {
        this.items.push({ ...item, qty })
      }
    },

    setQty(id: number, qty: number) {
      if (qty <= 0) {
        this.remove(id)
        return
      }
      const row = this.items.find(i => i.id === id)
      if (row) row.qty = qty
    },

    remove(id: number) {
      this.items = this.items.filter(i => i.id !== id)
    },

    clear() {
      this.items = []
      this.$reset() // zachowa v
    },

    // bezpiecznik cen – w krytycznych miejscach dociąga aktualne ceny z serwera
    refreshPrices(latest: Array<{ id: number; price: number }>) {
      const map = new Map(latest.map(p => [p.id, p.price]))
      this.items.forEach(i => {
        const price = map.get(i.id)
        if (price != null) i.price = price
      })
    },

    setShipping(option: ShippingOption) {
      this.shippingMethod = option
    },
  },
})
