# Prime Machine v.1.0.0
Prime Machine is an experimental drum machine built using Vuejs and the web audio api.
* PWA supported: you can saved to your device's homescreen and used offline.
* Firebase supported: it's configured to work on firebase, if you want to test it on live.

#
## Main features
* Polymeters: lets you create dynamic polymetric drum patterns by adding and removing quarter-beats from individual tracks while the composition is playing (At the moment it's disabled becusa I noticed that it's not really responsive on mobile)
* Probability: lets you adjust the probability that any individual track's sounds will be played 
* Overrides: some drums are not typically played at the same time as others within conventional drum beats. By allowing you to prioritize certain sounds over others, you can make sure collisions don't take place as polymetric track relationships permutate over time.
# 
## Drum Patterns 
Thanks to [Smokeyloops](https://www.smokeyloops.com) for the awesome drum patterns.
#
### Used stack / Third Party

> - [Vue.js 2](https://vuejs.org/)
> - [Vuetifyjs 1](https://vuetifyjs.com/)
> - [Browserlist](https://github.com/browserslist/browserslist)
> - [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## Content
* [Setup](#setup)

## Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
#
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## TODOs List
* Migration to Vuejs 3.x
* Improve the performance on mobile
