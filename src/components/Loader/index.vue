<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div v-if="visible" class="flex justify-center items-center w-full h-full">
    <div
      class="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
    ></div>
  </div>
</template>
