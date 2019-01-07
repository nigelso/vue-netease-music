<template>
  <div>
    <transition name="big">
      <div class="mini" v-if="!fullScreen" @click="showBig">
        <img :src="currentSong.al ? currentSong.al.picUrl : require('../../assets/img/preload.png')" class="mini-avatar">
        <span class="song-name">{{ currentSong.name }}</span>
        <span class="iconfont" v-html="playIcon" @click.stop="switchState"></span>
        <span class="iconfont" @click.stop="handleList">&#xe66d;</span>
      </div>
    </transition>
    <transition name="big">
      <div class="big" v-if="fullScreen">
        <div class="bg"
          :style="{
            backgroundImage: `url(${currentSong.al.picUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }">
        </div>
        <div class="header" ref="header">
          <span class="iconfont" @click="back">&#xe617;</span>
          <span>{{ currentSong.name }}</span>
        </div>
        <img class="big-avatar" :src="currentSong.al.picUrl" alt="">
        <progress-bar :currentTime="formatTime(currentTime)" :duration="formatTime(duration)" :percent="percent" @pushPercent="getPercent"></progress-bar>
        <div class="control">
          <span class="iconfont">&#xe722;</span>
          <span class="iconfont" @click.stop="prev">&#xe649;</span>
          <span class="iconfont off-on" @click.stop="switchState" v-html="playIcon"></span>
          <span class="iconfont" @click.stop="next">&#xe648;</span>
          <span class="iconfont" @click="handleList">&#xe66d;</span>
        </div>
      </div>
    </transition>
    <transition name="big">
      <play-list @close="handleClose" v-if="flag&&currentList.length"></play-list>
    </transition>
    <audio :src="currentSong.url" ref="audio" id="audio" @timeupdate="handleTime"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import PlayList from "./components/PlayList"
import BackHeader from "components/backheader/BackHeader"
import ProgressBar from "./components/progressBar"
export default {
  data () {
    return {
      flag: false,
      percent: 0,
      currentTime: "",
      duration: ""
    }
  },
  components: {
    BackHeader,
    PlayList,
    ProgressBar
  },
  computed: {
    ...mapGetters(["playState", "fullScreen", "currentSong", "currentList", "currentIndex"]),
    playIcon() {
      return this.playState ? "&#xe61e;" : "&#xe616;"
    }
  },
  methods: {
    ...mapMutations({
      setState: "SET_PLAYSTATE",
      setFullscreen: "SET_FULLSCREEN",
      setIndex: "SET_CURRENTINDEX"
    }),
    switchState() {
      if (this.currentList.length) {
        let playState = this.playState
        this.setState(!playState)
      }
    },
    back() {
      this.setFullscreen(false)
    },
    showBig() {
      if(this.currentList.length) {
        this.setFullscreen(true)
      }
    },
    handleClose() {
      this.flag = false
    },
    handleList() {
      this.flag = true
    },
    prev() {
      let index = this.currentIndex
      let len = this.currentList.length
      index --
      if (index <= 0) {
        index = 0
      }
      this.setIndex(index)
      this.setState(true)
    },
    next() {
      let index = this.currentIndex
      let len = this.currentList.length
      index ++
      if (index >= len) {
        index = len - 1
      }
      this.setIndex(index)
      this.setState(true)
    },
    handleTime(e) {
      this.currentTime = e.target.currentTime
      this.percent = this.currentTime / this.duration
      if (this.currentTime >= this.duration) {
        this.next()
      }
    },
    getPercent(percent) {
      let audio = this.$refs.audio
      let currentTime = this.duration * percent
      audio.currentTime = currentTime
      this.setState(true)
    },
    formatTime(time) {
      let minute = this.pad(time / 60 | 0)
      let second = this.pad(time % 60 | 0)
      return `${minute}:${second}`
    },
    pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = "0" + num
        len ++
      }
      return num
    }
  },
  watch: {
    currentSong(newVal) {
      console.log(newVal)
      this.duration = newVal.dt / 1000
      this.$nextTick(() => {
        let audio = this.$refs.audio
        audio.play()
      })
    },
    playState(newVal) {
      this.$nextTick(() => {
        let audio = this.$refs.audio
        newVal ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
.mini
  height 60px
  background-color #222
  position fixed
  bottom 0
  left 0
  right 0
  display flex
  align-items center
  color #ffffff
  .mini-avatar
    width 50px 
    height 50px
    padding 0 10px 0 5px
  .iconfont
    width 50px
    text-align center
    line-height 50px
  .song-name
    flex 1
    font-size 14px
.big
  position fixed
  top 0
  bottom 0
  right 0
  left 0
  background-color #fff
  .bg
    float left
    width 100%
    height 100%
    filter blur(60px)
  .header
    display flex
    line-height 50px
    color #ffffff
    position fixed
    z-index 999
    background rgba(0,0,0,.5)
    top 0
    left 0
    right 0
    .iconfont
      width 50px
      text-align center
      line-height 50px
  .big-avatar
    position absolute
    top 150px
    left 50%
    width 60%
    transform translateX(-50%)
    border-radius 50%
  .control
    height 60px
    position absolute
    bottom 0
    left 0
    right 0
    background-color #fff
    display flex
    justify-content space-around
    align-items center
    span
      width 50px
      text-align center
      line-height 50px
      &.off-on
        font-size 40px
.big-enter,.big-leave-to
  transform translate3d(0, 100%, 0)
.big-enter-active,.big-leave-active
  transition all 0.2s
</style>
