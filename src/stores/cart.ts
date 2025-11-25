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
    itemQty: (state) => {
      return (id: number ) => {
        const itemQty = state.items.find((item) => item.id === id)
        return itemQty?.qty ?? 0
      }
    },
    countTotal: (state) => state.items.reduce((sum, item) => sum + item.qty, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    lineTotal: (state) => {
      return (id: number ) => {
        const item = state.items.find((item) => item.id === id)
        return item ? item.price * item.qty : null
        
      }
    },
    isEmpty(): boolean { return this.items.length === 0 },
    shippingCost: (state) => state.shippingMethod?.price ?? 0,
    total(): number {
      console.log(`subtotal: ${this.subtotal}`) 
      console.log(`shippingCost: ${this.shippingCost}`) 
      console.log(`discount: ${this.discount}`) 
      const total = this.subtotal + this.shippingCost - this.discount
      console.log(`total: ${total}`) 
      return total
    },
  },

  actions: {
    add(item: Omit<CartItem, 'qty'>, qty = 1) {
      if (qty <= 0) return
      const existing = this.items.find(i => i.id === item.id)
      console.log(existing)
      if (existing) {
        console.log('existing')
        existing.qty += qty
      } else {
        this.items.push({ ...item, qty })
        console.log(this.items)
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
      console.log(this.items)
    },

    clear() {
      this.items = []
      this.$reset()
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
