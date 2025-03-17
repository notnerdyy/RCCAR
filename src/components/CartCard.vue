<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import type { CartPreview } from '@/store/cart'
import { toCurrency } from '@/shared/utils'

defineProps<{
  cartProduct: CartPreview
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="card md:card-side bordered">
    <figure class="p-8">
      <img
        :src="cartProduct.image"
        alt="Card Image"
        class="object-contain w-full h-48"
      >
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        <router-link class="link link-hover" :to="`/product/${cartProduct.id}`">
          {{ cartProduct.title }}
        </router-link>
      </h2>
      <p>{{ toCurrency(cartProduct.cost) }}</p>
      <div class="card-actions justify-between">
        <div class="btn-group">
          <button class="btn btn-light" @click="cartStore.remove(cartProduct.id)">
            -
          </button>
          <button class="btn btn-ghost no-animation">
            {{ cartProduct.quantity }}
          </button>
          <button class="btn btn-light" @click="cartStore.add(cartProduct.id)">
            +
          </button>
        </div>
        <!-- 刪除按鈕 -->
        <button
          class="btn btn-sm btn-error btn-outline"
          @click="cartStore.remove(cartProduct.id)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
