<template>
  <v-snackbar
    v-model="isVisible"
    :timeout="timeout"
    :color="computedColor"
    :elevation="elevation"
    location="right"
    position="top"
  >
    <span>{{ currentMessage }}</span>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    timeout: {
      type: Number,
      default: 2000,
    },
    elevation: {
      type: [Number, String],
      default: 24,
    },
  },
  data() {
    return {
      isVisible: false,
      currentMessage: "Default Snackbar Message",
      currentType: "success", // Types: 'success', 'warning', 'error'
    };
  },
  computed: {
    computedColor() {
      switch (this.currentType) {
        case "success":
          return "green darken-2"; // Success color
        case "warning":
          return "amber darken-2"; // Warning color
        case "error":
          return "red darken-2"; // Error color
        default:
          return "deep-purple-accent-4"; // Default color
      }
    },
  },
  methods: {
    show() {
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
    setMessage(message) {
      this.currentMessage = message;
    },
    setType(type) {
      this.currentType = type;
    },
  },
};
</script>

<style scoped></style>
