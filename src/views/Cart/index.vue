<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { formatNumberWithSeparator } from "../../utils";

const store = useStore();

const cartItems = computed(() => store.getters.cartItems);

const incrementQuantity = (id) => {
  store.dispatch("incrementQuantity", id);
};
const decrementQuantity = (id) => {
  store.dispatch("decrementQuantity", id);
};
const removeProduct = (id) => {
  store.dispatch("removeFromCart", id);
};
const clearCart = () => {
  store.dispatch("clearCart");
};

// Calculate the total
const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + Number(item.idMeal) * item.quantity,
    0
  );
});
</script>

<template>
  <div class="cart-page flex flex-col lg:flex-row gap-6 px-4 py-6">
    <!-- Left Side: Cart Items -->
    <div class="cart-items flex-1 bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Your Cart</h2>
      <div v-if="!cartItems?.length" class="text-center text-gray-500">
        Your cart is empty. Add some delicious meals!
      </div>
      <div v-else>
        <div
          v-for="item in cartItems"
          :key="item.idMeal"
          class="flex items-center justify-between border-b py-4"
        >
          <!-- Product Image and Info -->
          <div class="flex items-center gap-4">
            <img
              :src="item.strMealThumb"
              alt=""
              class="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 class="text-lg font-medium">{{ item.strMeal }}</h3>
              <p class="text-sm text-gray-500">{{ item.strCategory }}</p>
              <p class="text-sm text-gray-500">
                Price: {{ formatNumberWithSeparator(item.idMeal) }}
              </p>
            </div>
          </div>
          <!-- Controls -->
          <div class="flex items-center gap-2">
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
          <!-- Remove Button -->
          <div class="">
            <button
              @click="removeProduct(item.idMeal)"
              class="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side: Cart Total -->
    <div class="cart-summary w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Cart Summary</h2>
      <div v-if="cartItems?.length">
        <div class="flex justify-between py-2 border-b">
          <span class="text-gray-700">Total Items:</span>
          <span class="font-medium">{{ cartItems.length }}</span>
        </div>
        <div class="flex justify-between py-2 border-b">
          <span class="text-gray-700">Total Price:</span>
          <span class="font-medium"
            >Rs. {{ formatNumberWithSeparator(totalPrice) }}</span
          >
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        Nothing to calculate. Your cart is empty.
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  min-height: 100vh;
  background-color: #f3f4f6;
}
.cart-items,
.cart-summary {
  background-color: #fff;
  height: fit-content;
}
</style>
