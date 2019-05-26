/**
 * Getting the firebase configuration
 * */

const host = window.location.host.split('.')[0]
let firebaseMainConfig = null

const firebaseConfigDevelop = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}

const firebaseConfigStage = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}

const firebaseConfigProduction = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}

if (
  (host.indexOf('localhost') >= 0) ||
  (host.indexOf('develop') >= 0)
) {
  firebaseMainConfig = firebaseConfigDevelop
} else if (host.indexOf('stage') >= 0) {
  firebaseMainConfig = firebaseConfigStage
} else {
  firebaseMainConfig = firebaseConfigProduction
}

const firebaseApp = {
  mainconfig: firebaseMainConfig
}

export default firebaseApp
