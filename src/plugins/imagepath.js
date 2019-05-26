const imagePath = {
  install (Vue, options) {
    const setVue = Vue
    setVue.prototype.$getImagePath = (path, image) => {
      // Get the physical image path
      const imgSrc = `${path}/${image}`
      // console.log('imgSrc: ', imgSrc)
      return require('@/assets/' + imgSrc)
    }
  }
}

// Usage example:
// {{ $getImagePath('images', 'icon_facebook.svg') }}
export default imagePath
