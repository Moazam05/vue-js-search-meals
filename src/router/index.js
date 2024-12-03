import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home/index.vue";
import MealsList from "../views/MealsList/index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/letter/:letter",
    name: "byLetter",
    component: MealsList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
