<template>
<v-dialog v-model="action.visible" :persistent="_persistent">
  <v-card class="sw-modal__card">
    <v-card-title class="headline sw-modal__card--title">{{ i18n.modal.title }}</v-card-title>

    <v-card-text class="sw-modal__card--text">
      {{ i18n.modal.text }}
    </v-card-text>

    <v-card-text class="sw-modal__card--citation">

    </v-card-text>

    <v-card-actions class="sw-modal__card--actions">
      <v-spacer></v-spacer>

      <v-btn class="sw-newcampaigns__footer--back" flat="flat" @click.stop="visible = false; action = { visible: false, action: 'cancel'};">
        {{ translatePlaceholder('button', 'cancel', 'en') }}
      </v-btn>

      <v-btn class="sw-newcampaigns__footer--next" @click.stop="visible = false; action = { visible: false, action: 'sent'};">
        {{ i18n.modal.send }}
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import cleanerMixin from '@/mixins/cleanerMixin'
import EventBus from '@/eventbus'

export default {
  name: "ModalComponent",
  mixins: [cleanerMixin],
  props: ['dialog', 'context', 'persistent'],
  data() {
    return {
      i18n: null,
      action: {
        visible: false,
        action: null
      },
      _persistent: false
    }
  },
  watch: {
    action: (obj) => {
      const vm = this
      EventBus.$emit('dialogChange', {
        visible: obj.visible,
        action: obj.action
      })
    }
  },
  created() {
    const vm = this

    vm.action.visible = vm.dialog
    vm._persistent = !!vm.persistent ? vm.persistent : false
    vm.i18n = vm.$root.$data.Translation[vm.context]
  },
  updated() {
    const vm = this
    vm.action = {
      visible: false,
      action: 'cancel'
    }
  }
}
</script>
