<template>
  <div>index</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onBeforeMount, onMounted } from "vue";
const router = useRouter();
onBeforeMount(() => { console.log('mounted'); router.push({ name: "home" }); });
</script>