<template>
<v-app dark>
  <sw-navigation />
  <sw-toolbar />

  <v-content class="sw-content">
    <router-view/>
  </v-content>
  <button type="button" class="v-btn v-btn--bottom v-btn--floating v-btn--fixed v-btn--right theme--dark sw-bottom-btn"><div class="v-btn__content" @click.prevent="openFeedbackModal"><i aria-hidden="true" class="v-icon material-icons">feedback</i></div></button>
  <div id="popup" v-show="showPopup">
    <div @click.prevent="closePopup" class="popup-close-icon">&times;</div>
    <h4>Add Prime Machine ?</h4>
    <p>Tap above to add an icon to your home screen for quick access!</p>
  </div>
</v-app>
</template>

<script>
import Navigation from '@/components/navigation/Navigation'
import Toolbar from '@/components/toolbar/Toolbar'
import BottomSheet from '@/components/bottomsheet/Bottomsheet'

import EventBus from '@/eventbus'
import api from '@/api'

export default {
  name: 'AppContainer',
  components: {
    'sw-navigation': Navigation,
    'sw-toolbar': Toolbar,
    'sw-bottomsheet': BottomSheet
  },
  data () {
    return {
      showPopup: false
    }
  },
  mounted () {
    const vm = this
    const eb = EventBus

    // console.log('NODE_ENV', process.env.NODE_ENV)
    api.initFirebase()

    eb.$on('logoutbutton', emitResults => {
      // console.log('logoutbutton: ', emitResults)
      if (emitResults) {
        // console.log('logoutbutton: ', emitResults)
        vm.logout()
      }
    })

    // Detects if device is on iOS 
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      console.log(userAgent);
      return /iphone|ipad|ipod/.test(userAgent);
    }
    const getOrientation = () => {
      if (window.innerHeight > window.innerWidth) {
        return 'portrait';
      } else {
        return 'landscape';
      }
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode() && getOrientation() === 'landscape') {
      setTimeout(() => {
        vm.showPopup = true
      }, 2000)
    }
  },
  methods: {
    emitClick () {
      // send the click event to the child
      EventBus.$emit('showSearch', true)
    },
    emitScroll (event) {
      EventBus.$emit('showSearch', true)
    },
    logout () {
      const vm = this
      const link = '/login'
    },
    openFeedbackModal () {
      window.zs_open_window("https://survey.zohopublic.eu/zs/1XBBZA", 648, 700)
    },
    closePopup () {
      const vm = this
      vm.showPopup = false
    }
  }
}
</script>

<style lang="scss">
// Import global custom sass
@import 'sass/main';
</style>
