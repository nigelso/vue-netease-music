<template>
<!-- <transition :name="transitionName" mode="out-in"> -->
  <div class="singer-wrapper" :key="code">
    <slider class="wrapper" ref="slider" :data="singerList" :pullup="true" @scrollToEnd="handleToEnd">
      <div class="content">
        <div class="singer-list">
          <router-link tag="div" class="singer" v-for="item in singerList" :key="item.id" :to="{path: `/singer/${item.id}`}">
            <img v-lazy="item.img1v1Url" width="80" height="80">
            <span class="name">{{ item.name }}</span>
          </router-link>
        </div>
      </div>
    </slider>
    <div class="load" v-show="flag">
      <loading></loading>
    </div>
    <transition name="singerslide">
      <router-view></router-view>
    </transition>
  </div>
<!-- </transition> -->
</template>

<script>
import { singerHot, singerCate } from "api/user"
import Slider from "components/slider/Slider"
import Loading from "components/loading/Loading"
export default {
  props: ["code"],
  data () {
    return {
      page: 0,
      more: false,
      singerList: [],
      transitionName: "",
      flag: false
    }
  },
  components: {
    Slider,
    Loading
  },
  created () {
    },
  mounted () {
    this.getSinger(this.page)
    this.$nextTick(() => {
      this.setHeight()
    })
    window.addEventListener('resize', () => {
      this.setHeight()
    })
    console.log(this.code)
  },
  methods: {
    getSinger(page) {
      let code = this.code
      console.log(code)
      if (code === "hot") {
        this.flag = true
        singerHot(code, page).then(res => {
          this.more = res.more
          // this.singerList = res.artists
          this.singerList = this.singerList.concat(res.artists)
          this.flag = false
          // console.log(res)
        })
      } else {
        this.flag = true
        singerCate(code, page).then(res => {
          this.more = res.more
          // this.singerList = res.artists
          this.singerList = this.singerList.concat(res.artists)
          this.flag = false
          // console.log(res)
        })
      }
    },
    setHeight() {
      let slider = this.$refs.slider
      let offsetTop = slider.$el.offsetTop
      let windowHeight = window.innerHeight
      slider.$el.style.height = windowHeight - offsetTop - 60 + "px"
    },
    handleToEnd() {
      console.log(1)
      if (this.more) {
        this.page += 1
        this.getSinger(this.page * 50)
      }
    }
  },
  watch: {
    code(newVal, oldVal) {
      this.page = 0
      this.singerList = []
      this.code = newVal
      this.getSinger(this.page)
    }
  },
  beforeUpdate () {
    this.setHeight()
  }
}
</script>

<style scoped lang='stylus'>
.singer-wrapper
  background-color #ffffff
  border-radius 10px 10px 0 0
  .wrapper
    overflow hidden
    .content
      padding 0 10px
      .singer-list
        .singer
          height 100px
          display flex
          align-items center
          justify-content space-between
          border-bottom 1px solid #F3F3F3
          .name
            color #B7B7B7
  .load
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color rgba(0, 0, 0, .5)
.singerslide-enter,.singerslide-leave-to
  transform translate3d(100%, 0, 0)
  opacity 0
.singerslide-enter-active,.singerslide-leave-active
  transition all 0.2s

// .right-enter
//   transform translate3d(100%, 0, 0)
//   opacity 0
// .right-leave-to
//   transform translate3d(-100%, 0, 0)
//   opacity 0
// .right-enter-active,.right-leave-active
//   transition all 0.2s
</style>
