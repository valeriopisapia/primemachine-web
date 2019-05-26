/**
 * Getting the firebase configuration
 * */

const host = window.location.host.split('.')[0]
let firebaseMainConfig = null

const firebaseConfigDevelop = {
  apiKey: 'AIzaSyC7ZqtM7KmJIGG_9mKyr8NJLEM3SoL04RU',
  authDomain: 'stanwood-crm-dev.firebaseapp.com',
  databaseURL: 'https://stanwood-crm-dev.firebaseio.com',
  projectId: 'stanwood-crm-dev',
  storageBucket: 'stanwood-crm-dev.appspot.com',
  messagingSenderId: '879156665448'
}

const firebaseConfigStage = {
  apiKey: 'AIzaSyC7ZqtM7KmJIGG_9mKyr8NJLEM3SoL04RU',
  authDomain: 'stanwood-crm-dev.firebaseapp.com',
  databaseURL: 'https://stanwood-crm-dev.firebaseio.com',
  projectId: 'stanwood-crm-dev',
  storageBucket: 'stanwood-crm-dev.appspot.com',
  messagingSenderId: '879156665448'
}

const firebaseConfigProduction = {
  apiKey: 'AIzaSyDZQFMyoH7FAs1-qMWyVTHVpYBB5vNmxts',
  authDomain: 'stanwood-crm.firebaseapp.com',
  databaseURL: 'https://stanwood-crm.firebaseio.com',
  projectId: 'stanwood-crm',
  storageBucket: 'stanwood-crm.appspot.com',
  messagingSenderId: '991468360642'
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
