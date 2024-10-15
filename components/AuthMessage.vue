<template>
  <div>
    <Message class="message" v-if="!userState.isAuthenticated" severity="info"
      :pt:text:style="'padding: 0 1vw ; display: flex; align-items: center'"> Now authenticated as guest
      <Button @click="login()" label="login" style="margin-left: 10px" />
    </Message>
  </div>
</template>

<script lang="ts" setup>

import { useUserStore } from "~/stores/UserStore";

const userState = useUserStore();

const login = () => {
  navigateTo('/login');
};
</script>

<style></style>