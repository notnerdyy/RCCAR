<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../store/products";
import { useCartStore } from "../store/cart";
import { addToCartSuccess, askGoToCart } from "../components/sweetAlert";
import productImage1 from "../assets/productImg/47151ccfdcdfa40b90bf0cd2dff6d9d6_tn.jpg";
import productImage2 from "../assets/productImg/tw-11134201-23020-3eqq9adlnknv7e_tn.jpg";
import productImage3 from "../assets/productImg/tw-11134201-23020-mejsjq1gnknva4_tn.jpg";
import productImage4 from "../assets/productImg/tw-11134201-23020-muvcctqdnknvcb_tn.jpg";
import productImage5 from "../assets/productImg/tw-11134210-7qula-lhr0q4nysadsee@resize_bs700x700.jpg";
import productImage6 from "../assets/productImg/tw-11134210-7qula-lhr0q4nycu4w30@resize_bs700x700.jpg";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const loading = ref(true);
const quantity = ref(1);
const activeTab = ref("description");
const currentImage = ref("");

const tabs = [
  { id: "description", name: "商品描述" },
  { id: "specifications", name: "規格" },
];

// 獲取商品數據
onMounted(async () => {
  await productStore.fetchAll();
  loading.value = false;

  // 設置默認圖片
  if (product.value) {
    currentImage.value = product.value.image;
  }
});

// 根據路由參數獲取商品
const product = computed(() => {
  const id = parseInt(route.params.productId as string);
  return productStore.items[id];
});

// 商品圖片集合（模擬多張圖片）
const productImages = computed(() => {
  if (!product.value) return [];

  // 這裡我們模擬多張商品圖片
  // 實際應用中，這些圖片應該來自商品數據
  const allImages = [
    productImage1,
    productImage2,
    productImage3,
    productImage4,
    productImage5,
    productImage6,
  ];

  // 返回當前商品的圖片和一些其他圖片作為替代
  return [
    product.value.image,
    ...allImages.filter((img) => img !== product.value.image).slice(0, 4),
  ];
});

// 相關商品
const relatedProducts = computed(() => {
  if (!product.value) return [];
  return productStore.list
    .filter((p) => p.id !== parseInt(route.params.productId as string))
    .slice(0, 4);
});

// 加入購物車
const addToCart = () => {
  if (!product.value) return;
  cartStore.add(product.value.id, quantity.value);

  askGoToCart(product.value.title, quantity.value).then((result) => {
    if (result.isConfirmed) {
      router.push("/cart");
    }
  });
};

