<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "../../../api/axiosClient";

// State to hold categories
const categories = ref([]);
const router = useRouter();

// Fetch categories data from API
const fetchCategories = async () => {
  try {
    const response = await axiosClient.get("categories.php");
    categories.value = response.data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Fetch categories on component mount
onMounted(fetchCategories);

// Navigate to meals by category
const navigateToCategory = (category) => {
  router.push(`/name/${category}`);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center p-8">
    <!-- Page Title -->
    <h1 class="text-3xl font-bold text-gray-800 mb-8">
      Explore Meal Categories
    </h1>

    <!-- Categories Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl"
    >
      <div
        v-for="category in categories"
        :key="category.idCategory"
        class="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
      >
        <!-- Category Image -->
        <img
          :src="category.strCategoryThumb"
          :alt="category.strCategory"
          class="w-full h-40 object-cover"
        />

        <!-- Category Content -->
        <div class="p-4 flex flex-col items-center">
          <!-- Category Name -->
          <h2 class="text-xl font-semibold text-gray-700 mb-2">
            {{ category.strCategory }}
          </h2>

          <!-- Category Description -->
          <p class="text-sm text-gray-600 text-center line-clamp-3 mb-4">
            {{ category.strCategoryDescription }}
          </p>

          <!-- View Meals Button -->
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            @click="navigateToCategory(category.strCategory)"
          >
            View Meals
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
