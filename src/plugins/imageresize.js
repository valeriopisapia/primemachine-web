const imageResize = {
  install (Vue, options) {
    const setVue = Vue
    setVue.prototype.$imageResize = (asset, width) => {
      let w = 0
      let res = ''
      let setWidth = 0

      // console.log('asset: ', asset)
      // console.log('width: ', width)
      // Return the resized image
      if (width === null) {
        setWidth = 300
      }

      if (width > 2000) {
        setWidth = 1000
      }

      if (asset && setWidth) {
        w = Math.round(width)
        res = `${asset}?w=${w}`
      } else {
        res = ''
      }

      return res
    }
  }
}

// Usage example:
// {{ $imageResize('test.png', 500) }}
export default imageResize
