import { defineStore } from 'pinia'
import productImage1 from '../assets/productImg/47151ccfdcdfa40b90bf0cd2dff6d9d6_tn.jpg'
import productImage2 from '../assets/productImg/tw-11134201-23020-3eqq9adlnknv7e_tn.jpg'
import productImage3 from '../assets/productImg/tw-11134201-23020-mejsjq1gnknva4_tn.jpg'
import productImage4 from '../assets/productImg/tw-11134201-23020-muvcctqdnknvcb_tn.jpg'
import productImage5 from '../assets/productImg/tw-11134210-7qula-lhr0q4nysadsee@resize_bs700x700.jpg'
import productImage6 from '../assets/productImg/tw-11134210-7qula-lhr0q4nycu4w30@resize_bs700x700.jpg'

export interface ProductFeature {
  title: string
  items: string[]
}

export interface ProductDetail {
  fullDescription: string[]
  basicInfo: { [key: string]: string }
  features: string[]
  included: string[]
  required: string[]
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  details?: ProductDetail
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
    image: productImage1,
    details: {
      fullDescription: [
        '這是 Yokomo 1/10 Super Drift RX-D 3.0 Blue Limited Edition RWD 漂移賽車套件。在漂移領域的尖端技術，漂移特性和轉向特性是完成漂移的最重要因素。',
        '賽車的專業知識已被應用於改善賽道上的牽引力，但 RX-D 3.0 的特點是強調前後平衡，同時確保足夠的後抓地力。考慮到重量平衡、剛性平衡和滾動軸承位置的重心位置，這款賽車進化成一款具有良好抓地力且前端和後端都有改進的前抓地力和轉向，允許可靠的轉向控制。'
      ],
      basicInfo: {
        '品牌': 'Yokomo',
        '型號': 'DP-RX3BL',
        'SKU': 'YD-RX3BL',
        '比例': '1:10',
        '類型': '越野車',
        '驅動方式': '四輪驅動 (4WD)',
        '最高速度': '40km/h',
        '電池類型': 'Li-Po 7.4V',
        '遙控距離': '100m'
      },
      features: [
        '石墨雙甲板底盤',
        '鋁合金馬達支架',
        '鋁合金前保險槓支撐',
        '鋁合金伺服支架',
        '鋁合金轉向支架',
        '3/32 英寸硬化鋁合金後軸承座',
        '前後鋁合金減震塔',
        '鋁合金懸掛臂支架',
        '鋁合金轉向連桿',
        '鋁合金懸掛臂端',
        '全地形輪胎',
        '防水電子設備',
        '高扭矩伺服馬達',
        '可調式懸掛系統'
      ],
      included: [
        'Yokomo 1/10 高速越野車套件 (1 套)',
        '2.4GHz 遙控器',
        '7.4V 1800mAh Li-Po 電池',
        'USB 充電器',
        '備用輪胎 (1 套)',
        '使用手冊'
      ],
      required: [
        '4 節 AA 電池 (遙控器用)'
      ]
    }
  },
  {
    id: 2,
    title: 'RC賽車 - 漂移賽車',
    price: 1599,
    description: '專業漂移設計，高精度轉向系統，LED燈光效果',
    category: 'drift',
    image: productImage2,
    details: {
      fullDescription: [
        '這款專業級漂移賽車採用了最新的底盤設計和精密的轉向系統，為漂移愛好者提供極致的操控體驗。',
        '車身採用輕量化設計，配合高效能馬達和特殊的漂移輪胎，能夠輕鬆實現各種漂移動作。內置 LED 燈光系統，在夜間漂移時提供絕佳的視覺效果。'
      ],
      basicInfo: {
        '品牌': 'MST',
        '型號': 'MS-01D',
        'SKU': 'MST-01D-PRO',
        '比例': '1:10',
        '類型': '漂移車',
        '驅動方式': '後輪驅動 (RWD)',
        '最高速度': '35km/h',
        '電池類型': 'Li-Po 7.4V',
        '遙控距離': '80m'
      },
      features: [
        '碳纖維底盤',
        '鋁合金漂移專用懸掛',
        '可調式前後重量分配',
        '高精度轉向系統',
        '專業漂移輪胎',
        'LED 車身燈光系統',
        '高轉速無刷馬達',
        '可更換車身殼',
        '低重心設計',
        '精密軸承系統'
      ],
      included: [
        'MST 1/10 漂移賽車套件 (1 套)',
        '透明車身殼 (需自行上漆)',
        '漂移專用輪胎 (1 套)',
        'LED 燈光系統',
        '使用手冊'
      ],
      required: [
        '遙控系統',
        '電池',
        '充電器',
        '馬達',
        '車身漆料'
      ]
    }
  },
  {
    id: 3,
    title: 'RC賽車 - 卡車模型',
    price: 1899,
    description: '1:10 比例模型，強大馬達，可攀爬 45 度斜坡',
    category: 'truck',
    image: productImage3,
    details: {
      fullDescription: [
        '這款 1:10 比例的遙控卡車模型採用高扭力馬達和加強型底盤，專為越野和攀爬設計。',
        '配備大尺寸全地形輪胎和長行程懸掛系統，能夠輕鬆應對各種複雜地形，包括最大 45 度的陡峭斜坡。防水設計讓您可以在雨天或穿越淺水區域時無憂使用。'
      ],
      basicInfo: {
        '品牌': 'Axial',
        '型號': 'SCX10 III',
        'SKU': 'AXI-SCX10-3',
        '比例': '1:10',
        '類型': '攀爬卡車',
        '驅動方式': '四輪驅動 (4WD)',
        '最高速度': '25km/h',
        '電池類型': 'Li-Po 11.1V',
        '遙控距離': '150m'
      },
      features: [
        '鋼製梯形車架',
        '防水電子設備',
        '高扭力無刷馬達',
        '長行程懸掛系統',
        '全金屬傳動軸',
        '鎖定差速器',
        '大尺寸全地形輪胎',
        '可調式車身高度',
        '高強度保險槓',
        '模擬絞盤'
      ],
      included: [
        'Axial SCX10 III 卡車套件 (1 套)',
        '仿真車身殼',
        '全地形輪胎 (1 套)',
        '使用手冊'
      ],
      required: [
        '遙控系統',
        '電池',
        '充電器',
        '馬達'
      ]
    }
  },
  {
    id: 4,
    title: 'RC賽車 - 競速賽車',
    price: 2099,
    description: '空氣動力學設計，高速穩定性佳，專業競賽用',
    category: 'racing',
    image: productImage4,
    details: {
      fullDescription: [
        '這款專業競速賽車採用先進的空氣動力學設計，配合高效能無刷馬達和精密的懸掛系統，為競速愛好者提供極致的速度體驗。',
        '車身採用輕量化材料製造，降低重量同時提高強度。精心調校的底盤設計確保在高速行駛時保持極佳的穩定性，是參加專業競賽的理想選擇。'
      ],
      basicInfo: {
        '品牌': 'Tamiya',
        '型號': 'TRF420',
        'SKU': 'TAM-TRF420',
        '比例': '1:10',
        '類型': '競速賽車',
        '驅動方式': '四輪驅動 (4WD)',
        '最高速度': '70km/h',
        '電池類型': 'Li-Po 7.4V',
        '遙控距離': '120m'
      },
      features: [
        '碳纖維底盤',
        '空氣動力學車身設計',
        '高效能無刷馬達',
        '精密懸掛系統',
        '輕量化鋁合金部件',
        '高速專用輪胎',
        '可調式前後重量分配',
        '精密軸承系統',
        '競賽級電子調速器',
        '高精度轉向系統'
      ],
      included: [
        'Tamiya TRF420 競速賽車套件 (1 套)',
        '透明車身殼 (需自行上漆)',
        '競速專用輪胎 (1 套)',
        '使用手冊'
      ],
      required: [
        '遙控系統',
        '電池',
        '充電器',
        '馬達',
        '車身漆料'
      ]
    }
  },
  {
    id: 5,
    title: 'RC賽車 - 初學者套裝',
    price: 999,
    description: '易於操控，耐撞擊設計，附教學手冊',
    category: 'beginner',
    image: productImage5,
    details: {
      fullDescription: [
        '這款專為初學者設計的遙控賽車套裝，提供了簡單易用的操控體驗和全面的入門指南。',
        '車身採用耐撞擊材料製造，即使發生碰撞也不易損壞。簡化的控制系統讓初學者能夠快速上手，附帶的教學手冊詳細介紹了基本操作技巧和維護方法。'
      ],
      basicInfo: {
        '品牌': 'Traxxas',
        '型號': 'Bandit',
        'SKU': 'TRA-24054-1',
        '比例': '1:10',
        '類型': '越野車',
        '驅動方式': '後輪驅動 (RWD)',
        '最高速度': '30km/h',
        '電池類型': 'NiMH 8.4V',
        '遙控距離': '100m'
      },
      features: [
        '耐撞擊尼龍底盤',
        '簡化控制系統',
        '防水電子設備',
        '預裝好的車身',
        '全地形輪胎',
        '簡易維護設計',
        '穩定的懸掛系統',
        '安全低速模式',
        '堅固的傳動系統',
        '長效電池'
      ],
      included: [
        'Traxxas Bandit 遙控車 (1 台)',
        '2.4GHz 遙控器',
        '8.4V NiMH 電池',
        '充電器',
        '教學手冊',
        '基本工具套裝'
      ],
      required: [
        '4 節 AA 電池 (遙控器用)'
      ]
    }
  },
  {
    id: 6,
    title: 'RC賽車 - 水陸兩用車',
    price: 1799,
    description: '可在水面行駛，全防水設計，附專用遙控器',
    category: 'amphibious',
    image: productImage6,
    details: {
      fullDescription: [
        '這款創新的水陸兩用遙控車採用全密封防水設計，能夠在陸地和水面上自由行駛。',
        '特殊的輪胎設計提供了水中推進力和陸地抓地力，讓您可以無縫切換不同環境。全防水電子設備確保在任何條件下都能可靠運行，附帶的專用遙控器具有更長的控制距離和更穩定的信號。'
      ],
      basicInfo: {
        '品牌': 'WLtoys',
        '型號': 'Q353',
        'SKU': 'WL-Q353',
        '比例': '1:10',
        '類型': '水陸兩用車',
        '驅動方式': '四輪驅動 (4WD)',
        '最高速度': '陸地 35km/h，水上 15km/h',
        '電池類型': 'Li-Po 11.1V',
        '遙控距離': '150m'
      },
      features: [
        '全密封防水設計',
        '特殊水陸兩用輪胎',
        '高效防水馬達',
        '加強型底盤',
        '長效防水電池',
        '專用長距離遙控器',
        '自動排水系統',
        '防翻轉設計',
        '高亮度 LED 燈',
        '可更換輪胎'
      ],
      included: [
        'WLtoys Q353 水陸兩用車 (1 台)',
        '專用 2.4GHz 遙控器',
        '11.1V 2200mAh Li-Po 電池',
        '防水充電器',
        '備用輪胎 (1 套)',
        '使用手冊'
      ],
      required: [
        '4 節 AA 電池 (遙控器用)'
      ]
    }
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
      this.ids = localProducts.map((product) => {
        this.items[product.id] = product
        return product.id
      })
    },
  },
})