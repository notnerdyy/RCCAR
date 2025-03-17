<script setup lang="ts">
import { useRouter } from 'vue-router'
import { addToCartSuccess, askGoToCart } from '@/components/sweetAlert'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/store/products'
import { toCurrency } from '@/shared/utils'

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const cartStore = useCartStore()

async function handleAddToCart() {
  // 添加商品到購物車
  cartStore.add(props.product.id)
  const result = await askGoToCart(props.product.title)

  if (result.isConfirmed)
    router.push('/cart')
  else
    addToCartSuccess(props.product.title)
}
</script>

<template>
  <div class="card bordered">
    <figure class="px-4 pt-6">
      <img
        :src="product.image"
        alt="Card Image"
        class="object-contain w-full h-64"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        <router-link class="link link-hover" :to="`/product/${product.id}`">
          {{ product.title }}
        </router-link>
      </h2>
      <p>{{ toCurrency(product.price) }}</p>
      <div class="justify-end card-actions">
        <button class="btn btn-grey" @click="handleAddToCart">
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>
