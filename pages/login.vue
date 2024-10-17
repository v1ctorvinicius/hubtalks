<script setup lang="ts">

const config = useRuntimeConfig();
const googleClientId = config.public.googleClientId;
const redirectUri = config.public.redirectUri;
const checked = ref(false);

function googleOauthSignIn() {
  let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  let form = document.createElement('form');
  form.setAttribute('method', 'GET');
  form.setAttribute('action', oauth2Endpoint);

  let params = {
    'client_id': `${googleClientId}`,
    'redirect_uri': `${redirectUri}`,
    'response_type': 'token',
    'scope': 'profile',
    'include_granted_scopes': 'true',
    'state': 'pass-through value'
  };

  for (let p in params) {
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    //@ts-ignore
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}
</script>

<template>
  <div class="main-container">
    <section class="container blue-whale-alpha text-white" style="text-align: center; padding: 20vh 30vw;">
      <div class="providers" style=" display: flex; flex-direction: column;  gap: 2vh; margin-bottom: 2vh;">

        <Button @click="googleOauthSignIn" label="Enter with Google" icon="pi pi-google"
          :pt:icon:style="'font-size: 1.5vw'" />
        <Button @click="" label="Enter with GitHub" icon="pi pi-github" style="" :pt:icon:style="'font-size: 1.5vw'" />
        <!-- <Button @click="login" label="Login with Facebook" icon="pi pi-facebook" style="width: 100%; margin-top: 10%;" /> -->
        <!-- <Button @click="login" label="Login with Twitter" icon="pi pi-twitter" style="width: 100%; margin-top: 10%;" /> -->
        <!-- <Button @click="login" label="Login with Apple" icon="pi pi-apple" style="width: 100%; margin-top: 10%;" /> -->
      </div>
      <p>or</p>
      <InputText type="email" placeholder="Email" style="width: 100%; margin-top: 2vh;" />
      <InputText type="password" placeholder="Password" style="width: 100%; margin-top: 2vh;" />
      <div
        style="display: flex; flex-direction: row;  justify-content: space-between; align-items: center; padding: 2vh 0;">
        <div style="display: flex; gap: 0.5vw; ">
          <Checkbox v-model="checked" :invalid="false" binary itemid="remember" />
          <label for="remember">Remember me</label>
        </div>
        <a href="">Reset password</a>
      </div>
      <Button @click="" label="Enter" style="width: 100%;" />
    </section>
  </div>
</template>

<style>
@media (min-width: 1200px) {
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 5vh;
  }

  .container {
    padding: 2%;
    margin: auto;
    width: 100%;
    border-radius: 10px;
  }
}
</style>