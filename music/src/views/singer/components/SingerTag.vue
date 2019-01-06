<template>
  <div class="tag">
    <slider class="wrapper" ref="slider" :scrollX="true">
      <div class="content" ref="content">
        <div class="tag-list">
          <div ref="hotItem" class="tag-item" @click="handleCode('hot')">
            <span>热门</span>
          </div>
          <div @click="handleCode(item.code)" class="tag-item" v-for="item in categoryList" :key="item.code" ref="tagItem">
            <span>{{ item.category }}</span>
          </div>
        </div>
      </div>
    </slider>
  </div>
</template>

<script>
import axios from "axios"
import Slider from "components/slider/Slider"
export default {
  data () {
    return {
      categoryList: [
        {
          category: "入驻",
          code: 5001
        },
        {
          category: "华语男",
          code: 1001
        },
        {
          category: "华语女",
          code: 1002
        },
        {
          category: "华语组合",
          code: 1003
        },
        {
          category: "欧美男",
          code: 2001
        },
        {
          category: "欧美女",
          code: 2002
        },
        {
          category: "欧美组合",
          code: 2003
        },
        {
          category: "日本男",
          code: 6001
        },
        {
          category: "日本女",
          code: 6002
        },
        {
          category: "日本组合",
          code: 6003
        },
        {
          category: "韩国男",
          code: 7001
        },
        {
          category: "韩国女",
          code: 7002
        },
        {
          category: "韩国组合",
          code: 7003
        },
        {
          category: "其他男",
          code: 4001
        },
        {
          category: "其他女",
          code: 4002
        },
        {
          category: "其他组合",
          code: 4003
        }
      ],
      code: "hot"
    }
  },
  components: {
    Slider
  },
  methods: {
    setWidth() {
      let slider = this.$refs.slider
      let content = this.$refs.content
      let items = this.$refs.tagItem
      let hot = this.$refs.hotItem
      let windowWidth = window.innerWidth
      let single = windowWidth / 4
      slider.$el.style.width = windowWidth + "px"
      let width = 0;
      items.forEach(element => {
        element.style.width = single + "px"
        width += single
        // element.$el.style.width = single + "px"
      })
      hot.style.width = single + "px"
      content.style.width = width + single + "px"
    },
    handleCode(code) {
      this.$emit("pushCode", code)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setWidth()
    })
    window.addEventListener("resize", () => {
      this.setWidth()
    })
  }
}
</script>

<style scoped lang='stylus'>
.tag
  margin-top 50px
  .wrapper
    background-color #222
    .content
      height 30px
      .tag-list
        display flex
        flex-wrap nowrap
        font-size 14px
        line-height 30px
        color #ffffff
        text-align center
        .tag-item
          &.router-link-active
            background-color #dd4137
            color #ffffff
.selected
  background-color #dd4137
</style>
