<template>
  <div id="app">
    <vMainWrapperVue />
  </div>
</template>

<script>
import vMainWrapperVue from './components/v-main-wrapper';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    vMainWrapperVue
  },
  computed: {
    ...mapGetters([
      'IS_MOBILE',
      'IS_DESKTOP'
    ])
  },
  methods: {
    ...mapActions([
      'SET_MOBILE',
      'SET_DESKTOP'
    ])
  },
  mounted() {
    let size = this;
    window.addEventListener('resize', function () {
      if (window.innerWidth > 767) {
        size.SET_DESKTOP()
        console.log('Desktop', size.IS_DESKTOP)
      } else {
        size.SET_MOBILE()
        console.log('Mobile', size.IS_MOBILE)
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 160px;
}
</style>
