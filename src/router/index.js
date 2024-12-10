import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import Home from "../views/Home/index.vue";
import MealsByLetter from "../views/MealsList/components/MealsByLetter.vue";
import MealsByName from "../views/MealsList/components/MealsByName.vue";
import MealDetails from "../views/MealsList/components/MealDetails.vue";
import Login from "../views/Auth/Login.vue";
import Signup from "../views/Auth/Signup.vue";
import Cart from "../views/Cart/index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/letter/:letter?",
    name: "byLetter",
    component: MealsByLetter,
  },
  {
    path: "/name/:name?",
    name: "byName",
    component: MealsByName,
  },
  {
    path: "/meal/:id",
    name: "mealDetails",
    component: MealDetails,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.state.loginUser; // Convert to boolean (true if user exists)

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isPublicRoute = ["Login", "Signup"].includes(to.name); // Define public-only routes

  console.log("requiresAuth: ", requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    // If route requires auth and user is not authenticated
    next({ name: "Login" });
  } else if (isAuthenticated && isPublicRoute) {
    // If user is authenticated and trying to access public-only routes
    next({ name: "home" }); // Redirect to home or any other default private route
  } else {
    next(); // Proceed to the route
  }
});

export default router;
