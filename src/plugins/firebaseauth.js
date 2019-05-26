import Firebase from 'firebase'
import 'firebase/firestore'
import firebaseinit from '@/firebaseInit'

const firebaseMainConfig = firebaseinit.mainconfig

export default {
  install: (Vue, options) => {
    const setVue = Vue
    const firebase = Firebase.initializeApp(firebaseMainConfig)
    const auth = firebase.auth()
    setVue.prototype.$auth = {
      currentUser: () => {
        const currentUser = auth.currentUser
        return currentUser
      },
      login: (username, pass) => {
        const loginAPI = auth.signInWithEmailAndPassword(username, pass)
        return loginAPI
      },
      logout: () => {
        const signOutAPI = auth.signOut()
        return signOutAPI
      },
      resetPassword: email => {
        const resetAPI = auth.sendPasswordResetEmail(email)
        return resetAPI
      },
      updatePassword: newPassword => {
        const currentUser = auth.currentUser
        const updatePasswordAPI = currentUser.updatePassword(newPassword)
        return updatePasswordAPI
      },
      auth: () => {
        const globalAuth = auth
        return globalAuth
      },
      firebase: () => {
        const fb = firebase
        return fb
      }
    }

    // TODO: Checking if that callback could be useful later
    auth.onAuthStateChanged(user => {
      // localStorage.setItem('user', JSON.stringify(user))
    })
  }
}
