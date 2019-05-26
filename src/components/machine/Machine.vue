<template>
<main class="drum-machine">
  <form action>
    <h2 class="vh" id="dm-main-heading">Drum Machine Main Controls {{ patternId }}</h2>
    <div class="bpm-and-play" aria-labelledby="dm-main-heading">
      <div class="bpm">
        <div class="bpm-slider">
          <input type="range" id="bpm" min="0" max="240" v-model="pattern.bpm" @blur="link">
        </div>
        <label for="bpm">
            {{ pattern.bpm }}
            <span aria-hidden="true">bpm</span>
            <span class="vh">beats per minute</span>
          </label>
      </div>
      <div class="play-stop">
        <div v-if="false"> <!-- meta.linkUrl" -->
          <i class="fas fa-copy"></i>
          <input id="linkField" :value="meta.linkUrl" type="text" onfocus="this.select()" @focus="link" />
        </div>
        <button @click.prevent="reset" :disabled="meta.isPlaying"><i class="fas fa-undo-alt"></i></button>
        <button :aria-pressed="meta.isPlaying.toString()" @click.prevent="playOrStop" aria-label="play">
            <play-icon></play-icon>
          </button>
      </div>
    </div>
    <div class="tracks" aria-labelledby="dm-tracks-heading">
      <h2 class="vh" id="dm-tracks-heading"></h2>
      <!-- Tracks Legend -->
      <fieldset role="group" :aria-labelledby="sound.name + '-track-legend' | slugify" v-for="sound in sounds" class="track">
        <legend :id="sound.name + '-track-legend' | slugify">{{sound.name}} track</legend>
        <div class="track-main">
          <div class="track-addRemove">
            <button class="open-settings" @click.prevent="sound.expanded = !sound.expanded" :aria-expanded="sound.expanded.toString()" aria-label="settings">
                        <settings-icon></settings-icon>
                        </button>
            <button @click.prevent="sound.muted = !sound.muted" :aria-pressed="sound.muted.toString()" aria-label="mute">
                            <mute-icon></mute-icon>
                        </button>
          </div>
          <div class="track-beats" role="group" :aria-labelledby="sound.name + '-track-label' | slugify">
            <span class="track-label" :id="sound.name + '-track-label' | slugify">
                <span class="vh">{{sound.length}} quarter beats for</span> <strong>{{sound.name}} </strong>
            </span>
            <!-- Track Beats -->
            <div v-for="n in sound.length" :style="{ width: meta.beatsLength }" class="track-beats-others"  :class="{ 'track-beats-black' : (n === 1 || n === 5 || n === 9 || n === 13) }">
              <input type="checkbox" :id="sound.name + '-beat-' + n | slugify" :value="n" v-model="sound.active">
              <label :for="sound.name + '-beat-' + n | slugify" :id="sound.name + '-beat-' + n + '-label' | slugify"><div :class="{ 'track-beats-div': !sound.active.includes(n), 'track-beats-div-checked': sound.active.includes(n) }"></div><span class="vh">Quarter Beat {{n}}</span></label>
            </div>
          </div>
          <div class="track-muteSettings" v-show="false">
            <button aria-label="remove beat" @click.prevent="removeBeat(sound)">
                            <remove-icon></remove-icon>
                        </button>
            <button aria-label="add beat" @click.prevent="addBeat(sound)">
                            <add-icon></add-icon>
                        </button>
          </div>
        </div>
        <!-- Settings Side-->
        <transition name="slide">
          <fieldset role="group" aria-labelledby="track-settings-label" v-if="sound.expanded" class="track-settings">
            <legend id="track-settings-label">Track settings</legend>
            <div class="setting">
              <label for="vol">Volume</label>
              <div>
                <input type="range" id="vol" min="0" max="100" v-model="sound.volume" aria-describedby="vol-desc">
                <span id="vol-desc">From 0 to 100</span>
              </div>
            </div>
            <div class="setting">
              <p aria-hidden="true">Probability</p>
              <div>
                <label for="prob-chance" class="vh">Chance <span class="vh">(probability numerator)</span></label>
                <input type="number" id="prob-chance" min="1" v-model="sound.probability.chance">
                <span aria-hidden="true" class="between">in</span>
                <label for="prob-in" class="vh">In <span class="vh">(probability denominator)</span></label>
                <input type="number" id="prob-in" min="1" v-model="sound.probability.in">
              </div>
            </div>
            <div class="setting" v-if="meta.detuneSupport">
              <label for="fluc">Pitch fluctuation</label>
              <div>
                <input type="range" id="fluc" min="0" max="100" v-model="sound.fluctuationLevel" aria-describedby="fluc-desc">
                <span id="fluc-desc">From 0 to 100</span>
              </div>
            </div>
            <div class="setting">
              <p aria-hidden="true">Overridden sounds</p>
              <div class="checkbox-group">
                <div v-for="otherSound in sounds" v-if="otherSound.name !== sound.name">
                  <input type="checkbox" :id="sound.name + '-overrides-' + otherSound.name | slugify" :value="otherSound.name" v-model="sound.overrides">
                  <label :for="sound.name + '-overrides-' + otherSound.name | slugify">
                      <span class="vh">override</span>
                      {{otherSound.name}}
                    </label>
                </div>
              </div>
            </div>
          </fieldset>
        </transition>
      </fieldset>
      <aside class="stats">
        <h2 class="vh">Drum Machine State Information</h2>
        <p hidden="true">
          Polymetric pattern length: {{meta.compoundLength / 4}} beats ({{meta.compoundLength}} &#x00bc;-beats)
        </p>
        <div hidden="true" class="link-section">
          <div v-if="meta.linkUrl">
            <label for="linkField">Link to your drum pattern:</label>
            <input id="linkField" :value="meta.linkUrl" type="text" onfocus="this.select()" @focus="link" />
          </div>
        </div>
      </aside>
    </div>
  </form>
</main>
</template>

<script>
import api from '@/api'

import PlayIcon from './PlayIcon.vue';
import MuteIcon from './MuteIcon.vue';
import AddIcon from './AddIcon.vue';
import RemoveIcon from './RemoveIcon.vue';
import SettingsIcon from './SettingsIcon.vue';

let defaultState = {
  sounds: [{
    name: 'kick',
    url: './sounds/1.wav',
    buffer: null,
    length: 8,
    current: 1,
    active: [1],
    probability: {
      chance: 1,
      in: 1
    },
    probable: true,
    fluctuationLevel: 0,
    overrides: [],
    volume: 100,
    muted: false,
    expanded: false
  },
  {
    name: 'snare',
    url: './sounds/2.wav',
    buffer: null,
    length: 8,
    current: 1,
    active: [5],
    probability: {
      chance: 1,
      in: 1
    },
    probable: true,
    fluctuationLevel: 40,
    overrides: [],
    volume: 100,
    muted: false,
    expanded: false
  },
  {
    name: 'drop',
    url: './sounds/3.wav',
    buffer: null,
    length: 8,
    current: 1,
    active: [],
    probability: {
      chance: 1,
      in: 1
    },
    probable: true,
    fluctuationLevel: 60,
    overrides: [],
    volume: 100,
    muted: false,
    expanded: false
  },
  {
    name: 'clap',
    url: './sounds/4.wav',
    buffer: null,
    length: 8,
    current: 1,
    active: [1, 3, 5, 7],
    probability: {
      chance: 1,
      in: 1
    },
    probable: true,
    fluctuationLevel: 60,
    overrides: [],
    volume: 80,
    muted: false,
    expanded: false
  },
  {
    name: 'ride',
    url: './sounds/5.wav',
    buffer: null,
    length: 8,
    current: 1,
    active: [1, 5],
    probability: {
      chance: 1,
      in: 1
    },
    probable: true,
    fluctuationLevel: 40,
    overrides: [],
    volume: 100,
    muted: true,
    expanded: false
  },
  {
    name: 'perc',
    url: './sounds/6.wav',
    buffer: null,
    length: 8,
    current: 1,
    active: [1],
    probability: {
      chance: 1,
      in: 4
    },
    probable: true,
    fluctuationLevel: 40,
    overrides: [],
    volume: 90,
    muted: true,
    expanded: false
  },
  {
    name: 'perc2',
    url: './sounds/7.wav',
    buffer: null,
    length: 8,
    current: 1,
    active: [1],
    probability: {
      chance: 1,
      in: 4
    },
    probable: true,
    fluctuationLevel: 40,
    overrides: [],
    volume: 90,
    muted: true,
    expanded: false
  },
  {
    name: 'perc3',
    url: './sounds/8.wav',
    buffer: null,
    length: 8,
    current: 1,
    active: [1],
    probability: {
      chance: 1,
      in: 4
    },
    probable: true,
    fluctuationLevel: 40,
    overrides: [],
    volume: 90,
    muted: true,
    expanded: false
  },
  {
    name: 'perc4',
    url: './sounds/9.wav',
    buffer: null,
    length: 8,
    current: 1,
    active: [1],
    probability: {
      chance: 1,
      in: 4
    },
    probable: true,
    fluctuationLevel: 40,
    overrides: [],
    volume: 90,
    muted: true,
    expanded: false
  },
  {
    name: 'perc5',
    url: './sounds/10.wav',
    buffer: null,
    length: 8,
    current: 1,
    active: [1],
    probability: {
      chance: 1,
      in: 4
    },
    probable: true,
    fluctuationLevel: 40,
    overrides: [],
    volume: 90,
    muted: true,
    expanded: false
  }
  ],
  meta: {
    bpm: 120,
    beatsLength: 8,
    futureTickTime: 0.2,
    isPlaying: false,
    detuneSupport: false,
    linkUrl: null
  }
};

let soundProps = [
  'length',
  'active',
  'probable',
  'probability',
  'overrides',
  'volume',
  'fluctuationLevel',
  'muted'
];

let parseQuery = function (query) {
  if (query.startsWith('?')) {
    var parts = query.substring(1).split('&');
    var params = parts.reduce(function (agg, part) {
      var bits = part.split('=');
      var name = decodeURIComponent(bits[0]);
      var values = agg[name] || [];
      if (bits.length > 1) {
        values.push(decodeURIComponent(bits[1]));
      }
      agg[name] = values;
      return agg;
    }, {});
    return params;
  }
};

export default {
  name: "MachineComponent",
  props: ['patternId'],
  data () {
    return {
      _patternId: 0,
      audioContext: null,
      soundsData: this.$root.$data.SoundsData,
      sounds: null,
      pattern: null,
      meta: {
        bpm: 120,
        isPlaying: false
      },
      path: null
    }
  },
  components: {
    PlayIcon,
    MuteIcon,
    AddIcon,
    RemoveIcon,
    SettingsIcon
  },
  methods: {
    init () {
      const vm = this
      this.path = `../sounds/${this.soundsData.patterns[vm.patternId].patternUrl}/`
      vm.audioContext = vm.audioContextCheck();
      vm.setState();
      // Test for detune method support
      var testBufferResource = vm.audioContext.createBufferSource();
      if (!testBufferResource.detune) {
        vm.meta.detuneSupport = false;
      }
      vm.loadSounds();

      window.requestAnimFrame = (() => {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();
    },
    audioContextCheck () {
      if (typeof AudioContext !== 'undefined') {
        return new AudioContext();
      } else if (typeof webkitAudioContext !== 'undefined') {
        return new webkitAudioContext();
      } else if (typeof mozAudioContext !== 'undefined') {
        return new mozAudioContext();
      } else {
        throw new Error('AudioContext not supported');
      }
    },
    soundLoader (path) {
      const vm = this
      var soundObject = {};

      var getSound = new XMLHttpRequest();
      getSound.open('GET', path, true);
      getSound.responseType = 'arraybuffer';

      getSound.onload = () => {
        vm.audioContext.decodeAudioData(getSound.response, (buffer) => {
          soundObject.soundToPlay = buffer;
        });
      }

      getSound.send();

      soundObject.play = (volumeVal, time, fluctuationLevel, animElem) => {
        var volume = vm.audioContext.createGain();
        volume.gain.value = volumeVal;
        var playSound = vm.audioContext.createBufferSource();
        playSound.buffer = soundObject.soundToPlay;

        // Feature detect detune method
        if (vm.meta.detuneSupport) {
          // Naturalization by fluctuating pitch slightly
          var bend = Math.floor(Math.random() * fluctuationLevel) + -Math.abs(fluctuationLevel);
          playSound.detune.value = bend;
        }

        // Volume control
        playSound.connect(volume);
        volume.connect(vm.audioContext.destination);

        playSound.start(time);

        window.requestAnimFrame(() => {
          vm.pulse(animElem);
        });
      }

      return soundObject;
    },
    loadSounds () {
      const vm = this
      vm.sounds.forEach((sound) => {
        const imageUrl = `${vm.path}${sound.url}`
        sound.buffer = vm.soundLoader(imageUrl)
      });
    },
    setState () {
      // TODO Add the storage 
      /*var storage = this.$localStorage.get('drum-machine-state');

      if (storage) {
          var savedData = JSON.parse(storage);
          this.sounds = savedData.sounds;
          this.meta = savedData.meta;
      } else {
          this.sounds = JSON.parse(JSON.stringify(defaultState.sounds));
          this.meta = JSON.parse(JSON.stringify(defaultState.meta));
      } */

      this.sounds = JSON.parse(JSON.stringify(defaultState.sounds));
      this.meta = JSON.parse(JSON.stringify(defaultState.meta));

      var queryState = parseQuery(window.location.search);
      if (queryState) {
        var params = Object.keys(queryState);
        var state = {
          sounds: [],
          meta: {}
        };
        params.forEach(function (key) {
          if (key === 'bpm') {
            state.meta.bpm = JSON.parse(queryState.bpm[0]);
          } else {
            var sound = JSON.parse(queryState[key][0]);
            sound.name = key;
            state.sounds.push(sound);
          }
        });
        this.updateState(state);
      }

    },
    futureTick () {
      const vm = this
      const noteLength = 60 / vm.pattern.bpm
      vm.meta.futureTickTime += 0.25 * noteLength;

      vm.sounds.forEach((sound) => {
        sound.current++
        if (sound.current > sound.length) {
          sound.current = 1
        }
      })
    },
    scheduleNote () {
      this.sounds.forEach((sound) => {
        sound.probable = this.probability(sound.probability);
      });
      this.sounds.forEach((sound) => {
        console.log('sound', sound);
        this.playOrNot(sound, sound.active.includes(sound.current));
      });
    },
    playOrNot (sound, currentIsActive) {
      if (!currentIsActive) {
        return;
      }

      if (sound.muted) {
        return;
      }

      if (!sound.probable) {
        return;
      }

      var overridden = false;

      this.sounds.forEach((otherSound) => {
        if (otherSound.overrides.includes(sound.name)) {
          if (!otherSound.muted) {
            if (otherSound.probable) {
              if (otherSound.active.includes(otherSound.current)) {
                overridden = true;
              }
            }
          }
        }
      });

      if (overridden) {
        return;
      }

      var soundID = this.slugify(sound.name + '-beat-' + sound.current) + '-label';
      var animElem = document.getElementById(soundID);

      sound.buffer.play(
        sound.volume / 100,
        this.meta.futureTickTime,
        sound.fluctuationLevel,
        animElem
      );

    },
    scheduler () {
      while (this.meta.futureTickTime < this.audioContext.currentTime + 0.1) {
        this.scheduleNote()
        this.futureTick()
      }

      window.t = window.setTimeout(this.scheduler, 1.0)
    },
    probability (ratio) {

      var set = [];

      if (ratio.chance >= ratio.in) {
        return true;
      }

      var i = 0;
      do {
        i += 1;
        set.push(true);
      }
      while (i < ratio.chance);

      var n = 0;
      do {
        n += 1;
        set.push(false);
      }
      while (n < (ratio.in - ratio.chance));

      var playIt = set[Math.floor(Math.random() * set.length)];
      return playIt;
    },
    playOrStop () {
      this.play();
    },
    reset () {
      this.updateState(defaultState);
      if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({
          path: newurl
        }, '', newurl);
      }
      this.meta.linkUrl = null;
    },
    updateState (newState) {
      if (newState.sounds) {
        var soundsByName = newState.sounds.reduce(function (agg, sound) {
          agg[sound.name] = sound;
          return agg;
        }, {});

        this.sounds.forEach(function (sound) {
          var newSound = soundsByName[sound.name];
          soundProps.forEach(function (prop) {
            sound[prop] = JSON.parse(JSON.stringify(newSound[prop]));
          });
          sound['active'] = [];
        });
      }

      if (newState.meta) {
        this.meta.bpm = newState.meta.bpm;
      }
    },
    link () {
      const vm = this
      let parts = ['bpm=' + vm.pattern.bpm];
      vm.sounds.forEach(function (sound) {
        const persisted = soundProps.reduce(function (agg, prop) {
          agg[prop] = sound[prop];
          return agg;
        }, {});
        let part = encodeURIComponent(sound.name) + '=' + encodeURIComponent(JSON.stringify(persisted));
        parts.push(part);
      });

      if (history.pushState) {
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + parts.join('&');
        window.history.pushState({
          path: newUrl
        }, '', newUrl)

        vm.meta.linkUrl = newUrl
        api.cropUrl(newUrl)
          .then((response) => {
            if (response.status === 200) {
              console.log('cropUrl', response);
              this.meta.linkUrl = response.data.data.url
            } else {
              console.log('Opps dude, status code != 200 :( ')
            }
          })
          .catch((error) => {
            console.error('Error! ', error);
          })
      }
    },
    addBeat (sound) {
      if (sound.length < 16) {
        sound.length += 1;
      }
    },
    removeBeat (sound) {
      if (sound.length > 1) {
        sound.length -= 1;
      }
    },
    play () {
      this.meta.isPlaying = !this.meta.isPlaying;

      if (this.meta.isPlaying) {
        this.sounds.forEach((sound) => {
          sound.current = 1;
        });

        this.meta.futureTickTime = this.audioContext.currentTime;
        this.scheduler();
      } else {
        window.clearTimeout(window.t);
        this.saveData();
        this.link();
      }
    },
    lengthInfo () {
      var lengths = [];
      this.sounds.forEach((sound) => {
        lengths.push(sound.length);
      });
      return {
        longest: Math.max.apply(Math, lengths),
        lengths: lengths
      }
    },
    slugify (text) {
      return text.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    },
    pulse (elem) {
      // TODO Add it later
      elem.setAttribute('class', 'pulse-anim');
      window.setTimeout(() => {
        elem.setAttribute('class', '');
      }, 100);
    },
    saveData () {
      var data = {};
      data.sounds = this.sounds;
      data.meta = this.meta;
      this.$localStorage.set('drum-machine-state', JSON.stringify(data));
    }
  },
  watch: {
    sounds: {
      handler () {
        var lengthInfo = this.lengthInfo();
        this.meta.beatsLength = 100 / lengthInfo.longest + '%';
        var uniqueLengths = lengthInfo.lengths.filter((v, i, a) => a.indexOf(v) === i);
        this.meta.compoundLength = uniqueLengths.reduce((a, b) => a * b);
      },
      deep: true
    },
    patternId: function (val) {
      const vm = this
      vm.$forceUpdate();
      console.log('patternId - watch', vm.soundsData.patterns, vm.patternId)
      defaultState.sounds = vm.soundsData.patterns[vm.patternId].sounds
      vm.pattern = vm.soundsData.patterns[vm.patternId]
      window.clearTimeout(window.t);
      vm.meta.isPlaying = false
      vm.init()
    },
  },
  created () {
    const vm = this
    vm._patternId = vm.patternId
    console.log('>> Pattern selected', vm.soundsData.patterns[vm.patternId])
    defaultState.sounds = vm.soundsData.patterns[vm.patternId].sounds
    vm.pattern = vm.soundsData.patterns[vm.patternId]
  },
  mounted () {
    const vm = this
    vm.init()
  },
  destroyed () {
    console.warn('Machine Component - destroyed')
  }
}
</script>
