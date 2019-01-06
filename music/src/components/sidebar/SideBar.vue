<template>
  <div class="side-bar">
    <div class="btn" @click="toLogin" v-if="!profile">登录</div>
    <div class="user-info" v-if="profile">
      <img :src="profile.avatarUrl" alt="" class="avatar" width="100" height="100">
      <p class="name">{{ profile.nickname }}</p>
      <p class="level">{{ profile.birthday | birth }}</p>
      <div class="btn" @click="logout">退出</div>
    </div>
  </div>
</template>

<script>
import { logout } from "api/user"
import { mapGetters, mapMutations } from "vuex"
export default {
  computed: {
    ...mapGetters(["profile"])
  },
  methods: {
    ...mapMutations({
      setProfile: "SET_PROFILE"
    }),
    toLogin() {
      this.$emit('close')
      this.$router.push('/login')
    },
    logout() {
      logout().then(res => {
        console.log(res)
        this.setProfile(null)
        window.localStorage.removeItem("profile")
      })
    }
  },
  filters: {
    birth(val) {
      let date = new Date(parseInt(val))
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return `${year}/${month}/${day}`
    }
  }
}
</script>

<style scoped lang='stylus'>
.side-bar
  position fixed
  top 0
  bottom 0
  left 0
  right 15%
  z-index 999
  background-color #222
  display flex
  align-items center
  justify-content center
  text-align center
  .btn
    background #DD4137
    width 100px
    text-align center
    border-radius 15px
    font 700 14px/30px "宋体"
    color #ffffff
  .user-info
    p
      color #ffffff
      margin 10px 0
      text-align center
</style>
