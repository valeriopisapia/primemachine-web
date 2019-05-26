const togglePass = {
  install (Vue, options) {
    const setVue = Vue
    setVue.prototype.$togglePassword = (element) => {
      if (element) {
        // Toogle password
        const passwordField = document.querySelectorAll(`${element}`)
        for (let i = 0; i < passwordField.length; i += 1) {
          if (passwordField[i].getAttribute('type') === 'password') {
            passwordField[i].setAttribute('type', 'text')
          } else {
            passwordField[i].setAttribute('type', 'password')
          }
        }
      }
    }
  }
}

// Usage example:
// {{ $togglePassword('password') }}
export default togglePass
