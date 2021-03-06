import axios from 'axios'

const pkg = require('./package')
const path = require('path')

require('dotenv').config()

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Zilla+Slab:400,700' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito:400,700,900&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Press+Start+2P' },
      { rel: "stylesheet", href: "https://use.fontawesome.com/releases/v5.2.0/css/all.css" }
    ],
    script: [
      { src: 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // { src: 'nes.css/scss/nes.scss', lang: 'scss' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/bloks',
    { src: '~/plugins/phaser', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    ['nuxt-buefy', { defaultIconPack: 'fas', defaultContainerElement: '#content' }],
    ['storyblok-nuxt', { accessToken: 'BMrhKOV0AUIQc7QLAKF4UAtt', cacheProvider: 'memory' }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  router: {
    middleware: 'loadSettings'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  serverMiddleware: [
    '~/api/index.js'
  ],
  generate: {
    routes: function () {
      return axios.get('https://api.storyblok.com/v1/cdn/stories?token=BMrhKOV0AUIQc7QLAKF4UAtt&starts_with=blog')
        .then((res) => {
          return res.data.stories.filter(s => s.name !== 'root').map(s => `/${s.full_slug}`);
        })
    }
  }
}
