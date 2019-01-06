<template>
  <div class="singer-song">
    <back-header :text="singerInfo.name"></back-header>
    <div
      ref="img"
      class="img-wrapper"
      :style="{
        backgroundImage: `url(${singerInfo.img1v1Url})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundSize: 'cover'
      }
    ">
    </div>
    <!-- <slider ref="slider" class="wrapper" :probeType='3' :listenScroll="true" @scroll="handleScroll">
      <div class="content">
        <div class="song-list">
          <div class="song-item" v-for="(item, index) in songList" :key="item.id">
            <span class="index">{{ index + 1 }}</span>
            <span class="name border-bottom">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </slider> -->
    <list  @pushY="getY" :songList="songList" :singerInfo="singerInfo" v-if="songList.length"></list>
  </div>
</template>

<script>
import BackHeader from "components/backheader/BackHeader"
import List from "components/list/List"
import Slider from "components/slider/Slider"
import { singerSong, musicStatus } from "api/user"
export default {
  data () {
    return {
      songList: [],
      singerInfo: {}
    }
  },
  components: {
    BackHeader,
    Slider,
    List
  },
  created () {
    let sid = this.$route.params.id
    console.log(sid)
    singerSong(sid).then(res => {
      console.log(res)
      this.songList = res.hotSongs
      this.singerInfo = res.artist
    })
  },
  mounted () {
  },
  methods: {
    getY(pos) {
      let img = this.$refs.img
      if (pos.y > 0) {
        let all = pos.y + 300
        let percent = all / 300
        img.style.transform = `scale(${percent})`
      }
      // console.log(img)
      // console.log(pos.y)
    }
  }
}
</script>

<style scoped lang='stylus'>
.singer-song
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color #fff
  z-index 999
  .img-wrapper
    width 100%
    height 300px
</style>
