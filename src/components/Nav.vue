<script setup lang="ts">
import { computed } from 'vue'
import Search from './Search.vue'
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()

const count = computed(() => cartStore.count)
</script>

<template>
  <div class="navbar mb-2 shadow-lg bg-slate-700 text-neutral-content">
    <div class="flex-none lg:hidden">
      <label for="drawer-input" class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
    </div>
    <div class="flex-none px-2 mx-2">
      <span class="text-lg font-bold">
        **擊速HitSpeed**</span>
    </div>
    <div class="flex-1 px-2 mx-2">
      <div class="items-stretch hidden lg:flex">
        <router-link class="btn btn-ghost btn-sm rounded-btn" to="/">
          商品列表
        </router-link>
        <router-link class="btn btn-ghost btn-sm rounded-btn" to="/cart">
          購物車
          <div class="badge ml-2 badge-outline" v-text="count" />
        </router-link>
      </div>
    </div>
    <div class="flex-1 lg:flex-none">
      <Search />
    </div>
  </div>
</template>
