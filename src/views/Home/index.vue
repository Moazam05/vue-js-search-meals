<script setup>
// Library Imports
import { onMounted, ref } from "vue";
import axiosClient from "../../api/axiosClient";

// Reactive State
const meals = ref([]);

// Fetch 10 Random Meals
onMounted(async () => {
  try {
    for (let i = 0; i < 10; i++) {
      const response = await axiosClient.get("/random.php");
      meals.value.push(response.data.meals[0]);
    }
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Wrapper -->
    <div class="container mx-auto p-8">
      <!-- Page Title -->
      <h1 class="text-4xl font-bold text-gray-800 text-center mb-10">
        Random Meals
      </h1>

      <!-- Meals Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Meal Card -->
        <div
          v-for="meal in meals"
          :key="meal.idMeal"
          class="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-lg"
        >
          <!-- Meal Image -->
          <img
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
            class="w-full h-40 object-cover"
          />

          <!-- Meal Content -->
          <div class="p-4 flex flex-col items-center">
            <!-- Meal Name -->
            <h2 class="text-lg font-semibold text-gray-700 text-center mb-3">
              {{ meal.strMeal }}
            </h2>

            <!-- View Details Button -->
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              @click="$router.push(`/meal/${meal.idMeal}`)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
