<script setup lang="ts">
import "./assets/style.css"
import { useUserStore } from "~/stores/UserStore";

onBeforeMount(() => {
  const userStore = useUserStore();
  const isAuthenticated: Ref<boolean> = ref(userStore.loadFromCookie());
  if (!isAuthenticated.value) {
    userStore.setIsAuthenticated(false);
    useCookie("isAuthenticated").value = "false";
    return;
  }
  userStore.setIsAuthenticated(isAuthenticated.value)

})
</script>

<template>
  <NuxtLayout />
</template>
