require('dotenv').config()

export default {
  head: {
    title: 'openweathermap-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }

    ]
  },

  css: [
    '~assets/scss/main.scss'
  ],

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },

  plugins: [
    { src: '@/plugins/vue-notification.js', ssr: false }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    // '@nuxtjs/stylelint-module'
    '@nuxtjs/fontawesome'
  ],

  modules: [
    '@nuxtjs/dotenv',
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    ['vue-scrollto/nuxt', { duration: 300, cancelable: false }]
  ],

  fontawesome: {
    icons: {
      solid: true,
      brands: true
    }
  },

  axios: {},

  build: {
  }
}
