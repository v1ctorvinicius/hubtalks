import { defineNuxtComponent } from "#app";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-dark-purple/theme.css";
import "primeicons/primeicons.css";
import Button from "primevue/button";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.component("Button", Button);
});
