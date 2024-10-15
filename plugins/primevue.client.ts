import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-dark-purple/theme.css";
import "primeicons/primeicons.css";
import Button from "primevue/button";
import Message from "primevue/message";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import FloatLabel from "primevue/floatlabel";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("Message", Message);
  nuxtApp.vueApp.component("Menubar", Menubar);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
  nuxtApp.vueApp.component("FloatLabel", FloatLabel);
  
});
