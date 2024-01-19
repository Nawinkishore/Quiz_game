// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss','@nuxt-alt/http',
  ],
  http:{
    baseURL: 'https://localhost:5000',
    credentials:'omit',
    browserBaseURL: 'https://localhost:5000',
  }
});
