<template>
  <div class="list">
    <div class="list-group">
      <slot></slot>
    </div>
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
.list
  .list-group
    padding 0 5px
    ul
      display flex
      flex-wrap wrap
      justify-content space-between
      .list-item
        width calc(100% / 3 - 4px)
        .img
          width calc(100%)
          border-radius 5px
        .name
          display block
          font-size 12px
          line-height 1.5
          margin 5px 0 20px 0
</style>
