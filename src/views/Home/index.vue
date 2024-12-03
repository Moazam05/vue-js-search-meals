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
</script>

<template>
  <div class="flex flex-col items-center p-8 min-h-screen bg-gray-50"></div>
</template>

<style scoped></style>
