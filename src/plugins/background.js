const background = {
  install (Vue, options) {
    const setVue = Vue
    setVue.prototype.$setBackground = (bgimage, bgurl) => {
      // console.log('bgimage: ', bgimage)
      // console.log('bgurl: ', bgurl)

      const body = document.getElementsByTagName('body')[0]
      if (bgimage) {
        body.classList.remove('background-default')
        body.style.background = `url(${bgurl})`
        body.style.backgroundSize = 'cover'
        body.style.backgroundAttachment = 'fixed'
        body.style.backgroundRepeat = 'no-repeat'
      } else {
        body.classList.add('background-default')
      }
    }
  }
}

// Usage example:
// {{ $setBackground(page.background, page.backgroundUrl) }}
export default background
