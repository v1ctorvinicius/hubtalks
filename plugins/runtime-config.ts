export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      useRuntimeConfig: nuxtApp.$config,
    },
  };
});
