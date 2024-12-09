<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const cartItems = computed(() => store.getters.cartItems);

const incrementQuantity = (item) => {
  if (item) {
    store.dispatch("incrementQuantity", item);
  }
};
const decrementQuantity = (item) => {
  if (item) {
    store.dispatch("decrementQuantity", item);
  }
};

const removeProduct = (id) => {
  store.dispatch("removeFromCart", id);
};
</script>

<template>
  <div class="cart-page">
    <h1 class="text-3xl font-bold text-center my-6">Your Cart</h1>

    <!-- Empty Cart Message -->
    <div v-if="!cartItems?.length" class="text-center text-gray-500">
      Your cart is empty. Add some delicious meals!
    </div>

    <!-- Cart Items List -->
    <div v-else class="container mx-auto px-6">
      <div class="flex flex-col space-y-4">
        <div
          v-for="item in cartItems"
          :key="item.idMeal"
          class="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
        >
          <!-- Product Image and Details -->
          <div class="flex items-center space-x-4">
            <img
              :src="item.strMealThumb"
              :alt="item.strMeal"
              class="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h2 class="text-lg font-semibold">{{ item.strMeal }}</h2>
              <p class="text-sm text-gray-500">{{ item.strCategory }}</p>
            </div>
          </div>

          <!-- Quantity Controls -->
          <div class="flex items-center space-x-2">
            <button
              @click="decrementQuantity(item.idMeal)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              -
            </button>
            <span class="text-lg font-medium">{{ item.quantity }}</span>
            <button
              @click="incrementQuantity(item.idMeal)"
              class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              +
            </button>
          </div>

          <!-- Remove Product Button -->
          <button
            @click="removeProduct(item.idMeal)"
            class="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
          >
            Remove
          </button>
        </div>
      </div>

      <!-- Clear Cart Button -->
      <div class="text-right mt-6">
        <button
          @click="clearCart"
          class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem;
}
</style>
