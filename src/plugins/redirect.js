const redirectUrl = {
  install (Vue, options) {
    const setVue = Vue
    setVue.prototype.$locationRedirect = (vm, url, target) => {
      if (url) {
        const urlTest = url.includes('http')
        // console.log('redirector: ', url, target)

        // Redirect to the requested page
        if (!urlTest) {
          // console.log('urlTest: ', url)
          const newUrl = `${url}`
          // console.log('newUrl: ', newUrl)
          vm.$router.push({ path: `${newUrl}` })
          vm.$forceUpdate()
        } else {
          window.open(url, target).focus()
        }
      }
    }
  }
}

// Usage example:
// this.$locationRedirect(vm, url, target)
export default redirectUrl
