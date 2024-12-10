<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Snackbar from "../../components/Snackbar/index.vue";

const router = useRouter();
const store = useStore();

const valid = ref(false);
const email = ref("");
const password = ref("");
const snackbar = ref(null);

const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 6) || "Password must be at least 6 characters long",
];

const usersList = computed(() => store.getters.users);

const showSnackbar = (message, type = "success") => {
  snackbar.value.setMessage(message);
  snackbar.value.setType(type);
  snackbar.value.show();
};

const login = () => {
  if (valid.value) {
    const user = usersList.value.find((user) => user.email === email.value);

    if (!user) {
      showSnackbar("User not found", "error");
      return;
    }

    // Assign roles to user if email is salman@gmail.com
    if (user.email === "salman@gmail.com") {
      user.roles = [3];
    }

    // Check password
    if (user.password === password.value) {
      store.dispatch("loginUser", user);
      showSnackbar("Logged in successfully", "success");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      showSnackbar("Incorrect password", "warning");
    }
  }
};

const goToSignup = () => {
  router.push("/signup");
};
</script>

<template>
  <div class="flex justify-center items-center h-[calc(100vh-100px)]">
    <v-card class="w-[550px]">
      <v-card-title class="mb-4">
        <span class="headline">Login</span>
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            placeholder="Enter your email"
            required
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            class="mb-2"
          ></v-text-field>

          <v-btn :disabled="!valid" @click="login" color="primary mt-8" block>
            Login
          </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text class="text-capitalize" @click="goToSignup"
          >Don't have an account? Sign Up</v-btn
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