// 加入相關商品到購物車
const addRelatedToCart = (product: any) => {
  cartStore.add(product.id, 1);
  addToCartSuccess(product.title);
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      ></div>
    </div>

    <div v-else-if="!product" class="text-center py-12">
      <p class="text-gray-600">找不到商品</p>
      <router-link
        to="/"
        class="text-blue-600 hover:underline mt-4 inline-block"
      >
        返回商品列表
      </router-link>
    </div>

    <div v-else>
      <div class="text-sm breadcrumbs mb-6">
        <ul>
          <li><router-link to="/">首頁</router-link></li>
          <li>{{ product.title }}</li>
        </ul>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 左側：商品Img -->
        <div>
          <div class="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <img
              :src="currentImage"
              :alt="product.title"
              class="w-full h-auto object-contain"
              style="height: 400px"
            />
          </div>

          <!-- 縮略圖列表 -->
          <div class="grid grid-cols-5 gap-2">
            <div
              v-for="(image, index) in productImages"
              :key="index"
              @click="currentImage = image"
              class="cursor-pointer border-2 rounded-md overflow-hidden"
              :class="{
                'border-blue-500': currentImage === image,
                'border-gray-200': currentImage !== image,
              }"
            >
              <img
                :src="image"
                :alt="`${product.title} - 圖片 ${index + 1}`"
                class="w-full h-auto object-cover"
                style="height: 80px"
              />
            </div>
          </div>
        </div>

        <!-- 右側：價格 -->
        <div>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">
            {{ product.title }}
          </h1>

          <div class="mb-4">
            <span class="text-3xl font-bold text-blue-600"
              >${{ product.price }}</span
            >
            <span class="text-gray-500 line-through ml-2"
              >${{ Math.round(product.price * 1.2) }}</span
            >
            <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded ml-2"
              >限時優惠</span
            >
          </div>

          <p class="text-gray-700 mb-6">{{ product.description }}</p>

          <div class="mb-6">
            <h3 class="font-semibold text-gray-800 mb-2">數量</h3>
            <div class="flex items-center">
              <button
                @click="quantity > 1 ? quantity-- : null"
                class="px-3 py-1 border rounded-l-md bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                v-model="quantity"
                min="1"
                class="w-16 px-3 py-1 border-t border-b text-center"
              />
              <button
                @click="quantity++"
                class="px-3 py-1 border rounded-r-md bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div class="flex space-x-4 mb-8">
            <button
              @click="addToCart"
              class="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 flex-grow"
            >
              加入購物車
            </button>
          </div>

          <div class="border-t pt-4">
            <div class="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>免運費（訂單滿 $2000）</span>
            </div>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>1 年保固</span>
            </div>
          </div>
        </div>
      </div>

      <!-- detail-tab -->
      <div class="mt-12">
        <div class="border-b">
          <div class="flex">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = tab.id"
              class="px-6 py-3 font-medium"
              :class="{
                'border-b-2 border-blue-500 text-blue-500':
                  activeTab === tab.id,
                'text-gray-500': activeTab !== tab.id,
              }"
            >
              {{ tab.name }}
            </button>
          </div>
        </div>

        <!-- Description -->
        <div v-if="activeTab === 'description'" class="py-6">
          <h3 class="text-xl font-semibold mb-4">商品描述</h3>
          <div v-if="product.details?.fullDescription">
            <p
              v-for="(paragraph, index) in product.details.fullDescription"
              :key="index"
              class="text-gray-700 mb-4"
            >
              {{ paragraph }}
            </p>
          </div>
          <p v-else class="text-gray-700 mb-4">
            {{ product.description }}
          </p>
        </div>

        <!-- Specifications -->
        <div v-if="activeTab === 'specifications'" class="py-6">
          <h3 class="text-xl font-semibold mb-4">商品規格</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded">
              <h4 class="font-semibold mb-2">基本訊息</h4>
              <ul class="space-y-2">
                <li
                  v-for="(value, key) in product.details.basicInfo"
                  :key="key"
                >
                  <span class="text-gray-600">{{ key }}：</span> {{ value }}
                </li>
              </ul>
            </div>

            <div class="bg-gray-50 p-4 rounded">
              <h4 class="font-semibold mb-2">特點</h4>
              <ul class="space-y-2">
                <li
                  v-for="(feature, index) in product.details.features"
                  :key="index"
                >
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="bg-gray-50 p-4 rounded">
              <h4 class="font-semibold mb-2">包裝內容</h4>
              <ul class="space-y-2">
                <li
                  v-for="(item, index) in product.details.included"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="bg-gray-50 p-4 rounded">
              <h4 class="font-semibold mb-2">需要另購</h4>
              <ul class="space-y-2">
                <li
                  v-for="(item, index) in product.details.required"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 相關商品 -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold mb-6">相關商品</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="h-48 bg-gray-200">
              <router-link :to="`/product/${relatedProduct.id}`">
                <img
                  :src="relatedProduct.image"
                  :alt="relatedProduct.title"
                  class="w-full h-full object-cover"
                />
              </router-link>
            </div>
            <div class="p-4">
              <router-link :to="`/product/${relatedProduct.id}`">
                <h3
                  class="text-lg font-semibold text-gray-800 hover:text-blue-600"
                >
                  {{ relatedProduct.title }}
                </h3>
              </router-link>
              <p class="text-gray-600 mt-1 text-sm">
                {{ relatedProduct.description.substring(0, 60) }}...
              </p>
              <div class="mt-3 flex justify-between items-center">
                <span class="text-xl font-bold text-blue-600"
                  >${{ relatedProduct.price }}</span
                >
                <button
                  @click="addRelatedToCart(relatedProduct)"
                  class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-200 hover:text-black"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
