<template>
  <div class="playList">
    <div class="bg-cover" @click="close"></div>
    <slider class="wrapper" ref="slider">
      <div class="content">
        <div
          class="item border-bottom"
          v-for="(item, index) in currentList"
          :key="item.id"
          @click="changeIndex(index)"
        >
          <p class="detail-wrapper" :class="{'playing': index === currentIndex}">
            <span class="name">{{ item.name }} - </span>
            <span class="singer" v-for="singer in item.ar" :key="singer.id">{{ singer.name }} </span>
          </p>
        </div>
      </div>
    </slider>
  </div>
</template>

<script>
import Slider from "components/slider/Slider"
import { mapGetters, mapMutations } from "vuex"
export default {
  data () {
    return {

    }
  },
  components: {
    Slider
  },
  computed: {
    ...mapGetters(["currentList", "currentIndex"])
  },
  methods: {
    ...mapMutations({
      setIndex: "SET_CURRENTINDEX"
    }),
    changeIndex(index) {
      this.setIndex(index)
      // console.log(index)
    },
    close() {
      this.$emit("close")
    }
  },
  mounted () {
    setTimeout(() => {
      let slider = this.$refs.slider
      let items = document.querySelectorAll(".item")
      slider.scrollToElement(items[this.currentIndex], 1000)
    }, 20);
  },
  watch: {
    currentIndex() {
      this.$nextTick(() => {
        let slider = this.$refs.slider
        let item = document.querySelector(".playing")
        slider.scrollToElement(item, 1000)
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
@import "~style/mixin.styl";
.playList
  position absolute
  bottom 0
  left 0
  right 0
  top 0
  .bg-cover
    width 100%
    height 100%
    background-color rgba(0,0,0,.5)
  .wrapper
    position absolute
    background-color #F3F3F3
    width 100%
    top 40%
    height 60%
    overflow hidden
    border-radius 15px 15px 0 0 
    .content
      padding 0 10px
      .item
        line-height 50px
        .detail-wrapper
          textWrap()
          .singer
            font-size 12px
            // color #AFAFAF
.playing
  color #DA635C
</style>
