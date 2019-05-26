<template lang="html">
  <v-container
    fluid
    ma-0
    pa-0>
    <v-layout row wrap class="sw-main__container">

      <!-- User List -->
      <v-flex xs4 class="sw-column">
        <v-card class="sw-card__container">

          <v-card-text ma-0 pa-0 class="sw-card__item--datatables">
            <sw-listing
              :listingContent="userList"
              :listingHeaders="headers.user"
              listingType="user"></sw-listing>
          </v-card-text>

        </v-card>
      </v-flex>
      <!--// User List -->

      <!-- User Detail + Document List -->
      <v-flex xs4 class="sw-column">
        <v-card class="sw-card__container">

          <div class="sw-document__userinfo">
            <div class="sw-document__userinfo--image"></div>
            <div class="sw-document__userinfo--text"></div>
          </div>
          <v-card-text class="sw-card__item sw-title__middle">
            <v-container ma-0 pa-0>
              <v-layout row wrap class="sw-search__form">

                <v-flex xs4 ma-0 pa-0 class="sw-search__subheader--container">
                  <v-subheader ma-0 pa-0 class="sw-search__subheader--text">Documents</v-subheader>
                </v-flex>

              </v-layout>
            </v-container>

            <v-divider ma-0 pa-0 class="sw-divider"></v-divider>
          </v-card-text>

          <sw-listing
            v-if="currentUser"
            :listingContent="currentUser"
            :listingHeaders="headers.documents"
            listingType="document"></sw-listing>

          <v-card-text ma-0 pa-0 class="sw-card__item--scroll">
          </v-card-text>
        </v-card>
      </v-flex>
      <!--// User Detail + Document List -->

      <!-- Document Detail -->
      <v-flex xs4 class="sw-column">
        <v-card class="sw-card__container">
          <v-card-text>Document Detail</v-card-text>
        </v-card>
      </v-flex>
      <!--// Document Detail -->

    </v-layout>
  </v-container>

</template>

<script>
import Search from '@/components/search/Search'
import Listing from '@/components/listing/Listing'

import api from '@/api'
import EventBus from '@/eventbus'

export default {
  name: 'Content',
  components: {
    'sw-search': Search,
    'sw-listing': Listing
  },
  data () {
    return {
      userList: null,
      currentUser: null,
      headers: {
        user: [
          {
            text: 'Name',
            value: 'user',
            align: 'left',
            sortable: false
          },
          {
            text: 'Last Interaction',
            value: 'lastInteraction',
            align: 'right',
            class: 'sw-listing__header--right',
            sortable: false
          }
        ],
        documents: [
          {
            text: 'Title',
            value: 'title',
            align: 'left',
            sortable: false
          },
          {
            text: 'Category',
            value: 'category',
            align: 'right',
            class: 'sw-listing__header--right',
            sortable: false
          }
        ]
      }
    }
  },
  mounted () {
    const vm = this
    const host = vm.$root.host
    const eb = EventBus

    vm.getUsers()
    // console.log('userList: ', vm.userList)

    eb.$on('currentUser', emitResults => {
      // console.log('currentUser: ', emitResults)
      if (emitResults) {
        console.log('currentUser: ', emitResults)
        vm.currentUser = emitResults
      }
    })

    // eb.$on('search', emitResults => {
    //   // console.log('search: ', emitResults)
    //   if (emitResults) {
    //     // console.log('search: ', emitResults)
    //   }
    // })
  },
  methods: {
    getUsers () {
      // Call to the user API
      // api.getUsers().then( (data) => {
      //   console.log(data)
      //   const users = data.data
      // }, (error) => {
      //   console.error(error)
      // })

      const users = [
        {
          key: 'agVoZWxsb3IPCxIHQWNjb3VudBiZiwIM', // user ID
          user: 'Max Mustermann',
          lastInteraction: new Date()
        },
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        },
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIM',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
        ,
        {
          key: 'bgVoZWxsb3IPCxIHQWNjb3VudBiZiwIA',
          user: 'Paula Musterfrau',
          lastInteraction: new Date()
        }
      ]

      this.userList = users
    }
  }
}
</script>

<style scoped>
.sw-card__item--scroll {
  top: 0
}
</style>
