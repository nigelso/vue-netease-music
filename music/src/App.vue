<template>
  <div id="app">
    <c-header @changeFlag="handleChange"></c-header>
    <transition name="sideSlide">
      <side-bar v-show="flag" @close="sideOff"></side-bar>
    </transition>
    <transition name="hide">
      <div class="cover" v-show="flag" @click="sideOff"></div>
    </transition>
    <keep-alive>
      <transition name="slide">
        <router-view/>
      </transition>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import CHeader from "components/header/CHeader"
import Player from "components/player/Player"
import SideBar from 'components/sidebar/SideBar'
import axios from "axios"
export default {
  data () {
    return {
      flag: false  
    }
  },
  components: {
    CHeader,
    Player,
    SideBar
  },
  mounted () {
  },
  methods: {
    handleChange() {
      this.flag = true
    },
    sideOff() {
      this.flag = false
    }
  }
}
</script>

<style lang="stylus">
.cover
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(0,0,0,.5)
  z-index 100
.slide-enter,.slide-leave-to
  transform translate3d(0, 20%, 0)
  opacity 0
.slide-enter-active,.slide-leave-active
  transition all 0.2s
.sideSlide-enter,.sideSlide-leave-to
  transform translate3d(-70%, 0, 0)
  opacity 0
.sideSlide-enter-active,.sideSlide-leave-active
  transition all .5s
.hide-enter,.hide-leave-to
  opacity 0
.hide-enter-active,.hide-leave-active
  transition all .5s
</style>
