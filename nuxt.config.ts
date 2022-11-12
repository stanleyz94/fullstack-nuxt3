// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { checkEnv } from './hooks/checkEnv'
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },
  runtimeConfig: {
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      encryptionKey: process.env.ENCRYPTION_KEY,
    },
    public: {
      appDomain: process.env.APP_DOMAIN,
    },
  },
  hooks: {
    'build:before'() {
      checkEnv()
    },
  },
})
