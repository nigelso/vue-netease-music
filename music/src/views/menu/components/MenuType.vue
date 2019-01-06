<template>
  <div>
    <slider ref="slider" class="wrapper" :pullup="true" @scrollToEnd="handleScroll" :data="playList">
      <div class="content">
        <router-link tag="div" class="list-item" v-for="item in playList" :key="item.id" :to="{path: `/menu/${$route.params.type}/${item.id}`}">
          <div class="img-wrapper">
            <img v-lazy="item.coverImgUrl">
          </div>
          <p class="name">{{ item.name }}</p>
        </router-link>
      </div>
    </slider>
    <div class="load" v-show="flag">
      <loading></loading>
    </div>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Slider from "components/slider/Slider.vue"
import Loading from "components/loading/Loading"
import { getRecommendList, getPlayList } from "api/home"
export default {
  data () {
    return {
      playList: [],
      lastTime: null,
      hasMore: false,
      flag: false
    }
  },
  components: {
    Slider,
    Loading
  },
  created () {
    let type = this.$route.params.type
    if (type === "high") {
      this._getRecommendList("")
    } else {
      this._getPlayList(100)
    }
  },
  mounted () {
    this.setHeight()
    window.addEventListener("resize", () => {
      this.setHeight()
    })
  },
  methods: {
    handleScroll () {
      if (!this.hasMore) {
        return
      }
      this.flag = true
      this._getRecommendList(this.lastTime)
      console.log(1)
    },
    _getRecommendList(lastTime) {
      getRecommendList(lastTime).then(res => {
        this.flag = true
        this.playList = this.playList.concat(res.playlists)
        let len = this.playList.length
        this.hasMore = res.more
        this.lastTime = this.playList[len-1].updateTime
        this.flag = false
      })
    },
    _getPlayList(limit) {
      getPlayList(limit).then(res => {
        this.flag = true
        this.playList = res.playlists
        this.flag = false
      })
    },
    setHeight() {
      let wrapper = this.$refs.slider
      let height = window.innerHeight - wrapper.$el.offsetTop - 60
      wrapper.$el.style.height = height + "px"
    }
  }
}
</script>

<style scoped lang='stylus'>
.load
  position fixed
  top 0
  bottom 0
  right 0
  left 0
  background-color rgba(0, 0, 0, .5)
.wrapper
  margin-top 50px
  overflow hidden
  .content
    padding 10px 5px 0 5px
    display flex
    flex-wrap wrap
    justify-content flex-start
    .list-item
      padding-bottom 20px
      width calc(50% - 5px)
      .img-wrapper
        width 100%
        height 0
        padding-bottom 100%
        border-radius 5px
        overflow hidden
        img
          width 100%
          padding-bottom 100%
      p
        font-size 14px
        line-height 1.5
      &.list-item:nth-child(odd)
        padding-right 10px
</style>
