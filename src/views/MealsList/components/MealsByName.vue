<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import axiosClient from "../../../api/axiosClient.js";
import { formatNumberWithSeparator } from "../../../utils/index.js";

const route = useRoute();

const keyword = ref("");
const meals = ref([]);

onMounted(() => {
  if (route.params.name) {
    keyword.value = route.params.name;
    searchMeals();
  }
});

const searchMeals = async () => {
  try {
    const response = await axiosClient.get(`search.php?s=${keyword.value}`);
    meals.value = response.data.meals || [];
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};

const addToCart = (meal) => {
  console.log(`Added to cart: ${meal.strMeal}`);
};
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-lg p-8">
      <input
        type="text"
        class="rounded border-2 border-gray-300 w-full py-2 px-4 text-gray-700"
        placeholder="Enter meal name & press Enter"
        v-model="keyword"
        @change="searchMeals"
      />
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl p-4"
    >
      <router-link
        v-for="meal in meals"
        :key="meal.idMeal"
        class="bg-white rounded-lg shadow-md overflow-hidden"
        :to="`/meal/${meal.idMeal}`"
      >
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="w-full h-52 object-cover"
        />

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

        <div class="p-4">
          <button
            @click="addToCart(meal)"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </router-link>
    </div>

    <p v-if="meals.length === 0 && keyword" class="text-gray-500 mt-4">
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
