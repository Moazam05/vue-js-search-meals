import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import Home from "../views/Home/index.vue";
import MealsByLetter from "../views/MealsList/components/MealsByLetter.vue";
import MealsByName from "../views/MealsList/components/MealsByName.vue";
import MealDetails from "../views/MealsList/components/MealDetails.vue";
import Login from "../views/Auth/Login.vue";
import Signup from "../views/Auth/Signup.vue";
import Cart from "../views/Cart/index.vue";
import Admin from "../views/Admin/index.vue";

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
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAdmin: true, // Only users with roles [3] can access
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const loginUser = store.state.loginUser;
  const isAuthenticated = !!loginUser; // Convert to boolean
  const userRoles = loginUser?.roles || []; // Get user roles or default to empty array

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  const isPublicRoute = ["Login", "Signup"].includes(to.name); // Define public-only routes

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if route requires authentication and user is not authenticated
    next({ name: "Login" });
  } else if (isAuthenticated && isPublicRoute) {
    // Redirect authenticated users away from public routes
    next({ name: "home" });
  } else if (requiresAdmin && !userRoles.includes(3)) {
    // Redirect to home if user tries to access admin route without admin role
    next({ name: "home" });
  } else {
    // Allow access otherwise
    next();
  }
});

export default router;
