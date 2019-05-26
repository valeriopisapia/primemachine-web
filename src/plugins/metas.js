import Meta from 'vue-meta' // https://github.com/declandewet/vue-meta

const metas = {
  install (Vue, options) {
    const setVue = Vue

    setVue
      .use(Meta)
      .prototype.$pageMeta = (objMeta, objConfig) => {
        const meta = []

        if (objMeta.keywords) {
          meta.push({ vmid: 'keywords', name: 'keywords', content: objMeta.keywords })
        }
        if (objMeta.description) {
          meta.push({ vmid: 'description', name: 'description', content: objMeta.description })
        }

        // OpenGraph data (Most widely used, e.g.: Facebook, Pinterest, LinkedIn & Google+)
        // The list of types is available here: http://ogp.me/#types
        if (objConfig.openGraph) {
          if (objMeta.title) {
            meta.push({ vmid: 'og:title', property: 'og:title', content: objMeta.title })
          }
          if (objMeta.description) {
            meta.push({ vmid: 'og:description', property: 'og:description', content: objMeta.description })
          }
          if (objMeta.sitename) {
            meta.push({ vmid: 'og:site_name', property: 'og:site_name', content: objMeta.sitename })
          }
          if (objMeta.type) {
            meta.push({ vmid: 'og:type', property: 'og:type', content: objMeta.type })
          }
          if (objMeta.url) {
            // Should the the same as your canonical link, e.g.: `https://www.my-site.com/my-special-page`
            meta.push({ vmid: 'og:url', property: 'og:url', content: objMeta.url })
          }
          if (objMeta.locale) {
            meta.push({ vmid: 'og:locale', property: 'og:locale', content: objMeta.locale })
          }
          if (objMeta.admins) {
            meta.push({ vmid: 'fb:admins', property: 'fb:admins', content: objMeta.admins })
          }
          if (objMeta.image) {
            meta.push({ vmid: 'og:image', property: 'og:image', content: objMeta.image })
          }
          if (objMeta.image_secure_url) {
            meta.push({ vmid: 'og:image:secure_url', property: 'og:image:secure_url', content: objMeta.image_secure_url })
          }
          if (objMeta.image_type) {
            meta.push({ vmid: 'og:image:type', property: 'og:image:type', content: objMeta.image_type })
          }
          if (objMeta.image_width) {
            meta.push({ vmid: 'og:image:width', property: 'og:image:width', content: objMeta.image_width })
          }
          if (objMeta.image_height) {
            meta.push({ vmid: 'og:image:height', property: 'og:image:height', content: objMeta.image_height })
          }
          if (objMeta.image_alt) {
            meta.push({ vmid: 'og:image:alt', property: 'og:image:alt', content: objMeta.image_alt })
          }
        }

        // Twitter
        if (objConfig.twitter) {
          // Twitter card
          if (objMeta.tcard) {
            meta.push({ vmid: 'twitter:card', name: 'twitter:card', content: objMeta.tcard })
          }
          if (objMeta.url) {
            meta.push({ vmid: 'twitter:site', name: 'twitter:site', content: objMeta.url })
          }
          if (objMeta.title) {
            meta.push({ vmid: 'twitter:title', name: 'twitter:title', content: objMeta.title })
          }
          if (objMeta.description) {
            meta.push({ vmid: 'twitter:description', name: 'twitter:description', content: objMeta.description })
          }
          // Your twitter handle, if you have one.
          if (objMeta.tcreator) {
            meta.push({ vmid: 'twitter:creator', name: 'twitter:creator', content: objMeta.tcreator })
          }
          if (objMeta.imagesrc) {
            meta.push({ vmid: 'twitter:image:src', name: 'twitter:image:src', content: objMeta.imagesrc })
          }
        }

        // Google / Schema.org
        if (objConfig.schema) {
          if (objMeta.title) {
            meta.push({ vmid: 'schema:org:title', itemprop: 'name', content: objMeta.title })
          }
          if (objMeta.description) {
            meta.push({ vmid: 'schema:org:description', itemprop: 'description', content: objMeta.description })
          }
          if (objMeta.imagesrc) {
            meta.push({ vmid: 'schema:org:image:src', itemprop: 'image', content: objMeta.imagesrc })
          }
        }

        return meta
      }
  }
}

// Usage example:
// export default {
//   data () {
//     return {
//       titleMain: null,
//       meta: {
//         title: null,
//         keywords: null,
//         description: null,
//         imagesrc: null,
//         sitename: null,
//         type: null,
//         url: null,
//         tcard: null,
//         tcreator: null
//       },
//       metaConfig: {
//         openGraph: true,
//         twitter: true,
//         schema: true
//       }
//     }
//   },
//   metaInfo () {
//     return {
//       meta: this.$pageMeta(this.meta, this.metaConfig)
//     }
//   },
//   mounted () {
//     this.getMetaData()
//   },
//   methods: {
//     getMetaData () {
//       const vm = this
//       const curPage = window.location.href
//
//       // set some API call if your daza should be dynamic and assign the results
//       // to the keys belowor just use static data like in the example below
//
//       // Default
//       vm.meta.title = 'Your Project Name'
//       vm.meta.keywords = 'keyword1, keyword2'
//       vm.meta.description = 'I am a meta description'
//       vm.meta.imagesrc = 'http://via.placeholder.com/350x150'
//       // OpenGraph
//       vm.meta.sitename = 'Your Project Name'
//       vm.meta.type = 'website'
//       vm.meta.url = curPage
//       // Twitter
//       vm.meta.tcard = 'summary'
//       vm.meta.tcreator = '@YourTwitterHandle'
//     }
//   }
// }

export default metas
