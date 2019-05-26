/* eslint-disable */
// https://gist.github.com/hayageek/4584508
export default {
    install: (Vue, options) => {
        const setVue = Vue
        setVue.prototype.$shortUrl = {
            makeShortUrl: (url) => {
                console.log(url)
                const request = gapi.client.urlshortener.url.insert({
                    'resource': {
                        'longUrl': url
                    }
                })
                
                request.execute((response) => {

                    if (response.id != null) {
                        console.log(url, response.id)

                        return response.id
                    }
                    else {
                        console.error("error: creating short url")
                        return null
                    }

                })
            },
            getShortInfo: (url) => {
                const request = gapi.client.urlshortener.url.get({
                    'shortUrl': url,
                    'projection': 'FULL'
                })

                request.execute((response) => {

                    if (response.longUrl != null) {
                        console.log(response.longUrl, response)
                    }
                    else {
                        console.error("error: unable to get URL information")
                    }

                })
            },
            load: () => {
                gapi.client.setApiKey('AIzaSyD6ORvEezMYWyInXH69LJXq8ylprD1tMmQ'); //get your ownn Browser API KEY
                gapi.client.load('urlshortener', 'v1', () => { })
            }
        }
    }
}