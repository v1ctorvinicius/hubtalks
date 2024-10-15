import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useUserStore = defineStore("user", () => {
  const userId = ref("");
  const username = ref("guest" + Math.floor(Math.random() * 1000));
  const email = ref("");
  const isAuthenticated = ref(false);
  const imageUrl = ref(useCookie("imageUrl")); //"https://picsum.photos/id/237/250/250"
  const token = ref("");
  const tokenExpirationTime = ref(0);

  function setUser(_userId: string) {
    userId.value = _userId;
  }
  function getToken() {
    return token.value;
  }

  function setToken(_token: string) {
    token.value = _token;
  }

  function setUsername(_username: string) {
    username.value = _username;
  }

  function setUserEmail(_email: string) {
    email.value = _email;
  }

  function setImageUrl(_imageUrl: string) {
    imageUrl.value = _imageUrl;
  }

  function getTokenExpirationTime() {
    return tokenExpirationTime.value;
  }

  function setTokenExpirationTime(_expirationTime: number) {
    tokenExpirationTime.value = _expirationTime;
  }

  function setIsAuthenticated(_isAuthenticated: boolean) {
    isAuthenticated.value = _isAuthenticated;
    if (_isAuthenticated === false) {
      token.value = "";
      tokenExpirationTime.value = 0;
      username.value = "guest" + Math.floor(Math.random() * 1000);
      imageUrl.value = `https://picsum.photos/id/237/250/250`;
      email.value = "";
      userId.value = "";
    }
  }

  function loadFromCookie(): boolean {
    const tokenCookie = useCookie("token");
    const usernameCookie = useCookie("username");
    const imageUrlCookie = useCookie("imageUrl");

    if (!tokenCookie.value || !usernameCookie.value || !imageUrlCookie.value) {
      return false;
    }

    setToken(tokenCookie.value);
    setUsername(usernameCookie.value);
    setImageUrl(imageUrlCookie.value);
    setIsAuthenticated(true);
    return true;
  }

  return {
    userId,
    username,
    email,
    imageUrl,
    isAuthenticated,
    setUser,
    getToken,
    setToken,
    setUsername,
    setImageUrl,
    getTokenExpirationTime,
    setTokenExpirationTime,
    setIsAuthenticated,
    setUserEmail,
    loadFromCookie,
  };
});

export default useUserStore;
