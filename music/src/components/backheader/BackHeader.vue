<template>
  <div class="header" ref="header">
    <span class="iconfont" @click="back">&#xe617;</span>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "歌单"
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  mounted () {
    let header = this.$refs.header
    let name = this.$route.name
    if (name === "songlist" || name === "singersong" || name=== "every") {
      header.style.background = "rgba(0,0,0,.2)"
      header.style.transition = "all 0.2s"
    }
  },
  watch: {
    $route(newVal) {
      let header = this.$refs.header
      if (newVal.name === "songlist" || newVal.name === "singersong" || newVal.name === "every") {
        header.style.background = "rgba(0,0,0,.2)"
        header.style.transition = "all 0.2s"
      } else {
        header.style.background = "#dd4137"
        header.style.transition = "all 0.2s"
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
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
