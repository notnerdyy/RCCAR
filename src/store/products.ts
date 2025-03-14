import { defineStore } from 'pinia'
import productImage1 from '../assets/productImg/47151ccfdcdfa40b90bf0cd2dff6d9d6_tn.jpg'
import productImage2 from '../assets/productImg/tw-11134201-23020-3eqq9adlnknv7e_tn.jpg'
import productImage3 from '../assets/productImg/tw-11134201-23020-mejsjq1gnknva4_tn.jpg'
import productImage4 from '../assets/productImg/tw-11134201-23020-muvcctqdnknvcb_tn.jpg'
import productImage5 from '../assets/productImg/tw-11134210-7qula-lhr0q4nysadsee@resize_bs700x700.jpg'
import productImage6 from '../assets/productImg/tw-11134210-7qula-lhr0q4nycu4w30@resize_bs700x700.jpg'
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

interface ProductState {
  items: Record<string, Product>
  ids: number[]
}

// 本地模擬數據
const localProducts: Product[] = [
  {
    id: 1,
    title: 'RC賽車 - 高速越野車',
    price: 1299,
    description: '最高時速可達 40km/h，全地形適用，防水設計',
    category: 'offroad',
    image: productImage1
  },
  {
    id: 2,
    title: 'RC賽車 - 漂移賽車',
    price: 1599,
    description: '專業漂移設計，高精度轉向系統，LED燈光效果',
    category: 'drift',
    image: productImage2
  },
  {
    id: 3,
    title: 'RC賽車 - 卡車模型',
    price: 1899,
    description: '1:10 比例模型，強大馬達，可攀爬 45 度斜坡',
    category: 'truck',
    image: productImage3
  },
  {
    id: 4,
    title: 'RC賽車 - 競速賽車',
    price: 2099,
    description: '空氣動力學設計，高速穩定性佳，專業競賽用',
    category: 'racing',
    image: productImage4
  },
  {
    id: 5,
    title: 'RC賽車 - 初學者套裝',
    price: 999,
    description: '易於操控，耐撞擊設計，附教學手冊',
    category: 'beginner',
    image: productImage5
  },
  {
    id: 6,
    title: 'RC賽車 - 水陸兩用車',
    price: 1799,
    description: '可在水面行駛，全防水設計，附專用遙控器',
    category: 'amphibious',
    image: productImage6
  }
]

export const useProductStore = defineStore({
  id: 'products',

  state: (): ProductState => ({
    items: {},
    ids: [],
  }),

  getters: {
    list(): Product[] {
      return this.ids.map(i => this.items[i])
    },

    loaded(): boolean {
      return this.ids.length > 0
    },
  },

  actions: {
    async fetchAll() {
      if (this.loaded)
        return

      // 使用本地數據而不是 API 請求
      this.ids = localProducts.map((product) => {
        this.items[product.id] = product
        return product.id
      })
    },
  },
})