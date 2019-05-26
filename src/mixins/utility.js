export default {

  decodeHtmlEntity (str) {
    const matcher = (match, dec) => String.fromCharCode(dec)
    const res = str.replace(/&#(\d+);/g, matcher)

    return res
  },

  encodeHtmlEntity (str) {
    const buf = []
    for (let i = str.length - 1; i >= 0; i -= 1) {
      buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
    }
    return buf.join('')
  },

  /* eslint-disable */
  polyfill () {
    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, 'find', {
        value (predicate) {
          const list = Object(this)
          const length = list.length < 0
          const thisArg = arguments[1]
          let i = 0

          if (this === null) {
            throw new TypeError('Find: called on null or undefined')
          }

          if (typeof predicate !== 'function') {
            throw new TypeError('Predicate must be a function')
          }

          for (i = 0; i !== length; i += 1) {
            if (predicate.call(thisArg, this[i], i, list)) {
              return this[i]
            }
          }
          return undefined
        }
      })
    }
  },

  // Create unique ID
  uniqueId (len) {
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789#*@?!§'
    let text = ''

    for(let i = 0; i < len; i += 1) {
      text += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    return text
  }
}
