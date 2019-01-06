<template>
  <div class="search">
    <div class="header">
      <span class="iconfont" @click="back">&#xe617;</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang='stylus'>
.search
  position fixed
  top 0
  bottom 0
  right 0
  left 0
  background-color #fff
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
