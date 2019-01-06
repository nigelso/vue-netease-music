<template>
  <div class="menu">
    <back-header :text="type"></back-header>
    <!-- <slider ref="slider" class="wrapper" :pullup="true" @scrollToEnd="handleScroll" :data="playList">
      <div class="content">
        <router-link tag="div" class="list-item" v-for="item in playList" :key="item.id" :to="{path: `/menu/${item.id}`}">
          <img v-lazy="item.coverImgUrl">
          <p class="name">{{ item.name }}</p>
        </router-link>
      </div>
    </slider>
    <div class="load" v-show="flag">
      <loading></loading>
    </div>
    <transition name="slide">
      <router-view/>
    </transition> -->
    <router-view />
  </div>
</template>

<script>
import BackHeader from "components/backheader/BackHeader"
export default {
  data () {
    return {
      type: ""
    }
  },
  components: {
    BackHeader
  },
  created () {
    let type = this.$route.params.type
    this.type = type === "hot" ? "热门歌单" : "精品歌单"
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped lang='stylus'>
.menu
  position fixed
  top 0
  bottom 0
  right 0
  left 0
  background-color #fff
.slide-enter,.slide-leave-to
  transform translate3d(0, 20%, 0)
  opacity 0
.slide-enter-active,.slide-leave-active
  transition all 200ms
</style>
