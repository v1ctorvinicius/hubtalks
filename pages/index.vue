<template>
  <div>index</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onBeforeMount, onMounted } from "vue";
const router = useRouter();
onBeforeMount(() => {
  if (!useUserStore().isAuthenticated) {
    router.push({ name: "login" });
    return
  }
  router.push({ name: "home" });
});
</script>