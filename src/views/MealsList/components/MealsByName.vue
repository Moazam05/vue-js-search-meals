<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

// <!-- Custom Imports -->
import axiosClient from "../../../api/axiosClient.js";
import { formatNumberWithSeparator } from "../../../utils/index.js";
import Loader from "../../../components/Loader/index.vue";

const route = useRoute();
const store = useStore();

// State
const keyword = ref("");
const isLoading = ref(false);
const meals = ref([]);
const hasSearched = ref(false);

onMounted(() => {
  if (route.params.name) {
    keyword.value = route.params.name;
    searchMeals();
  }
});

// Fetch meals
const searchMeals = async () => {
  if (!keyword.value.trim()) {
    meals.value = [];
    hasSearched.value = false;
    return;
  }

  hasSearched.value = true;
  try {
    isLoading.value = true;
    const response = await axiosClient.get(`search.php?s=${keyword.value}`);
    meals.value = response.data.meals || [];
  } catch (error) {
    console.error("Error fetching meals:", error);
  } finally {
    isLoading.value = false;
  }
};

// Vuex: Get cart items
const cartItems = computed(() => store.getters.cartItems);

// Check if a meal is in the cart
const isInCart = (meal) =>
  cartItems.value.some((cartItem) => cartItem.idMeal === meal.idMeal);
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-50">
    <!-- Search Input -->
    <div class="w-full max-w-lg p-8">
      <input
        type="text"
        class="rounded border-2 border-gray-300 w-full py-2 px-4 text-gray-700"
        placeholder="Enter meal name & press Enter"
        v-model="keyword"
        @change="searchMeals"
      />
    </div>

    <!-- Loader -->
    <div v-if="isLoading" class="mt-8">
      <Loader :visible="isLoading" />
    </div>

    <!-- Meals Grid -->
    <div
      v-if="!isLoading && meals.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl p-4"
    >
      <div
        v-for="meal in meals"
        :key="meal.idMeal"
        class="relative bg-white rounded-lg shadow-md overflow-hidden"
      >
        <!-- Meal Image -->
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="w-full h-52 object-cover"
        />

        <!-- Show Icon if Meal is in Cart -->
        <div v-if="isInCart(meal)" class="absolute top-2 right-2">
          <div
            class="bg-red-500 rounded-full flex items-center justify-center w-10 h-10 shadow-lg"
          >
            <i class="pi pi-cart-arrow-down text-white text-xl"></i>
          </div>
        </div>

        <!-- Meal Info -->
        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-800 truncate">
            {{ meal.strMeal }}
          </h3>
          <p class="text-sm text-gray-600 truncate">
            Category: {{ meal.strCategory }}
          </p>
          <p class="text-sm text-gray-600 mt-3">
            Description: {{ meal.strInstructions.slice(0, 80)
            }}{{ meal.strInstructions.length > 80 ? "..." : "" }}
          </p>
          <p class="text-sm text-gray-600 mt-3 font-bold">
            Price: {{ formatNumberWithSeparator(meal.idMeal) }}
          </p>
        </div>

        <!-- Meal Details Button -->
        <div class="p-4">
          <router-link :to="`/meal/${meal.idMeal}`">
            <button
              class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Meal Details
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- No Meals Found -->
    <p
      v-if="meals.length === 0 && hasSearched && !isLoading"
      class="text-gray-500 mt-4"
    >
      No meals found for "{{ keyword }}"
    </p>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 1.5rem;
}
</style>
