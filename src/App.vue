<script setup>
import Navbar from "./components/Navbar/index.vue";
</script>

<template>
  <div>
    <header>
      <Navbar />
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
