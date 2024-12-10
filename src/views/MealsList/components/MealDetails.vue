<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axiosClient from "../../../api/axiosClient";
import Loader from "../../../components/Loader/index.vue";
import ReusableDialog from "../../../components/ReusableDialog/index.vue";

const route = useRoute();
const store = useStore();
const router = useRouter();

// State
const meal = ref(null);
const isLoading = ref(true);
const isDialogOpen = ref(false);

// Fetch Meal API
onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await axiosClient.get(`lookup.php?i=${route.params.id}`);
    meal.value = response.data.meals[0] || {};
  } catch (error) {
    console.error("Error fetching meal details:", error);
  } finally {
    isLoading.value = false;
  }
});

// VUEX
const cartItems = computed(() => store.getters.cartItems);
const cartItem = computed(() =>
  cartItems.value.find((item) => item.idMeal === meal.value?.idMeal)
);
const loginUser = computed(() => store.getters.loginUser);

const incrementQuantity = () => {
  if (cartItem.value) {
    store.dispatch("incrementQuantity", cartItem.value.idMeal);
  }
};
const decrementQuantity = () => {
  if (cartItem.value) {
    store.dispatch("decrementQuantity", cartItem.value.idMeal);
  }
};

// Cart Actions
const addToCart = () => {
  if (loginUser?.value?.name) {
    store.dispatch("addToCart", meal.value);
  } else {
    openDialog();
  }
};

const openDialog = () => {
  isDialogOpen.value = true;
};
</script>

<template>
  <div class="flex flex-col items-center p-6 min-h-screen bg-gray-50 mt-4">
    <!-- Show Loader While Fetching -->
    <div v-if="isLoading" class="mt-8">
      <Loader :visible="isLoading" />
    </div>

    <!-- Meal Details -->
    <div
      v-else
      class="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-64 object-cover"
      />

      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          {{ meal.strMeal }}
        </h1>

        <div class="flex justify-between items-center">
          <p class="text-gray-600">
            <strong>Category:</strong> {{ meal.strCategory }}
          </p>
          <p class="text-gray-600"><strong>Area:</strong> {{ meal.strArea }}</p>
          <p class="text-gray-600" v-if="meal?.strTags">
            <strong>Tags:</strong> {{ meal?.strTags?.split(",")[0] }}
          </p>
        </div>

        <div class="mt-3">
          <p class="text-gray-600">
            <strong>Instructions:</strong>
            {{ meal.strInstructions.slice(0, 550)
            }}{{ meal.strInstructions.length > 550 ? "..." : "" }}
          </p>
        </div>

        <!-- Cart Buttons -->
        <div class="mt-4 flex space-x-4">
          <!-- If item not in cart, show Add to Cart -->
          <button
            v-if="!cartItem"
            @click="addToCart"
            class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>

          <div v-if="!cartItem">
            <ReusableDialog v-model="isDialogOpen" title="Login Alert">
              <template v-slot:content>
                <div>
                  <p class="text-gray-600">
                    You need to login to add items to the cart.
                  </p>
                  <div class="mt-8 flex justify-end gap-8">
                    <button
                      @click="router.push('/signup')"
                      class="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 transition"
                    >
                      Sign Up
                    </button>
                    <button
                      @click="router.push('/login')"
                      class="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700 transition"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </template>
            </ReusableDialog>
          </div>

          <!-- If item is in cart, show increment/decrement buttons -->
          <div v-else class="flex items-center space-x-6">
            <button
              @click="decrementQuantity"
              class="bg-red-600 w-20 text-[20px] text-white py-[2px] px-3 rounded hover:bg-red-700 transition"
            >
              -
            </button>
            <span class="text-lg font-semibold text-gray-800">
              {{ cartItem.quantity }}
            </span>
            <button
              @click="incrementQuantity"
              class="bg-green-600 w-20 text-[20px] text-white py-[2px] px-3 rounded hover:bg-green-700 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
