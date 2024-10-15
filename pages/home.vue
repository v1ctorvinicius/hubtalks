<script setup lang="ts">
import { useUserStore } from "~/stores/UserStore";
import "../assets/style.css"

const userStore = useUserStore();

const tokenCookie = useCookie('token');
const tokenExpirationTimeCookie = useCookie('expirationTime');
const usernameCookie = useCookie('username');
const imageUrlCookie = useCookie('imageUrl');
const isAuthenticatedCookie = useCookie('isAuthenticated');
const userEmailCookie = useCookie('userEmail');

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

  console.log('onBeforeMount', userStore.isAuthenticated);

});

onMounted(() => {
  console.log('onMounted', userStore.isAuthenticated);



});



</script>

<template>
  <div class="container">

    <div class="user-info blue-whale-alpha"
      style="display: flex; flex-direction: column; height: 55vh; justify-content: space-around;">
      <img :src="userStore.imageUrl!" style="width: 300px; height: 300px; border-radius: 50%;" />
      <p>username: <span style="font-weight: bold; font-size: 1vw; color: tomato">{{ userStore.username }}</span>
      </p>
      <Button :disabled="!userStore.isAuthenticated" severity="danger" @click="logout" label="Logout"
        style=" align-self: flex-end; min-width: 40%;" icon="pi pi-sign-out" :pt:icon:style="'padding: 10% 10%'" />
    </div>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 80vw; */
  padding: 0 2vw;
  border-radius: 10px;
}

.user-info img:hover {
  border: 1px solid #193842;
}
</style>