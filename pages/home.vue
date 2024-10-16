<script setup lang="ts">
import { useUserStore } from "~/stores/UserStore";
import "../assets/style.css"
import { useRouter } from "vue-router";
const userStore = useUserStore();

const tokenCookie = useCookie('token');
const tokenExpirationTimeCookie = useCookie('expirationTime');
const usernameCookie = useCookie('username');
const imageUrlCookie = useCookie('imageUrl');
const isAuthenticatedCookie = useCookie('isAuthenticated');
const userEmailCookie = useCookie('userEmail');
const router = useRouter();

const logout = () => {
  userStore.setIsAuthenticated(false);
  tokenCookie.value = "";
  tokenExpirationTimeCookie.value = "0";
  usernameCookie.value = "";
  imageUrlCookie.value = "";
  isAuthenticatedCookie.value = 'false';
  userEmailCookie.value = "";
}

onBeforeMount(() => {
  if (!userStore.isAuthenticated) {
    router.push({ name: "login" });
    return;
  }
});

</script>

<template>
  <div class="container">

    <div class="user-info blue-whale-alpha">
      <img :src="userStore.imageUrl!" style="width: 300px; height: 300px; border-radius: 50%;" />
      <p>username: <span style="font-weight: bold; font-size: 1vw; color: tomato">{{ userStore.username }}</span>
      </p>
      <Button :disabled="!userStore.isAuthenticated" severity="danger" @click="logout" label="Logout"
        style="" icon="pi pi-sign-out" :pt:icon:style="'margin-right: 0.5vw'" />
    </div>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  width: 80vw;
  height: 70vh;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 2vw;
  border-radius: 10px;
}

.user-info img:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.5s;
}
</style>