<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();

const cartItems = computed(() => store.getters.cartItems);

console.log("CCC", cartItems.value);
</script>

<template>
  <div>Cart Page</div>
</template>

<style scoped></style>
