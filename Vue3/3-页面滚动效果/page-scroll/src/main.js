import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { observe } from "./directives";

const app = createApp(App);

app.directive("observe", observe);

app.mount("#app");
