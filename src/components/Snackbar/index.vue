<template>
  <v-snackbar
    v-model="isVisible"
    :timeout="timeout"
    :color="computedColor"
    :elevation="elevation"
    :multi-line="multiLine"
    location="right"
    position="top"
  >
    <slot name="message">Default Snackbar Message</slot>
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
    type: {
      type: String,
      default: "success", // Types: 'success', 'warning', 'error'
      validator: (value) => ["success", "warning", "error"].includes(value),
    },
    elevation: {
      type: [Number, String],
      default: 24,
    },
    multiLine: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    computedColor() {
      switch (this.type) {
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
  },
};
</script>

<style scoped></style>
