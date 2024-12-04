<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

const router = useRouter();
const store = useStore();

const navigate = (path) => {
  router.push(path);
};

const cartItemCount = computed(() => store.getters.cartItemCount || 0);
</script>

<template>
  <nav class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto flex items-center justify-between p-4">
      <!-- Logo or Title -->
      <div class="text-lg font-bold cursor-pointer" @click="navigate('/')">
        Meal Finder
      </div>

      <!-- Navigation Links -->
      <div class="flex space-x-4">
        <button
          @click="navigate('/name')"
          class="hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          Search Meals
        </button>
        <button
          @click="navigate('/letter')"
          class="hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          Meals By Letter
        </button>

        <div
          class="relative flex items-center cursor-pointer hover:text-blue-300 transition"
        >
          <!-- Cart Icon -->
          <i class="pi pi-shopping-cart text-2xl"></i>

          <!-- Badge for item count -->
          <span
            v-if="cartItemCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
          >
            {{ cartItemCount }}
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
