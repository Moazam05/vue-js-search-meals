<script>
export default {
  name: "Snackbar",
  props: {
    timeout: {
      type: Number,
      default: 2000,
    },
    color: {
      type: String,
      default: "deep-purple-accent-4",
    },
    elevation: {
      type: [Number, String],
      default: 24,
    },
    multiLine: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isVisible: false,
    };
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

<template>
  <v-snackbar
    v-model="isVisible"
    :timeout="timeout"
    :color="color"
    :elevation="elevation"
    :multi-line="multiLine"
    :top="top"
    :bottom="bottom"
    :left="left"
    :right="right"
  >
    <slot name="message">Default Snackbar Message</slot>
  </v-snackbar>
</template>

<style scoped></style>
