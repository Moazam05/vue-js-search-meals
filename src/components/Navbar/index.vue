<script setup>
import { useRouter } from "vue-router";

// Router instance for programmatic navigation
const router = useRouter();

const navigate = (path) => {
  router.push(path);
};
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
          Search By Name
        </button>
        <button
          @click="navigate('/letter')"
          class="hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          Search By Letter
        </button>
        <button
          @click="navigate('/ingredients')"
          class="hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          Search By Ingredients
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Additional styling can go here */
</style>
