<template>
  <div>
    <div class="load" v-show="flag">
      <loading></loading>
    </div>
    <slider ref="slider" class="wrapper" :data="hotList">
      <div class="content">
        <home-header></home-header>
        <home-banner v-if="recommends.length">
          <div v-for="(item, index) in recommends" :key="index">
            <a :href="item.url">
              <img :src="item.imageUrl" alt="">
            </a>
          </div>
        </home-banner>
        <home-tag></home-tag>
        <router-link tag="h3" to="/menu" class="sub-title">热门歌单<span class="iconfont">&#xe63b;</span></router-link>
        <list>
          <ul>
            <li class="list-item" v-for="item in hotList" :key="item.id">
              <img class="img" :src="item.coverImgUrl">
              <span class="name">{{ item.name }}</span>
            </li>
          </ul>
        </list>
        <router-link tag="h3" to="/menu/high" class="sub-title">精品歌单<span class="iconfont">&#xe63b;</span></router-link>
        <list>
          <ul>
            <li class="list-item" v-for="item in filterItems" :key="item.id">
              <img class="img" :src="item.coverImgUrl">
              <span class="name">{{ item.name }}</span>
            </li>
          </ul>
        </list>
      </div>
    </slider>
    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>

<script>
import HomeHeader from "./components/HomeHeader"
import HomeBanner from "./components/HomeBanner"
import HomeTag from "./components/HomeTag"
import Loading from "components/loading/Loading"
import List from "./components/List"
import Slider from "components/slider/Slider"
import { getBanner, getRecommendList, getPlayList } from "api/home"
import { userStatus, logout } from "api/user"
import { mapMutations } from "vuex"
export default {
  data () {
    return {
      recommends: [],
      recommendMenu: [],
      hotList: [],
      flag: false
    }
  },
  components: {
    HomeHeader,
    HomeBanner,
    HomeTag,
    List,
    Slider,
    Loading
  },
  computed: {
    filterItems() {
      return this.recommendMenu.slice(0, 6)
    }
  },
  methods: {
    ...mapMutations({
      setProfile: "SET_PROFILE"
    }),
    setHeight() {
        let slider = this.$refs.slider
        let windowHeight = window.innerHeight
        // let offsetTop = slider.$el.offsetTop
        slider.$el.style.height = windowHeight - 105 + "px"
    }
  },
  created () {
    getBanner().then(res => {
      this.recommends = res.banners
    })
    getRecommendList('').then(res => {
      this.recommendMenu = res.playlists
    }).catch(err => {
      console.log(err)
    })
    getPlayList(12).then(res => {
      this.hotList = res.playlists
      console.log(res)
    })
  },
  mounted () {
    if (localStorage.profile) {
      let profile = JSON.parse(localStorage.profile)
      this.setProfile(profile)
      console.log(this.$store.state)
    }
    setTimeout(() => {
      this.setHeight()
    }, 20)
    window.addEventListener("resize", () => {
      this.setHeight()
    })
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
  overflow hidden
.sub-title
  font 700 16px/40px "Microsoft yahei"
  padding-left 5px
  span
    font-size 16px
    color #666
.slide-enter,.slide-leave-to
  transform translate3d(0, 20%, 0)
  opacity 0
.slide-enter-active,.slide-leave-active
  transition all 0.2s
</style>

