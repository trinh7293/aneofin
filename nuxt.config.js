
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@plugins/vuetify',
    '@plugins/fireauth'
  ],
  // ...
  router: {
    middleware: 'authentication'
  },
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // https://github.com/nuxt-community/modules/tree/master/packages/toast
    '@nuxtjs/toast'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  toast: {
    position: 'top-right',
    theme: 'bubble',
    duration: 5000,
    register: [ // Register custom toasts
      {
        name: 'my_app_error',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload.message) {
            return 'Oops.. Something Went Wrong..'
          }

          // if there is a message show it with the message
          return `Oops.. ${payload.message}`
        },
        options: {
          type: 'error'
        }
      },
      {
        name: 'my_app_success',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload) {
            return 'Success'
          }

          // if there is a message show it with the message
          return `${payload}`
        },
        options: {
          type: 'success'
        }
      },
      {
        name: 'my_app_info',
        message: (payload) => {
          // if there is no message passed show default message
          if (!payload.message) {
            return 'OK'
          }

          // if there is a message show it with the message
          return `${payload.message}`
        },
        options: {
          type: 'info'
        }
      }
    ]
  },
  build: {
  }
}
