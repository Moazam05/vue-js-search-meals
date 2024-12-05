<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Snackbar from "../../components/Snackbar/index.vue";

// Vue Router and Vuex store
const router = useRouter();
const store = useStore();

// Form state
const valid = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");
const snackbar = ref(null);

// Validation rules
const nameRules = [(v) => !!v || "Name is required"];
const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];
const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 6) || "Password must be at least 6 characters long",
];

const showSnackbar = (message, type = "success") => {
  snackbar.value.setMessage(message);
  snackbar.value.setType(type);
  snackbar.value.show();
};

// Signup function
const signup = () => {
  if (valid.value) {
    const payload = {
      id: new Date().getTime(),
      name: name.value,
      email: email.value,
      password: password.value,
    };

    store.dispatch("addUser", payload);

    showSnackbar("User created successfully", "success");

    setTimeout(() => {
      router.push("/login");
    }, 3000);
  }
};

// Navigate to login page
const goToLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div class="flex justify-center items-center h-[calc(100vh-100px)]">
    <v-card class="w-[550px]">
      <v-card-title class="mb-4">
        <span class="headline">Sign Up</span>
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <!-- Name Field -->
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Full Name"
            placeholder="Enter your full name"
            required
            class="mb-2"
          ></v-text-field>

          <!-- Email Field -->
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            placeholder="Enter your email"
            required
            class="mb-2"
          ></v-text-field>

          <!-- Password Field -->
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            class="mb-2"
          ></v-text-field>

          <!-- Sign Up Button -->
          <v-btn :disabled="!valid" @click="signup" color="primary mt-8" block>
            Sign Up
          </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text class="text-capitalize" @click="goToLogin"
          >Already have an account? Login</v-btn
        >
      </v-card-actions>
    </v-card>

    <!-- Snackbar Component -->
    <Snackbar ref="snackbar" />
  </div>
</template>

<style scoped>
::v-deep(.v-input__details) {
  padding: 0px !important;
  margin-bottom: 0px !important;
}
</style>
