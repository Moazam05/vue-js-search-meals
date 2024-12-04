<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// <!-- todo: Custom Import -->
import axiosClient from "../../../api/axiosClient";
import Loader from "../../../components/Loader/index.vue";

const route = useRoute();
const router = useRouter();

// <!-- todo: State -->
const meals = ref([]);
const isLoading = ref(false);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Fetch meals by the selected letter
const fetchMealsByLetter = async (letter) => {
  try {
    isLoading.value = true;
    const response = await axiosClient.get(`search.php?f=${letter}`);
    meals.value = response.data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by letter:", error);
  } finally {
    isLoading.value = false;
  }
};

// Watch route parameter for changes
watch(
  () => route.params.letter,
  (newLetter) => {
    if (newLetter) fetchMealsByLetter(newLetter);
  },
  { immediate: true }
);

// Navigate to a new letter
const navigateToLetter = (letter) => {
  router.push(`/letter/${letter}`);
};
</script>

<template>
  <div class="flex flex-col items-center p-8 min-h-screen bg-gray-50">
    <!-- Letter Selection -->
    <div class="flex flex-wrap justify-center mb-6">
      <button
        v-for="letter in letters"
        :key="letter"
        @click="navigateToLetter(letter)"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center mx-1 mb-2 transition"
      >
        {{ letter }}
      </button>
    </div>

    <div v-if="isLoading" class="mt-8">
      <Loader :visible="isLoading" />
    </div>

    <!-- Meal Cards -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
    >
      <div
        v-for="meal in meals"
        :key="meal.idMeal"
        class="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ meal.strMeal }}
          </h3>
          <p class="text-sm text-gray-600 truncate mt-2">
            {{ meal.strInstructions }}
          </p>
          <button
            class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
            @click="$router.push(`/meal/${meal.idMeal}`)"
          >
            View Details
          </button>
        </div>
      </div>
    </div>

    <!-- No Meals Found -->
    <div v-if="!isLoading && !meals.length" class="mt-8">
      <p class="text-gray-600">
        No meals found for this letter

        <strong>
          {{ route.params.letter }}
        </strong>
      </p>
    </div>
  </div>
</template>
