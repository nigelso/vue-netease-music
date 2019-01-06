<template>
  <div>
    <div class="mini">
      <img :src="currentSong.al ? currentSong.al.picUrl : require('../../assets/img/preload.png')" class="mini-avatar">
      <span class="song-name">{{ currentSong.name }}</span>
      <span class="iconfont" v-html="playIcon" @click="switchState"></span>
      <span class="iconfont">&#xe66d;</span>
    </div>
    <div class="big"></div>
    <audio :src="currentSong.url" ref="audio"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  data () {
    return {
    }
  },
  components: {

  },
  computed: {
    ...mapGetters(["playState", "fullScreen", "currentSong"]),
    playIcon() {
      return this.playState ? "&#xe61e;" : "&#xe616;"
    }
  },
  methods: {
    ...mapMutations({
      setState: "SET_PLAYSTATE"
    }),
    switchState() {
      let playState = this.playState
      this.setState(!playState)
    }
  },
  watch: {
    currentSong(newVal) {
      console.log(newVal)
      this.$nextTick(() => {
        let audio = this.$refs.audio
        audio.play()
        console.log(this.$store.state)
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
</style>
