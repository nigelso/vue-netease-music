<template>
  <div class="every">
    <back-header :text="'每日推荐'"></back-header>
    <!-- <list :songList="songList"></list> -->
    <div class="img-wrapper">
      <span class="iconfont">&#xe638;</span>
      <span class="date">{{ date }}</span>
    </div>
    <slider
      class="wrapper"
      ref="slider"
      :listenScroll="true"
      @scroll="handleScroll"
      :probeType="3">
      <div class="content">
        <div class="songs">
          <div class="song-item border-top" v-for="(item, index) in songList" :key="item.id" @click="goPlay(index)">
            <img :src="item.album.picUrl" width="50" height="50" class="img">
            <div class="info-wrapper">
              <div class="name">{{ item.name }}</div>
              <div class="singers">
                <p>
                  <span v-for="singer in item.artists" :key="singer.id">
                    {{singer.name}}
                  </span>-
                  <span>{{ item.album.name }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </slider>
  </div>
</template>

<script>
import BackHeader from "components/backheader/BackHeader"
import Slider from "components/slider/Slider"
import { recommendSong } from "api/user"
import { songDetail, songUrl } from "api/home"
import { mapActions } from "vuex"
export default {
  data () {
    return {
      songList: [],
      detailList: []
    }
  },
  components: {
    BackHeader,
    Slider
  },
  created () {
    recommendSong().then(res => {
      this.songList = res.recommend
      let songId = []
      res.recommend.forEach(element => {
        songId.push(element.id)
      })
      let songIdStr = songId.join(",")
      songDetail(songIdStr).then(res => {
        let detailList = res.songs
        songUrl(songIdStr).then(res => {
          let songUrl = res.data
          detailList.forEach((element, index) => {
            element.url = songUrl[index].url
          })
        })
        this.detailList = detailList
        console.log(detailList)
      })
    })
  },
  mounted () {
    this.setHeight()
  },
  methods: {
    ...mapActions(["setPlay"]),
    handleScroll(pos) {
      // console.log(pos.y)
    },
    setHeight() {
      let slider = this.$refs.slider
      let windowHeight = window.innerHeight
      let offsetTop = slider.$el.offsetTop
      slider.$el.style.height = windowHeight - offsetTop - 60 + "px"
    },
    goPlay(index) {
      console.log(this.detailList)
      this.setPlay({
        playstate: true,
        fullscreen: true,
        index,
        list: this.detailList
      })
      setTimeout(() => {
        console.log(this.$store.state)
      }, 500);
      console.log(index)
    }
  },
  computed: {
    date() {
      let date = new Date().getDate()
      return date < 10 ? '0' + date : date
    }
  }
}
</script>

<style scoped lang='stylus'>
@import "~style/mixin.styl";
.every
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color #fff
  .img-wrapper
    width 100%
    height 250px
    display flex
    align-items center
    justify-content center
    background-color #000
    color #ffffff
    position relative
    .iconfont
      font-size 50px
    .date
      position absolute
      left 50%
      top 50%
      z-index 999
      transform translate3d(-50%, -2px, 0)
  .wrapper
    overflow hidden
    .content
      .songs
        padding 0 10px
        .song-item
          display flex
          height 70px
          align-items center
          .img
            border-radius 5px
            margin-right 10px
          .info-wrapper
            display flex
            flex-direction column
            justify-content center
            min-width 0
            .name
              margin-bottom 10px
              textWrap()
            .singers
              display flex
              min-width 0
              p
                textWrap()
                font-size 12px
                color #909090
</style>
