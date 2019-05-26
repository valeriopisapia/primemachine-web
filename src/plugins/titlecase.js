const titlecase = {
  install (Vue, options) {
    const setVue = Vue
    setVue.prototype.$toTitleCase = (str) => {
      const matcher = (txt) => {
        const res = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        return res
      }

      return str.replace(/\w\S*/g, matcher)
    }
  }
}

// Usage example:
// {{ $toTitleCase(str) }}
export default titlecase
