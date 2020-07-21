<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginClass}" @click="loginClass = true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginClass}" @click="loginClass = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginClass}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!getRightPhone || confirmTime > 0" @click.prevent="getConfirm"
                      class="get_verification" :class="{right_phone: getRightPhone }">
                {{confirmTime > 0 ? '已发送('+ confirmTime + ')' : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="confirmCode">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginClass}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <!--<input type="password">-->
                <input type="text" maxlength="8" placeholder="密码"
                       v-if="!crypto"  v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码"
                       v-if="crypto" v-model="pwd">
                <div class="switch_button" :class="crypto? 'on' : 'off'" @click="crypto=!crypto">
                  <div class="switch_circle" :class="{right:crypto}"></div>
                  <span class="switch_text">{{crypto? '...' : 'abc'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <!--注释的是从后台获取图片验证码-->
                <!--<img class="get_verification" src="http://localhost:4000/captcha"-->
                     <!--@click="getCaptcha" ref="captcha" >-->
                <img class="get_verification" src="./images/captcha.svg"
                     ref="captcha" >
              </section>
            </section>
          </div>
          <input type="button" class="login_submit" @click="login" value="登录">
          <!--<button class="login_submit" @click="login2">登录</button>-->
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="goTo('/profile')">
        <i class="iconfont icon-arrowleft"></i>
      </a>
    </div>
    <LoginTip :alertText="alertText" v-if="loginTipDisplay" @closeTip="closeTip"></LoginTip>
  </section>
</template>

<script>
  import LoginTip from '../../components/LoginTip/LoginTip.vue'
  import {reqConfirmCode, reqCodeLogin, reqPwdLogin  } from '../../api/index'
//  import {reqCodeLogin, reqPwdLogin } from '../../api/index'
//  import {reqConfirmCode} from './reqConfirmCode'
  import {mapState} from 'vuex'
  export default { //向外暴露
    data() {
      return {
        loginClass: true,  //默认短信登录，为true
        phone: '',//手机号
        confirmTime: 0, //发送验证码倒计时
        confirmCode: '', //短信验证码
        crypto: true, //密码显示
        pwd: '',
        name: '', //用户名
        captcha: '', //图片验证码
        alertText: '',//登录提示文字
        loginTipDisplay: false //是否显示登录提示
      }
    },
    computed: {
      getRightPhone() {
        return /^1\d{10}$/.test(this.phone)
      },
      ...mapState(['userList','capt','confirm'])

    },
    methods: {
      goTo(path) {
        this.$router.replace(path)
      },
      async getConfirm () {
        //倒计时
        if(!this.confirmTime){
          this.confirmTime = 30
          this.intervalId = setInterval(() =>{
            this.confirmTime --
            if(!this.confirmTime){
              clearInterval(this.intervalId)
            }
          }, 1000)
        }
        //ajax
        const result = await reqConfirmCode(this.phone)

        if(result.code === 0){
          this.showLoginTip('验证码为:'+ result.data)

        }
//        if(result.code === 1) {
//          this.showLoginTip(result.msg)
//          if(this.confirmTime){
//            this.confirmTime = 0
//            clearInterval(this.intervalId)
//            this.intervalId = undefined
//          }
//        }

      },
      //登录按钮：1，检查输入合法性，2，实现登录功能
      async login() {

        const {name, pwd, captcha, confirmCode, phone} = this
        let result
        let loginUser
        //loginClass表示登录方式,true为手机验证码登录
        if(this.loginClass) {
          //1合法性检查
          if(!this.getRightPhone){
            //手机号错误
            this.showLoginTip("手机号错误")
            return

          }
          else if(!/^\d{6}$/.test(confirmCode)){
            //验证码没填
            this.showLoginTip("验证码错误")
            return
          }

          //以下注释部分为有后端时的短信验证登录
//          result = await reqCodeLogin(phone, confirmCode)

          //以下代码使用本地模拟验证短信
          else if(this.confirm != confirmCode){
            result = {
              code:1,
              msg: "验证码有误"
            }
          }
          else{
            //验证码通过,查看用户列表是否有此手机用户
            loginUser = this.userList.find(function(value, index){
              return value.phone === phone
            })
            //无此用户,添加进去
            if(!loginUser){

              result = {
                code: 0,
                data: {
                  _id: this.userList.length+1,
                  phone: this.phone
                }
              }
              this.$store.dispatch('addUser',result.data)
            }
            //有此用户,直接返回
            else{
              result = {
                code: 0,
                data: loginUser
              }
            }
            //以上代码为本地模拟短信登录

          }
        }else{
          if(!name){
            //用户名需要填写
            this.showLoginTip("用户名需要填写")
            return
          }else if(!pwd){
            //密码需要填写
            this.showLoginTip("密码需要填写")
            return
          }else if(!captcha){
            //图片验证码需要填写
            this.showLoginTip("图片验证码需要填写")
            return
          }
          //注释的是调用后台登录的代码
//          result = await reqPwdLogin({name, pwd, captcha})


          //以下是本地检测用户,直接返回用户数据
          if(captcha != this.capt){
            this.showLoginTip('验证码错误')
            return
          }
          loginUser = this.userList.find(function(value,index){
            return value.name === name
          })

          if(!loginUser || loginUser.pwd != pwd){
            result = {
              code: 1,
              msg: '用户名或密码错误'
            }
            console.log(result)
          }else{
            result = {
              code: 0,
              data:{
                _id: loginUser._id,
                name: loginUser.name,
                phone: loginUser.phone
              }
            }
          }
        }


        //清除定时
        if(this.confirmTime){
          this.confirmTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
        //登录成功
        if(result.code === 0){
          //添加登录用户信息
          const userInfo = result.data
          this.$store.dispatch('recordUser', userInfo)
          //路由跳转
          this.$router.replace('/profile')
        }else{
          this.showLoginTip(result.msg)

          //启用后台api需要刷新验证码
//          this.getCaptcha()

          //本地模拟登录不需要刷新
        }

      },

      //输入错误提示
      showLoginTip (alertText){
        this.loginTipDisplay = !this.loginTipDisplay
        this.alertText = alertText
      },
      //关闭错误提示
      closeTip(){
        this.loginTipDisplay = false
        this.alertText = ''
      },
      getCaptcha () {
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      }

    },
    components: {
      LoginTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                   color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    position absolute
                    right 4px
                    float right
                    color #ddd
                &.on
                  background #02a774
                  .switch_text
                    position absolute
                    left 8px
                    bottom 3px
                    /*float left*/
                    color white
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s

                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
