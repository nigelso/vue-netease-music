<template>
  <slider
    class="wrapper"
    ref="slider"
    :listenScroll="true"
    @scroll="handleScroll"
    :probeType="3">
    <div class="content">
      <div class="songs">
        <div class="song-item" v-for="(item, index) in songList" :key="item.id" @click="goPlay(index)">
          <span class="index">{{ index + 1 }}</span>
          <div class="item-wrapper border-bottom">
            <div class="name-wrapper">
              <p>
                <span class="song-name">{{item.name}}</span>
                <span class="tn" v-for="(tn, idx) in item.tns" :key="idx">({{ tn }})</span>
              </p>
            </div>
            <div class="singers">
              <p>
                <span class="singer" v-for="(singer, index) in item.ar" :key="index">
                  {{ singer.name }} -
                </span>
                <span class="al">{{ item.al.name }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </slider>
</template>

<script>
import Slider from "components/slider/Slider"
import { songUrl, songDetail } from "api/home"
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
  created () {
    let songList = this.songList
    let songId = []
    songList.forEach(element => {
      songId.push(element.id)
    })
    let songStr = songId.join(",")
    songDetail(songStr).then(res => {
      let detailList = res.songs
      songUrl(songStr).then(res => {
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
  mounted () {
    this._setHeight()
    window.addEventListener("resize", () => {
      this.$nextTick(() => {
        this._setHeight()
      })
    })
  },
  methods: {
    ...mapActions(["setPlay"]),
    _setHeight() {
      let slider = this.$refs.slider
      let sliderHeight = window.innerHeight - 310
      slider.$el.style.height = sliderHeight + "px"
    },
    handleScroll(pos) {
      this.$emit("pushY", pos)
    },
    goPlay(index) {
      console.log(this.detailList)
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
@import "~assets/css/mixin.styl";
.wrapper
  overflow hidden
  .content
    // padding 0 10px
    padding 0 10px 0 0
    .songs
      .song-item
        display flex
        height 50px
        align-items center
        .index
          width 50px
          text-align center
          line-height 50px
          color #A6A6A6
          font-size 14px
        .item-wrapper
          flex 1
          height 50px
          min-width 0
          display flex
          flex-direction column
          justify-content center
          p
            width 100%
            textWrap()
          .name-wrapper
            font-size 16px
            margin-bottom 3px
            .song-name
              color #222
            .tn
              color #ACACAC
          .singers
            font-size 12px
            color #ACACAC
</style>
