<template v-cloak>
  <v-card xs12>
      <v-card-title class="sw-card__item--header">
        <span class="sw-card__item--title">{{ i18n.title }}</span>
        <!--<v-text-field
          v-model="search"
          append-icon="search"
          :label="i18n.placeholder"
          single-line
          hide-details
          class="sw-card__item--search"
        ></v-text-field>-->
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :headers="listingHeaders"
        :items="listingContent"
        :search="search"
        :loading="true"
        :rows-per-page-items="[1,5,10,{'text':'All','value':-1}]"
        class="sw-listing__fixed"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <td class="sw-listing__item--left" @click="selectUser(props.item.key)">
            {{ props.item.title }}
          </td>
          <td class="sw-listing__header__schedule">
             {{ !!props.item.start ? formatDate(props.item.start) : '' }}  {{ !!props.item.end ? formatDate(props.item.end) : '' }}
          </td>
          <td class="sw-listing__header__active">
            <toggle-button
              v-model="props.item.active"
              :value="true"
              :sync="true"
              :disabled="true"
            />
          </td>
          <td class="sw-listing__header__author">
            {{ props.item.author.name }}
          </td>
          <td class="sw-listing__header__messages">{{ props.item.messages.sent }}</td>
          <td class="sw-listing__header__messages">{{ props.item.messages.open }}</td>
          <td class="sw-listing__header__messages">{{ props.item.messages.converted }}</td>
          <td>
             <v-menu bottom left>
                <v-btn
                  slot="activator"
                  light
                  icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>

                <v-list>
                  <v-list-tile
                    v-for="(item, i) in dropdownMenu"
                    :key="i"
                    @click="fireAction(item.action)">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
          </td>
          <!--<td class="sw-listing__item--left" @click="selectUser(props.item.key)">{{ props.item.user }}</td>
          <td class="text-xs-right sw-listing__item--middle">
            {{ formatDate(props.item.lastInteraction) }}
          </td>
          <td class="text-xs-right sw-listing__item--right">

            <v-menu
              nudge-bottom="5px"
              nudge-left="105px">
              <v-btn
                slot="activator"
                dark
                icon>
                <v-icon class="sw-listing__icon--more">more_vert</v-icon>
              </v-btn>

              <v-list class="sw-dropdown__menu">
                <v-list-tile
                  @click="showDelete(props.item.key)">
                  <v-list-tile-title>{{ i18n.delete }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>

          </td>-->
        </template>

        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          {{ i18n.alert }} "{{ search }}".
        </v-alert>

        <!--<v-alert slot="no-data" :value="true" color="error" icon="warning">
          {{ i18n.alert }}.
        </v-alert>-->

        <template slot="pageText" slot-scope="props">
          {{ props.pageStart }} - {{ props.pageStop }} {{ i18n.of }} {{ props.itemsLength }}
        </template>

      </v-data-table>
   
    <!-- Add button -->
    <div>
      <template>
        <v-btn
          medium
          absolute
          bottom
          right
          fab
          class="sw-button__user--add"
          @click="addItem(listingType)">
          <v-icon light>add</v-icon>
        </v-btn>
      </template>
    </div>
    <!--// Add button -->

  </v-card>
</template>

<script>
import api from '@/api'
import EventBus from '@/eventbus'

import dateMixin from '@/mixins/dateMixin'

export default {
  name: 'Listing',
  mixins: [
    dateMixin
  ],
  props: [
    'listingContent',
    'listingType',
    'listingHeaders'
  ],
  data () {
    return {
      search: '',
      i18n: this.$root.$data.Translation.search,
      items: [
        { title: 'Delete' }
      ],
      dropdownMenu: [
        {
          title: 'Delete',
          action: 'remove'
        }
      ]
    }
  },
  mounted () {
    const vm = this
    const host = vm.$root.host
    const eb = EventBus

    if (this.listingType === 'campaigns') {
      this.i18n = this.$root.$data.Translation.navigation.crm.campaigns
    }
    // console.log('listingType: ', vm.listingType)
    // console.log('listingContent: ', vm.listingContent)

    // eb.$on('catchSomeStuff', emitResults => {
    //   // console.log('catchSomeStuff: ', emitResults)
    //   if (emitResults) {
    //     console.log('catchSomeStuff: ', emitResults)
    //   }
    // })
  },
  methods: {
    fireAction (action) {
      console.log('fireAction: ', action)
      if (sction === 'remove') {
        // TODO: Add confirm modal then call remove api
      }
    },
    selectUser (key) {
      EventBus.$emit('currentUser', key)
    },
    getClassName (selector) {
      let ret = 'sw-button__user--add'
      if (selector) {
        ret = `sw-button__${selector}--add`
      }
      return ret
    },
    showDelete (id) {
      console.log('showDelete: ', id)
    },
    addItem (selector) {
      const vm = this
      if (selector === 'campaigns') {
        const link = 'newcampaigns'
        vm.$router.push({ name: `${link}` })
      }
    }
  }
}
</script>