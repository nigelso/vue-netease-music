<template>
  <div class="login">
    <back-header :text="text"></back-header>
    <div class="login-form">
      <div class="email">
        <span class="iconfont">&#xe644;</span>
        <input type="text" placeholder="请输入邮箱帐号" autofocus="autofocus" v-model.trim="email">
      </div>
      <div class="password">
        <span class="iconfont">&#xe669;</span>
        <input type="password" placeholder="请输入密码" autofocus="autofocus" v-model.trim="password">
      </div>
      <button class="btn" @click="_login">登录</button>
    </div>
  </div>
</template>

<script>
import BackHeader from "components/backheader/BackHeader"
import { login, userStatus } from "api/user"
import { mapMutations } from "vuex"
import axios from "axios"
export default {
  data () {
    return {
      text: "网易邮箱账号登录",
      email: '',
      password: ''
    }
  },
  components: {
    BackHeader
  },
  methods: {
    ...mapMutations({
      setProfile: "SET_PROFILE"
    }),
    handleChange(e) {
      console.log(e)
    },
    handleSubmit(e) {
      console.log(e)
    },
    _login() {
      login(this.email, this.password).then(res => {
        console.log(res)
        if(res.code === 200) {
          this.setProfile(res.profile)
          window.localStorage.setItem('profile', JSON.stringify(res.profile))
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
.login
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color #fff
  .login-form
    margin-top 100px
    padding 0 10px
    .email,.password
      margin-bottom 20px
      border-bottom 1px solid #DEDEDE
      color #DEDEDE
      padding-bottom 5px
      display flex
      .iconfont
        font-size 18px
    .btn
      display block
      width 100%
      font-size 16px
      border none
      background #dd4137
      height 40px
      border-radius 20px
      color #ffffff
  input
    outline none
    border none
    padding-left 5px
    flex 1
    font-size 16px
    caret-color #dd4137
    &::-webkit-input-placeholder
      color #DEDEDE
</style>
