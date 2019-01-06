<template>
  <div class="header">
    <span class="iconfont list" @click="showSide">&#xe66d;</span>
    <div class="header-center">
      <router-link tag="span" class="iconfont" to="/user">&#xe60f;</router-link>
      <router-link tag="span" class="iconfont" to="/recommend">&#xe601;</router-link>
    </div>
    <router-link tag="span" class="iconfont search" to="/search">&#xe69e;</router-link>
  </div>
</template>

<script>
export default {
  methods: {
    showSide() {
      this.$emit('changeFlag')
    }
  }
}
</script>

<style scoped lang='stylus'>
.header
  height 45px
  line-height 45px
  background-color #DD4137
  display flex
  color #ffffff
  .list, .search
    width 45px
    height 45px
    text-align center
  div.header-center
    flex 1
    display flex
    justify-content center
    color #EB8D87
    span
      width 45px
      height 45px
      text-align center
    .router-link-active
      color #ffffff
</style>
