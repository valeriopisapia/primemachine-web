<template v-cloak>
  <v-navigation-drawer
    v-model="drawer"
    persistent
    :mini-variant="miniVariant"
    :clipped="clipped"
    enable-resize-watcher
    app
    dark
    width="250"
  >
  
    <v-list dense>
      <v-list-tile
        class="sw-list__tile--title">
        {{ i18n.title }}
      </v-list-tile>

      <v-list-tile
        v-for="item in patterns.patterns"
        :key="item.name"
        class="sw-list__tile--item"
        @click="showContent(item.id)">

        <v-list-tile-action>
          <i :class="item.icon"></i>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.name }} 
          </v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>
      <div class="sw-navigation__logo" v-show="false">
        <img :src="$getImagePath('images', 'gif_l.gif')" alt="Logo" width="100" />
      </div>
    </v-list>
  
  </v-navigation-drawer>
</template>

<script>
import api from '@/api'
import EventBus from '@/eventbus'

import cleanerMixin from '@/mixins/cleanerMixin'

export default {
  name: 'NavigationDrawer',
  components: {
  
  },
  mixins: [cleanerMixin],
  props: [],
  data () {
    return {
      drawer: true,
      miniVariant: false,
      clipped: true,
      patterns: this.$root.$data.SoundsData,
      i18n: this.$root.$data.Translation.navigation
    }
  },
  mounted () {
    const vm = this
    const host = vm.$root.host
    const eb = EventBus
    
    console.log('patterns', this.patterns)
    // console.log('listingType: ', vm.listingType)
    // console.log('userListListing: ', vm.listingContent)

    // toggle navigation drawer
    eb.$on('drawer', emitResults => {
      console.log('drawer: ', emitResults)
      vm.drawer = emitResults
    })

    // eb.$on('catchSomeStuff', emitResults => {
    //   // console.log('catchSomeStuff: ', emitResults)
    //   if (emitResults) {
    //     console.log('catchSomeStuff: ', emitResults)
    //   }
    // })
  },
  methods: {
    showContent (id) {
      const vm = this
      vm.$router.push({ name: 'pattern', params: {patternId: id} })
    }
  }
}
</script>