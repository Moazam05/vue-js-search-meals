import { createRouter, createWebHistory } from "vue-router";

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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
