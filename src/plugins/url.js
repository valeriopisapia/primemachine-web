const createUrl = {
  install (Vue, options) {
    const setVue = Vue
    setVue.prototype.$urlBeautify = (item) => {
      // Create a pretty URL (including some title info)
      const res = encodeURI(item.replace(/[^\w\s]/gi, '').replace(/[\s]/gi, '-').toLowerCase())
      return res
    }
  }
}

// Usage example:
// {{ $urlBeautify(article.title) }}
export default createUrl
