<template lang="html">
  <sw-content />
</template>

<script>
import Content from '@/pages/user/Content'

import api from '@/api'
import EventBus from '@/eventbus'

export default {
  name: 'User',
  components: {
    'sw-content': Content
  },
  data () {
    return {

    }
  },
  mounted () {
    const vm = this
    const host = vm.$root.host
    const eb = EventBus

    eb.$on('catchSomeStuff', emitResults => {
      // console.log('catchSomeStuff: ', emitResults)
      if (emitResults) {
        console.log('catchSomeStuff: ', emitResults)
      }
    })
  },
  methods: {
  }
}
</script>
