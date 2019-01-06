<template>
  <div class="home-header">
    <div class="tag">
      <span>推荐</span>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang='stylus'>
.home-header
  width 100%
  height 45px
  background-color #DD4137
  .tag
    text-align center
    font 700 12px "宋体"
    line-height 45px
    color #ffffff
    span
      padding-bottom 5px
      border-bottom 2px solid #fff
  .background
    width 100%
    height 100px
    background-color #DD4137
</style>
