<script>
export default {
  methods: {
    cleanContent (string) {
      let str = string
      // setup
      const downloadUrlDevelop = 'https://bw-football-contentful-dev.appspot.com/contentful/download'
      const downloadUrlProduction = 'https://bw-football-contentful.appspot.com/contentful/download'
      const host = window.location.host.split('.')[0]

      let downloadUrl = ''
      downloadUrl = (host.indexOf('localhost') >= 0 || host.indexOf('develop') >= 0) ? downloadUrlDevelop : downloadUrlProduction

      // regex patterns
      // const regCleanSpaces = /&nbsp;/gi
      const regCleanAlign = /\salign="(\w+?)"/gi
      const regCleanStyles = /\sstyle="(.+?)"/gi
      const regCleanImg = /<img\s+[^>]*src="([^"]*)"[^>]*>/gi
      const regCleanHeadlines = /<h([1-6].*?)>(.*?)<\/h([1-6])>/gi
      const regRepEntry = /wfv\:\/\/entry\/article\/(\w+)/gi
      const regRepAsset = /wfv:\/\/asset\/(\w+)/gi
      const regRepUrl = /href="([^"]*)"/gi

      // clean HTML
      // str = str.replace(regCleanSpaces, '')
      str = str.replace(regCleanAlign, '')
      str = str.replace(regCleanStyles, '')
      str = str.replace(regCleanImg, '')
      str = str.replace(regCleanHeadlines, '<strong>$1</strong>')

      // convert internal links
      str = str.replace(regRepEntry, '#/artikel/foo/$1/1')
      // convert download links
      str = str.replace(regRepAsset, `${downloadUrl}/$1`)
      // add class to content links
      str = str.replace(regRepUrl, 'href="$1" class="content__link"')

      return str
    },
    clearAttr (string, attrs) {
      let str = string
      const reg = /<\s*(\w+).*?>/gm
      const reg2 = /\s*(\w+)=\"[^\"]+\"/gm

      str = str.replace(reg, (match, i) => {
        const r = match.replace(reg2, (match1, i1) => {
          const m = reg2.exec(match1)

          if (m !== null) {
            if (attrs.indexOf(m[1]) >= 0) {
              return match
            }
          }
          return ''
        })
        return r
      })
      return str
    },
    cleanArray (actual) {
      const newArray = []
      let i
      for (i = 0; i < actual.length; i += 1) {
        if (actual[i]) {
          newArray.push(actual[i])
        }
      }
      return newArray
    },
    translatePlaceholder (key, value, lang) {
      // console.log('translatePlaceholder: ', key, value, lang)
      let ret = ''

      if (!lang) {
        lang = 'en'
      }
      if (key && value) {
        const regReplace = /%/gi
        let rep = value.replace(regReplace, '')
        ret = this.$getTrans(rep, lang, key)

        // console.log('ret: ', ret)
      }
      return ret
    }
  }
}
</script>
