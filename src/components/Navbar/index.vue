<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

const router = useRouter();
const store = useStore();

const navigate = (path) => {
  router.push(path);
};

const cartItemCount = computed(() => store.getters.cartItems);
const loginUser = computed(() => store.getters.loginUser);

const logout = () => {
  store.dispatch("logoutUser");
  router.push("/");
};
</script>

<template>
  <nav class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto flex items-center justify-between p-4">
      <!-- Logo or Title -->
      <div class="text-lg font-bold cursor-pointer" @click="navigate('/')">
        Meal Finder
      </div>

      <!-- Navigation Links -->
      <div class="flex space-x-4">
        <button
          @click="navigate('/name')"
          class="hover:bg-blue-700 px-2 py-2 rounded transition"
        >
          Search Meals
        </button>
        <button
          @click="navigate('/letter')"
          class="hover:bg-blue-700 px-2 py-2 rounded transition"
        >
          Meals By Letter
        </button>

        <button
          v-if="!loginUser?.name"
          @click="navigate('/login')"
          class="hover:bg-blue-700 px-2 py-2 rounded transition"
        >
          Login
        </button>

        <v-menu v-if="loginUser?.name">
          <template v-slot:activator="{ props }">
            <div v-bind="props" class="px-2 py-2">
              {{ loginUser?.name }}
            </div>
          </template>
          <v-list style="padding: 0">
            <v-list-item @click="logout">
              <v-icon size="20" class="me-2">mdi-logout</v-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <div
          class="relative flex items-center cursor-pointer hover:text-blue-300 transition"
          @click="router.push('/cart')"
        >
          <!-- Cart Icon -->
          <i class="pi pi-shopping-cart text-2xl"></i>

          <!-- Badge for item count -->
          <span
            v-if="cartItemCount?.length > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
          >
            {{ cartItemCount?.length }}
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
::v-deep(.v-list-item__content) {
  display: flex !important;
  align-items: center !important;
}
</style>
