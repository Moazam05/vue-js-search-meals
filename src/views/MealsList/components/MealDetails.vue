<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import axiosClient from "../../../api/axiosClient";

const route = useRoute();
const meal = ref(null);

// Fetch meal details on mount
onMounted(async () => {
  try {
    const response = await axiosClient.get(`lookup.php?i=${route.params.id}`);
    meal.value = response.data.meals[0] || {};
  } catch (error) {
    console.error("Error fetching meal details:", error);
  }
});

const addToCart = (meal) => {
  console.log(`Added to cart: ${meal.strMeal}`);
};
</script>

<template>
  <div class="flex flex-col items-center p-6 min-h-screen bg-gray-50 mt-4">
    <p v-if="!meal" class="text-gray-500 text-lg">Loading meal details...</p>

    <div
      v-else
      class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-64 object-cover"
      />

      <!-- Meal Information -->
      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          {{ meal.strMeal }}
        </h1>

        <div class="flex justify-between items-center">
          <p class="text-gray-600">
            <strong>Category:</strong> {{ meal.strCategory }}
          </p>
          <p class="text-gray-600"><strong>Area:</strong> {{ meal.strArea }}</p>
          <p class="text-gray-600">
            <strong>Tags:</strong> {{ meal.strTags.split(",")[0] }}
          </p>
        </div>

        <div class="mt-3">
          <p class="text-gray-600">
            <strong>Instructions:</strong> {{ meal.strInstructions }}
          </p>
        </div>

        <div class="mt-4 flex space-x-4">
          <button
            @click="addToCart(meal)"
            class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
