<template v-cloak>
  <v-toolbar
    app
    fixed
    :clipped-left="clipped"
    dark
    class="sw-toolbar__container"
  >
    <v-toolbar-side-icon
      v-if="settings.showToggle"
      @click.stop="toggleDrawer(drawer = !drawer)"></v-toolbar-side-icon>
     <img :src="$getImagePath('images', 'prime_l.png')" alt="Logo" width="150" />
    <v-spacer></v-spacer>

    <!-- <v-menu bottom left>
      <v-btn
        slot="activator"
        dark
        icon>
      <v-avatar class="sw-toolbar__avatar">
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
      </v-avatar>
      </v-btn>

      <v-list>
        <v-list-tile
          v-for="(item, i) in dropdownMenu"
          :key="i"
          @click="fireAction(item.action)">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu> -->

  </v-toolbar>
</template>

<script>
import api from '@/api'
import EventBus from '@/eventbus'

export default {
  name: 'NavigationDrawer',
  props: [

  ],
  data () {
    return {
      settings: this.$root.$data.Settings.toolbar,
      drawer: true,
      clipped: true,
      fixed: false,
      title: this.$root.$data.Translation.title,
      dropdownMenu: [
        {
          title: 'Log out',
          action: 'logout'
        }
      ]
    }
  },
  mounted () {
    const vm = this
    const host = vm.$root.host
    const eb = EventBus

    // console.log('listingType: ', vm.listingType)
    // console.log('userListListing: ', vm.listingContent)

    // eb.$on('catchSomeStuff', emitResults => {
    //   // console.log('catchSomeStuff: ', emitResults)
    //   if (emitResults) {
    //     console.log('catchSomeStuff: ', emitResults)
    //   }
    // })
  },
  methods: {
    toggleDrawer (key) {
      // console.log('toggleDrawer: ', key)
      EventBus.$emit('drawer', key)
    },
    fireAction (action) {
      console.log('fireAction: ', action)
    }
  }
}
</script>