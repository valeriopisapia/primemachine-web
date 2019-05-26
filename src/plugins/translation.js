// Import static data (translations, etc)
import StaticData from '@/data/i18n.json'

const translation = {
  install (Vue, options) {
    const setVue = Vue
    setVue.prototype.$getTrans = (string, lg, nested) => {
      let trans = ''
      let sns = ''
      let setLg = lg

      if (!lg) {
        setLg = 'en'
      }

      if (!string) {
        trans = 'undefined'
      } else {
        trans = StaticData.translations[setLg][string]

        if (nested) {
          sns = nested.split('.')

          switch (sns.length) {
            case 1:
              trans = StaticData.translations[setLg][nested][string]
              break
            case 2:
              trans = StaticData.translations[setLg][sns[0]][sns[1]][string]
              break
            case 3:
              trans = StaticData.translations[setLg][sns[0]][sns[1]][sns[2]][string]
              break
            case 4:
              trans = StaticData.translations[setLg][sns[0]][sns[1]][sns[2]][sns[3]][string]
              break
            case 5:
              trans = StaticData.translations[setLg][sns[0]][sns[1]][sns[2]][sns[3]][sns[4]][string]
              break
            default:
              trans = 'undefined'
          }
        }
      }
      // console.log('trans: ', trans)

      return trans
    }
  }
}

// Usage example:
// {{ $getTrans('home', 'de') }}
export default translation
