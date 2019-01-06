<template>
  <div class="banner" ref="banner">
    <div class="banner-group" ref="bannerGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dot" :key="index" :class="{active: currentPageIndex === index}">
      </span>
    </div> 
  </div>
</template>

<script>
import BScroll from "better-scroll"
import { addClass } from "assets/js/dom"
export default {
  data () {
    return {
      dot: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  mounted () {
    //setTimeout 会有闪屏的现象
    // setTimeout(() => {
    //   this._setBannerWidth()
    //   this._initDots()
    //   this._initBanner()
    //   if(this.autoPlay) {
    //     this._play()
    //   }
    //   window.addEventListener('resize', () => {
    //     if (!this.slider) {
    //       return
    //     }
    //     this._setBannerWidth(true)
    //   })
    // }, 20);
    this.$nextTick(() => {
      this._setBannerWidth()
      this._initDots()
      this._initBanner()
      if(this.autoPlay) {
        this._play()
      }
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setBannerWidth(true)
        this.slider.refresh()
      })
    })
  },
  methods: {
    _setBannerWidth(isResize) {
      this.children = this.$refs.bannerGroup.children
      let width = 0
      let banner = this.$refs.banner
      let bannerWidth = banner.clientWidth
      Array.from(this.children).forEach(element => {
        addClass(element, "banner-item")
        element.style.width = bannerWidth + 'px'
        width += bannerWidth
      })

      if (this.loop && !isResize) {
        width += 2 * bannerWidth
      }
      this.$refs.bannerGroup.style.width = width + 'px'
    },
    _initBanner() {
      this.slider = new BScroll(this.$refs.banner, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        click: true
      })
      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _initDots() {
      this.dot = new Array(this.children.length)
    },
    _play() {
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval);
    }
  }
}
</script>

<style scoped lang='stylus'>
.banner
  position relative
  min-height 1px
  overflow hidden
  .banner-group
    position relative
    overflow hidden
    white-space nowrap
    .banner-item
      float left
      box-sizing border-box
      overflow hidden
      text-align center
      padding 0 5px
      a
        display block
        width 100%
        overflow hidden
        text-decoration none
        border-radius 5px
      img
        width 100%
  .dots
    position absolute
    right 0
    left 0
    bottom 12px
    text-align center
    font-size 0
    .dot
      display inline-block
      margin 0 4px
      width 8px
      height 8px
      border-radius 50%
      background-color #fff
      &.active
        background-color #000
</style>
