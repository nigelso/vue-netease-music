<template>
  <div class="singer">
    <div class="header" ref="header">
      <span class="iconfont" @click="back">&#xe617;</span>
      <span>歌手</span>
    </div>
    <singer-tag @pushCode="getCode"></singer-tag>
    <singer-list :code="code"></singer-list>
  </div>
</template>

<script>
import BackHeader from "components/backheader/BackHeader"
import SingerTag from "./components/SingerTag"
import SingerList from "./components/SingerList"
import { singerHot } from "api/user"
export default {
  data () {
    return {
      code: 'hot'
    }
  },
  components: {
    BackHeader,
    SingerTag,
    SingerList
  },
  mounted () {
    console.log(this.code)
  },
  methods: {
    back() {
      this.$router.push("/recommend")
    },
    getCode(code) {
      this.code = code
      console.log(this.code)
    }
  }
}
</script>

<style scoped lang='stylus'>
.singer
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color #DD4137
  .header
    display flex
    line-height 50px
    color #ffffff
    position fixed
    z-index 999
    background #dd4137
    top 0
    left 0
    right 0
    .iconfont
      width 50px
      text-align center
      line-height 50px
</style>
