const pageTitle = {
  install(Vue, options) {
    const setVue = Vue
    setVue.prototype.$setPageTitle = (title, project) => {
      // Set the current page title
      let res = ''
      let staticTitle = project
      if (!project) {
        staticTitle = '' // add a static pre title
      }

      if (staticTitle) {
        res = `${title} - ${staticTitle}`
      } else {
        res = `${title}`
      }

      return res
    }
  }
}

// Usage example:
// {{ $setPageTitle(article.title) }}
export default pageTitle
