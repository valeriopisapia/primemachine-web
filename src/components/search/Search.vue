<template>
  <v-form>
    <v-container ma-0 pa-0>
      <v-layout row wrap class="sw-search__form">

        <v-flex xs4 ma-0 pa-0 class="sw-search__subheader--container">
          <v-subheader ma-0 pa-0 class="sw-search__subheader--text">Users</v-subheader>
        </v-flex>

        <v-flex xs8 ma-0 pa-0 class="sw-search__input">
          <v-text-field
            label="Search"
            append-icon="search"
            clear-icon="clear"
            clearable
            class="sw-icon__search"
            v-model="search"
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  // data: () => ({
  //   search: null
  // }),
  data () {
    return {
      search: null
    }
  },
  // computed: {
  //   search () {
  //     return this.search
  //   }
  // },
  methods: {
    sendMessage () {
      this.clearMessage()
    },
    clearMessage () {
      this.message = ''
    }
  }
}
</script>