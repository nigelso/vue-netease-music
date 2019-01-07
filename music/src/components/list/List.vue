<template>
  <slider ref="slider" class="wrapper" :probeType='3' :listenScroll="true" @scroll="handleScroll">
    <div class="content">
      <div class="song-list">
        <div class="song-item" v-for="(item, index) in songList" :key="item.id" @click="goPlay(index)">
          <span class="index">{{ index + 1 }}</span>
          <span class="name border-bottom">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </slider>
</template>

<script>
import Slider from "components/slider/Slider"
import { songDetail, songUrl } from "api/home"
import { mapActions } from "vuex"
export default {
  props: ["songList"],
  data () {
    return {
      detailList: []
    }
  },
  components: {
    Slider
  },
  mounted () {
    this.setHeight()
    window.addEventListener("resize", () => {
      this.$nextTick(() => {
        this.setHeight()
      })
    })
    let songId = []
    this.songList.forEach(element => {
      songId.push(element.id)
    })
    songDetail(songId.join(",")).then(res => {
      let detailList = res.songs
      songUrl(songId.join(",")).then(res => {
        // console.log(res)
        let urls = res.data
        urls.forEach(element => {
          detailList.forEach(ele => {
            if (element.id == ele.id) {
              ele.url = element.url
            }
          })
        })
        // this.songList = songList
        this.detailList = detailList
      })
    })
  },
  methods: {
    ...mapActions(["setPlay"]),
    handleScroll(pos) {
      this.$emit("pushY", pos)
    },
    setHeight() {
      let slider = this.$refs.slider
      let windowHeight = window.innerHeight
      let offsetTop = slider.$el.offsetTop
      slider.$el.style.height = windowHeight - offsetTop - 60 + "px"
    },
    goPlay(index) {
      this.setPlay({
        playstate: true,
        fullscreen: true,
        index,
        list: this.detailList
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
@import "~style/mixin.styl";
.wrapper
  overflow hidden
  .content
    padding-right 10px
    .song-list
      .song-item
        display flex
        height 50px
        line-height 50px
        .index
          text-align center
          width 50px
          height 50px
          color #A8A8A8
        .name
          flex 1
          textWrap()
</style>
