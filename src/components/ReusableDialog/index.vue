<template>
  <v-dialog v-model="isDialogOpen" :max-width="maxWidth">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">{{ closeButtonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ReusableDialog",
  props: {
    title: { type: String, default: "Dialog" },
    maxWidth: { type: String, default: "500px" },
    closeButtonText: { type: String, default: "Close" },
    modelValue: { type: Boolean, required: true },
  },
  emits: ["update:modelValue"],
  computed: {
    isDialogOpen: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    closeDialog() {
      this.isDialogOpen = false;
    },
  },
};
</script>
