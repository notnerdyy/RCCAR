import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import { useProductStore } from './products'
import { CART_STORAGE } from '@/composables/usePersistCart'

export interface Purchase {
  productId: number
  quantity: number
}

interface CartState {
  contents: Record<string, Purchase>
}

export interface CartPreview {
  id: number
  image: string
  title: string
  quantity: number
  cost: number
}

export const useCartStore = defineStore({
  id: 'cart',

  state: (): CartState => ({
    contents: JSON.parse(localStorage.getItem(CART_STORAGE) as string) ?? {},
  }),

  getters: {
    count(): number {
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + this.contents[id].quantity
      }, 0)
    },

    total(): number {
      const products = useProductStore()
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + products.items[id].price * this.contents[id].quantity
      }, 0)
    },

    formattedCart(): CartPreview[] {
      const products = useProductStore()

      if (!products.loaded)
        return []

      return Object.keys(this.contents).map((productId) => {
        const purchase = this.contents[productId]

        return {
          id: purchase.productId,
          image: products.items[purchase.productId].image,
          title: products.items[purchase.productId].title,
          quantity: purchase.quantity,
          cost: purchase.quantity * products.items[purchase.productId].price,
        }
      })
    },
  },

  actions: {
    add(productId: number) {
      if (this.contents[productId]) {
        this.contents[productId].quantity += 1
      }
      else {
        this.contents[productId] = {
          productId,
          quantity: 1,
        }
      }
    },
    async remove(productId: number) {
      if (!this.contents[productId])
        return

      const products = useProductStore()
      const product = products.items[productId]

      // 如果數量大於1，直接減1
      if (this.contents[productId].quantity > 1) {
        this.contents[productId].quantity -= 1
        return
      }

      // 如果數量為1，顯示確認對話框
      const result = await Swal.fire({
        title: '確認刪除',
        text: `確定要從購物車中移除 ${product.title} 嗎?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '確認刪除',
        cancelButtonText: '取消',
      })
      if (result.isConfirmed)
        delete this.contents[productId]
    },
    async delete(productId: number) {
      if (!this.contents[productId])
        return

      const products = useProductStore()
      const product = products.items[productId]
      const result = await Swal.fire({
        title: '確認刪除',
        text: `確定要從購物車中移除 ${product.title} 嗎?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '確認刪除',
        cancelButtonText: '取消',
      })
      if (result.isConfirmed)
        delete this.contents[productId]
    },
  },
})
