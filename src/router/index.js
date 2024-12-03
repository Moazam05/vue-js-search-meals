import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home/index.vue";
import MealsByLetter from "../views/MealsList/components/MealsByLetter.vue";
import MealsByName from "../views/MealsList/components/MealsByName.vue";
import MealsByIngredient from "../views/MealsList/components/MealsByIngredient.vue";

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
    path: "/ingredient/:ingredient?",
    name: "byIngredient",
    component: MealsByIngredient,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
