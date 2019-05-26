import axios from 'axios'

// Import static data (translations, etc)
import StaticData from '@/data/i18n.json'

// let host = window.location.host.split('.')[0]
let url = ''
// let bypassCacheParam = ''
let environment = 'production'
let db = 'production'

const config = {
  host: window.location.host.split('.')[0],
  urlDevelop: 'https://',
  urlProduction: 'https://'
}

// Documentation: https://dev.bitly.com/v4_documentation.html
const BITLY_URL = 'https://api-ssl.bitly.com/v3/shorten?'
// const BITLY_LOGIN = 'o_16bd7616ot'
const BITLY_KEY = 'ba9845b5d83074905158e7ea22c8bf7168511546'

if (config.host.indexOf('localhost') >= 0 || config.host.indexOf('develop') >= 0 || config.host.indexOf('stage') >= 0) {
  environment = 'develop'
}
/* eslint-disable */
console.log('environment: ', environment)

// Set databases
db = 'develop'

/* eslint-disable */
console.log('db: ', db)

if (db === 'production') {
  url = config.urlProduction
} else {
  url = environment === 'develop' ? config.urlDevelop : config.urlProduction
  // bypassCacheParam = `&${Date.now()}`
}
/* eslint-disable */
console.log('url: ', url)

export default {
  // Init firebase
  initFirebase() {
    // console.log('initFirebase')
  },
  /**
   * Get language paramaters
   * @param {*} lang
   */
  getLanguePack(lang) {
    const trans = StaticData
    let ret = ''
    /* eslint-disable */
    if (lang === '') {
      lang = 'en'
    }
    ret = trans.translations[lang]

    return ret
  },
  /**
   * https://alpixel.github.io/bitly-vuejs/
   * @param {*} url
   */
  cropUrl(url) {
    url = decodeURIComponent(url)
    return axios.get(BITLY_URL, {
      params: {
        // "format": "json",
        access_token: BITLY_KEY,
        // "login": BITLY_LOGIN,
        longUrl: url
      }
    })
  }
}
