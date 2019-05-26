// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueLodash from 'vue-lodash'
import VueTouch from 'vue-touch'
import VueAnalytics from 'vue-analytics'
import VeeValidate from 'vee-validate'
import ToggleButton from 'vue-js-toggle-button'
import lodash from 'lodash'
import Vuetify from 'vuetify'
import VueLocalStorage from 'vue-localstorage'
import fullscreen from 'vue-fullscreen'

import Promise from 'es6-promise'
// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'

import smoothscroll from 'smoothscroll-polyfill'

// Import static data (translations, etc)
import StaticData from '@/data/data.json'
import SoundsData from '@/data/sounds.json'

// API call
import api from '@/api'

import 'babel-polyfill'

// Import Vuetify CSS
import 'vuetify/dist/vuetify.min.css'

// Vuetify Helpers
// import colors from 'vuetify/es5/util/colors'

// Import routes
import Routes from './routes'

// Import global config
import GlobalConfig from './config'

// Import project settings
import Settings from './config/settings'

// Import global plugims
import UrlPlugin from './plugins/url'
import Translation from './plugins/translation'
import PageTitle from './plugins/pagetitle'
import ImagePath from './plugins/imagepath'
import ImageResize from './plugins/imageresize'
import Background from './plugins/background'
import TitleCase from './plugins/titlecase'
import LocationRedirect from './plugins/redirect'
import Metas from './plugins/metas'
import TogglePassword from './plugins/togglepass'
import FirebaseAuthPlugin from './plugins/firebaseauth'
import ShortUrl from './plugins/shortUrl'

// Import main component
import App from './App'

// Init
Vue.use(Vuetify)
Vue.use(VueLocalStorage)
Vue.use(VueRouter)
Vue.use(FirebaseAuthPlugin)
Vue.use(ShortUrl)
Vue.use(GlobalConfig)
Vue.use(UrlPlugin)
Vue.use(Translation)
Vue.use(PageTitle)
Vue.use(ImagePath)
Vue.use(ImageResize)
Vue.use(Background)
Vue.use(TitleCase)
Vue.use(VueLodash, lodash)
Vue.use(VueTouch)
Vue.use(VeeValidate, {
  events: 'input' // Validate on input only as Firefox currently creates an issue with blur validation.
})
Vue.use(ToggleButton)
Vue.use(LocationRedirect)
Vue.use(Metas)
Vue.use(TogglePassword)
Vue.use(fullscreen)

window.Promise = Promise

/* eslint-disable */
Vue.filter('slugify', (text) => {
  return text.toLowerCase()
     .replace(/\s+/g, '-')
     .replace(/[^\w\-]+/g, '')
     .replace(/\-\-+/g, '-')
     .replace(/^-+/, '')
     .replace(/-+$/, '')
})

// kick off the polyfill!
// Documentation: http://iamdustan.com/smoothscroll/
smoothscroll.polyfill()

// Router START here
const router = new VueRouter({
  routes: Routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    let toPosition = null

    if (savedPosition) {
      toPosition = savedPosition
    } else {
      toPosition = { x: 0, y: 0 }
    }

    // console.log('toPosition: ', toPosition)

    return toPosition
  }
})

// Global before guards are called in creation order, whenever a navigation is triggered.
router.beforeEach((to, from, next) => {
  // Check if the user is logged or not
  /*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
  // const currentUser = localStorage.getItem('user')
  // !== null ? JSON.parse(localStorage.getItem('user')) : null
  if (to.matched.some(record => record.meta.authRequired)) {
    next()
  } else {
    next()
  }
})

// scroll to top of a page after routing
router.afterEach(() => {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 100)
})

// Only use GA on master
const host = window.location.host.split('.')[0]

if (
  (host.indexOf('localhost') >= 0) ||
  (host.indexOf('develop') >= 0) ||
  (host.indexOf('stage') >= 0)
) {
  // Google Analytics
  if (Settings.googleAnalytics.production !== '') {
    // console.log('analytics')
    Vue.use(VueAnalytics, {
      id: Settings.googleAnalytics.production,
      router
    })
  }

  // Sentry
  // Raven
    // .config('https://f3272746c6a346e4a3ba4eff9eecbb1e@sentry.io/1234082')
    // .addPlugin(RavenVue, Vue)
    // .install()
}

Vue.config.productionTip = false

/* eslint-disable */
window.Event = new Vue()


/* eslint-disable */
if (document.getElementById('app')) {
  new Vue({
    el: '#app',
    render: h => h(App),
    router,
    data () {
      return {
        StaticData,
        Translation,
        Settings,
        SoundsData,
        router,
        bgimage: '',
        windowWidth: 0,
        path: '/',
        host: window.location.host.split('.')[0]
      }
    },
    created () {
      // in case we have additional languages we need to improve this
      this.getTranslation()

      // console.log('Translation: ', this.Translation)
      this.checkServiceWorkers()
    },
    mounted () {
      // console.log('main.js - mounted')
      // api.getToken()

      // Get the current viewport width
      this.$nextTick = () => {
        window.addEventListener('resize', this.getWindowWidth)

        // Init
        this.getWindowWidth()
      }
    },
    beforeUpdate () {
      // Init
      this.getWindowWidth()
    },
    methods: {
      getWindowWidth (event) {
        this.windowWidth = document.documentElement.clientWidth

        // console.log('this.windowWidth: ', this.windowWidth)
      },
      getTranslation () {
        // Call api for some local data
        let content = api.getLanguePack('en')

        this.Translation = content
      },
      // PWA stuff
      checkServiceWorkers () {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .register('/service-worker.js')
            .then(() => {
              console.warn('Service Worker registered')
            })
        }
      }
    }
  })
}