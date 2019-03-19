const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: '#2ecc71',
    height: '5px',
    // duration:500,
   },

  router: {
    middleware: [
      'clearValidationErrors'
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/main.css',
    // '~bootstrap/scss/bootstrap.scss'

  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/mixins/validation',
    './plugins/mixins/user',
    './plugins/axios',
    './plugins/element-ui',
    // './plugins/sidebar'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',

  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://test.produksi-iwzl-api.com/v1'

  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login', method: 'post', propertyName: 'token'
          },
          user: {
            url: '/user', method: 'get', propertyName: 'user'
          },
          logout: false
        }
      }
    },
    redirect: {
      login: '/login',
      home: '/'
    },
    plugins: [
      './plugins/auth',
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: true,
    extend(config, ctx) {
      
    }
  }
}
