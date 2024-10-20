// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  // plugins: ['~/plugins/piniaPlugin.ts'],
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      redirectUri: process.env.REDIRECT_URI,
      apiBaseUrl: process.env.API_BASE_URL,
      mongodbPassword: process.env.MONGODB_PASSWORD,
    },
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  hooks: {},
});
