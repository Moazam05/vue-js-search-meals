import { createApp } from "vue";
import router from "./router";
import store from "./store";
import "./style.css";
import "primeicons/primeicons.css";
import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";

import { createVuetify } from "vuetify";
import "vuetify/styles"; // Import Vuetify's CSS styles
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router).use(store).use(vuetify).mount("#app");
