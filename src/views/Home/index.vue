<script setup>
import { computed, onMounted } from "vue";
import store from "../../store";
import axiosClient from "../../api/axiosClient.js";

const meals = computed(() => store.state.meals);

onMounted(() => {
  axiosClient.get("list.php?c=list").then((response) => {
    console.log("RRR", response.data);
  });
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
</script>

<template>
  <div class="flex flex-col items-center p-8 min-h-screen bg-gray-50">
    <div class="flex flex-wrap justify-center">
      <router-link
        v-for="letter in letters"
        :key="letter"
        :to="`/letter/${letter}`"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center mx-1 mb-2 transition"
      >
        {{ letter }}
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
