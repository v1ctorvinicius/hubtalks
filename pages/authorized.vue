<template>
  <div class="container text-white">
    <section class="blue-whale-alpha">
      <h2>Welcome back 🚀, {{ usernameCookie }} </h2>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "~/stores/UserStore";

const router = useRouter();


const token = ref('');
const expirationTime = ref(0);
const username = ref('');
const imageUrl = ref('');
const userEmail = ref('');

const userState = useUserStore();

const tokenCookie = useCookie('token');
const tokenExpirationTimeCookie = useCookie('expirationTime');
const usernameCookie = useCookie('username');
const imageUrlCookie = useCookie('imageUrl');
const userEmailCookie = useCookie('userEmail');
const isAuthenticatedCookie = useCookie('isAuthenticated');

async function getUserData() {
  // access_token from url
  let url = window.location.href;
  token.value = url.split("access_token=")[1];

  const newUrl = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token.value}`;
  const response: GoogleUserInfo = await $fetch(newUrl)
  if (!response) {
    console.error("error");
    return
  }

  const expiresIn = url.split("expires_in=")[1].split('&')[0];
  expirationTime.value = Date.now() + parseInt(expiresIn) * 1000;
  username.value = response.given_name;
  imageUrl.value = response.picture;
  userEmail.value = response.email;

  tokenCookie.value = token.value;
  tokenExpirationTimeCookie.value = expirationTime.value.toString();
  usernameCookie.value = username.value;
  imageUrlCookie.value = imageUrl.value;
  userEmailCookie.value = userEmail.value;
  isAuthenticatedCookie.value = 'true';

  userState.setIsAuthenticated(true);
  userState.setToken(token.value);
  userState.setTokenExpirationTime(expirationTime.value);
  userState.setUsername(username.value);
  userState.setImageUrl(imageUrl.value);
  userState.setUserEmail(userEmail.value);
}

onMounted(() => {
  getUserData().then(() => {
    navigateTo('/home');
    return;
  });
});

interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10vh 5vw;
  min-height: 88vh;
}
</style>
