<template>
  <div>
    <div class="mini">
      <img src="" class="mini-avatar">
      <span></span>
      <span class="iconfont"></span>
      <span class="iconfont">&#xe66d;</span>
    </div>
    <div class="big"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  data () {
    return {

    }
  },
  components: {

  },
  computed: {
    ...mapGetters(["playState", "fullScreen"])
  }
}
</script>

<style scoped lang='stylus'>
.mini
  height 60px
  background-color #222
  position fixed
  bottom 0
  left 0
  right 0
</style>
