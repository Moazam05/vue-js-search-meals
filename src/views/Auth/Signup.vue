<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const valid = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");

const nameRules = [(v) => !!v || "Name is required"];

const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 6) || "Password must be at least 6 characters long",
];

const signup = () => {
  if (valid.value) {
    // Handle the signup logic here (e.g., registration API call)
    console.log("Signing up with", name.value, email.value, password.value);
  }
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<template>
  <v-container>
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <span class="headline">Sign Up</span>
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Full Name"
                placeholder="Enter your full name"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                placeholder="Enter your email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
              ></v-text-field>

              <v-btn :disabled="!valid" @click="signup" color="primary" block>
                Sign Up
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn text @click="goToLogin"
              >Already have an account? Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
