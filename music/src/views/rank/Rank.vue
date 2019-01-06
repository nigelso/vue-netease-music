<template>
  <div class="rank">
    <back-header :text="'排行榜'"></back-header>
  </div>
</template>

<script>
import BackHeader from "components/backheader/BackHeader"
export default {
  data () {
    return {

    }
  },
  components: {
    BackHeader
  }
}
</script>

<style scoped lang='stylus'>
.rank
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color #fff
</style>
