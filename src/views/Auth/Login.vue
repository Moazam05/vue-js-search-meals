<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const valid = ref(false);
const email = ref("");
const password = ref("");

const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 6) || "Password must be at least 6 characters long",
];

const login = () => {
  if (valid.value) {
    // Handle the login logic here (e.g., authentication API call)
    console.log("Logging in with", email.value, password.value);
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
  </div>
</template>

<style scoped>
.v-text-field .v-input__details {
  padding: 0 !important;
}
</style>
