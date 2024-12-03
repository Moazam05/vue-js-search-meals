<script setup>
import { computed } from "vue";
import store from "../../store";

const meals = computed(() => store.state.meals);
</script>

<!-- todo: Template -->
<template>
  <input type="text" />
</template>

<style scoped></style>
