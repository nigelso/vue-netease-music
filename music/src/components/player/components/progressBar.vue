<template>
  <div class="progress-bar">
    <span class="current-time">{{currentTime}}</span>
    <div class="progress-wrapper" ref="wrapper" @click.stop="handleClick">
      <div ref="btn" class="btn" @touchstart.stop="handleStart" @touchmove.stop="handleMove" @touchend.stop="handleEnd"></div>
      <div ref="bar" class="bar"></div>
    </div>
    <span class="duration">{{duration}}</span>
  </div>
</template>

<script>
export default {
  props: ["percent", "currentTime", "duration"],
  data () {
    return {
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    handleStart(e) {
      this.touch.startX = e.touches[0].clientX
      this.touch.initial = true
      this.touch.left = this.$refs.bar.clientWidth
      console.log(e)
    },
    handleMove(e) {
      if (!this.touch.initial) {
        return
      }
      let deltaX = e.touches[0].clientX - this.touch.startX
      let allWidth = this.$refs.wrapper.clientWidth
      let width = Math.min(allWidth, Math.max(0, this.touch.left + deltaX))
      this.transform(width)
    },
    handleEnd() {
      this.touch.initial = false
      this.handlePercent()
    },
    transform(width) {
      this.$refs.bar.style.width = width + "px"
      this.$refs.btn.style.transform = `translateX(${width}px)`
    },
    handlePercent() {
      let barWidth = this.$refs.bar.clientWidth
      let wrapperWidth = this.$refs.wrapper.clientWidth
      let percent = barWidth / wrapperWidth
      this.$emit("pushPercent", percent)
      // console.log(barWidth / wrapperWidth)
    },
    handleClick(e) {
      let wrapper = this.$refs.wrapper.offsetLeft
      let width = e.clientX - wrapper
      this.transform(width)
      this.handlePercent()
    }
  },
  watch: {
    percent(newVal) {
      if (newVal > 0 && !this.touch.initial) {
        let allWidth = this.$refs.wrapper.clientWidth
        let width = allWidth * newVal
        this.transform(width)
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
.progress-bar
  position absolute
  bottom 80px
  left 0
  right 0
  line-height 30px
  display flex
  padding 0 10px
  align-items center
  span
    width 60px
    height 30px
    text-align center
    font-size 14px
  .progress-wrapper
    flex 1
    height 6px
    background-color #fff
    position relative
    border-radius 3px
    .btn
      width 12px
      height 12px
      background-color #000
      position absolute
      left -6px
      top -3px
      border-radius 50%
    .bar
      width 0
      height 6px
      background-color #222
      border-radius 3px
</style>
