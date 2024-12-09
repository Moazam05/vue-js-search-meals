<template>
  <v-dialog v-model="isDialogOpen" :max-width="maxWidth" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between items-center">
        {{ title }}
        <v-icon @click="closeDialog" size="23">mdi-close</v-icon>
      </v-card-title>

      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>
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
