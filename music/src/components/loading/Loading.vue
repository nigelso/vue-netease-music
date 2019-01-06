<template>
  <div class="loading">
    <img src="./loading.gif">
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    }
  },
  components: {

  }
}
</script>

<style scoped lang='stylus'>
.loading
  position absolute
  top 50%
  left 50%
  transform translate3d(-50%, -50%, 0)
  text-align center
  img
    width 50px
    height 50px
</style>
