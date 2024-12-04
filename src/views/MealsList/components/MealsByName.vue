<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

// <!-- todo: Custom Imports -->
import axiosClient from "../../../api/axiosClient.js";
import { formatNumberWithSeparator } from "../../../utils/index.js";
import Loader from "../../../components/Loader/index.vue";

const route = useRoute();

// <!-- todo: State -->
const keyword = ref("");
const isLoading = ref(false);
const meals = ref([]);

onMounted(() => {
  if (route.params.name) {
    keyword.value = route.params.name;
    searchMeals();
  }
});

const searchMeals = async () => {
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

    <div v-if="isLoading" class="mt-8">
      <Loader :visible="isLoading" />
    </div>

    <div
      v-if="!isLoading"
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
            class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Meal Details
          </button>
        </div>
      </router-link>
    </div>

    <p
      v-if="meals.length === 0 && keyword && !isLoading"
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
