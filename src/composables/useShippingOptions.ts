import { ref } from "vue"
import type { ShippingOption } from "@/types"

export function useShippingOptions() {
  const options = ref<ShippingOption[]>([
    { id: 'courier', name: 'Courier', price: 15 },
    { id: 'locker', name: 'Parcel locker', price: 12 },
    { id: 'pickup', name: 'Personal pickup', price: 0 }
  ])

  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  return {options, isLoading, error}
}