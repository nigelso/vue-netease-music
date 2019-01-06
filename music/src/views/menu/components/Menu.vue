<template>
  <div class="song-list">
    <div class="menu-info" v-if="listInfo.coverImgUrl" ref="info">
      <img :src="listInfo.coverImgUrl" class="cover">
      <div class="intro-wrapper">
        <img :src="listInfo.coverImgUrl" class="avatar-menu" width="120" height="120">
        <div class="intro">
          <span class="intro-name">{{ listInfo.name }}</span>
          <div class="creator">
            <img :src="listInfo.creator.avatarUrl" width="30" height="30">
            <span>{{ listInfo.creator.nickname }}</span></div>
        </div>
      </div>
    </div>
    <song-list :songList="songList" v-if="songList.length" @pushY="getY"></song-list>
  </div>
</template>

<script>
import Slider from "components/slider/Slider"
import BackHeader from "components/backheader/BackHeader"
import SongList from "components/songlist/SongList"
import { getSongList } from "api/home"
export default {
  data () {
    return {
      listInfo: {},
      songList: []
    }
  },
  components: {
    Slider,
    BackHeader,
    SongList
  },
  created () {
    this.aid = this.$route.params.id
    this._getSongList(this.aid)
  },
  methods: {
    _getSongList(aid) {
      getSongList(aid).then(res => {
        this.listInfo = res.playlist
        this.songList = res.playlist.tracks
        console.log(this.listInfo)
      })
    },
    back() {
      this.$router.back()
    },
    getY(pos) {
      let info = this.$refs.info
      if(pos.y > 0) {
        let all = 250 + pos.y
        info.style.height = all + "px"
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
@import "~assets/css/mixin.styl";
.song-list
  position fixed
  top 0
  bottom 0
  right 0
  left 0
  background-color #fff
  z-index 99
  .menu-info
    height 250px
    display flex
    overflow hidden
    position relative
    padding 0 10px
    .cover
      transform scale(1.5)
      width 100%
      filter blur(10px)
      position absolute
      top 0
      left 0
      z-index 1
    .intro-wrapper
      width 100%
      height 100%
      position absolute
      z-index 2
      left 50%
      top 50%
      transform translate3d(-50%, -50%, 0)
      display flex
      align-items center
      .avatar-menu
        margin 0 10px 0 20px
        border-radius 5px
      .intro
        display flex
        flex-direction column
        justify-content center
        padding-right 20px
        .intro-name
          font-size 16px
          color #ffffff
          line-height 1.5
        .creator
          margin-top 10px
          display flex
          align-items center
          img
            border-radius 50%
            margin-right 5px
          span
            color #ffffff
            font-size 14px
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
