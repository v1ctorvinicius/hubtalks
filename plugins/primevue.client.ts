import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-dark-purple/theme.css";
import "primeicons/primeicons.css";
import Button from "primevue/button";
import Message from "primevue/message";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import FloatLabel from "primevue/floatlabel";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import ButtonGroup from "primevue/buttongroup";
import Dialog from "primevue/dialog";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("Message", Message);
  nuxtApp.vueApp.component("Menubar", Menubar);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
  nuxtApp.vueApp.component("FloatLabel", FloatLabel);
  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("ButtonGroup", ButtonGroup);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.use(ToastService); 
});
