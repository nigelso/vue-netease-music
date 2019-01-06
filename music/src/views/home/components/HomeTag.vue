<template>
  <div class="tag">
    <div class="tag-wrapper">
      <router-link tag="div" class="tag-item" v-if="profile" to="/recommend/every">
        <span class="iconfont">&#xe638;<i>{{ date }}</i></span>
        <p>每日推荐</p>
      </router-link>
      <router-link tag="div" to="/menu" class="tag-item">
        <span class="iconfont">&#xe603;</span>
        <p>歌单</p>
      </router-link>
      <router-link tag="div" to="/rank" class="tag-item">
        <span class="iconfont">&#xe68f;</span>
        <p>排行榜</p>
      </router-link>
      <router-link tag="div" to="/singer" class="tag-item">
        <span class="iconfont">&#xe647;</span>
        <p>歌手</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      date: null
    }
  },
  computed: {
    ...mapGetters(["profile"])
  },
  mounted () {
    let date = new Date()
    let today = date.getDate()
    if (today < 10) {
      today = '0' + today
    }
    this.date = today
  }
}
</script>

<style scoped lang='stylus'>
.tag
  width 100%
  margin 15px 0 10px 0
  padding-bottom 10px
  border-bottom 2px solid #F5F5F5
  .tag-wrapper
    display flex
    padding 0 5px
    justify-content space-around
    .tag-item
      flex 1
      text-align center
      span
        margin 0 auto
        display block
        width 45px
        background-color #E24338
        line-height 45px
        text-align center
        border-radius 50%
        font-size 22px
        color #ffffff
        margin-bottom 7px
        box-shadow 0 0 10px #af0000
      p
        font 700 12px "宋体"
        color #333
        transform scale(0.9)
    .tag-item:first-child span
      position relative
      i
        position absolute
        font-size 12px
        line-height 12px
        top calc(50% - 4px)
        left calc(50% - 7px)
</style>
