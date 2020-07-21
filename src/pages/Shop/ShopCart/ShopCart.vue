<template>
  <div class="shopcart-wrapper" >
    <div class="list-bottom" @click="toggle">
      <div class="left-icon">
        <i class="iconfont icon-shopping"></i>
        <span class="cart-count">{{cartInfo.length}}</span>
      </div>
      <div class="right-fee">
        <div class="price-current">
          <p>${{totalPrice}}</p>
          <p>配送费4元</p>
        </div>
        <div class="price-gool" v-if="checkOut">还差{{checkOut}}元起送</div>
        <div class="price-gool enough" v-if="!checkOut" @click="countPrice">结  算</div>
      </div>
    </div>

    <transition name="move">
      <div class="food-list" v-if="showList">
        <div class="cartTitle bottom-border-1px" >
          <span>购物车</span>
          <button @click="clearCart">清空</button>
        </div>
        <div class="list-content">
          <ul >
            <li class="top-border-1px" v-for="(food, index) in cartInfo" :key="index">
            <span>
              {{food.name}}
            </span>
              <span class="foodPrice">${{food.price * food.count}}</span>
              <CartControl :type-index="food.typeIndex" :food-index="food.foodIndex"></CartControl>
            </li>
          </ul>
        </div>

      </div>
    </transition>
    <transition name="fade">
      <div class="list-cover" v-if="showList" @click="toggle"></div>
    </transition>


  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import BScroll from '@better-scroll/core'
  export default { //向外暴露
    data (){
      return {
        showList : false
      }
    },
    computed : {
      ...mapState(['cartInfo','shopInfo']),
      totalPrice(){
        let result = 0
        if(this.cartInfo.length){
          for( var temp of this.cartInfo){
            result += temp.count*temp.price
          }
        }
        return result
      },
      checkOut(){
        return this.shopInfo.minPrice - this.totalPrice > 0 ? this.shopInfo.minPrice - this.totalPrice : 0
      }
    },
    components: {
      CartControl
    },
    methods: {
      toggle(){
        this.showList = !this.showList
        if(this.showList){
          this.$nextTick(() => {
            this.scroll = new BScroll('.list-content',{
              click: true
            })
            console.log('1')
//            if(!this.scroll){
//              this.scroll = new BScroll('.list-content'),{
//                click: true
//              }
//            }else{
//              this.scroll.refresh()
//            }
          })
        }
      },
      clearCart(){
        this.$store.dispatch('clearCart')
      },
      countPrice(){
        this.$router.replace('/checkOut')
      }
    },
    watch:{
//      cartInfo: function(value){
//        if(value.length === 0){
//          this.showList = false
//        }
//
//      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .shopcart-wrapper

    position fixed
    z-index 2
    left 0px
    right 0px
    bottom 0px
    height 8%
    font-size 16px
    /*height 8%*/
    .list-bottom
      position fixed
      z-index 3
      left 0px
      right 0px
      bottom 0px
      height 8%
      padding-left 15px
      background-color rgb(18,28,38)
      display flex
      align-items flex-end
      justify-content flex-end
      .left-icon
        position relative
        background-color green
        height 46px
        width 46px
        border-radius  50%
        border 8px solid rgb(18,28,38)
        display flex
        align-items center
        justify-content space-around
        margin-right 5px
        .iconfont
          font-size 25px
          color white
        .cart-count
          display flex
          justify-content center
          align-items center
          position absolute
          top -6px
          right -6px
          color white
          background-color red
          width 23px
          height 15px
          border-radius 8px
          box-shadow 0 0 10px rgba(0, 0, 0, 1)
      .right-fee
        height 100%
        color white
        flex-grow 1
        display flex
        justify-content space-between
        font-size 12px
        align-items center
        .price-current
          p:nth-child(1)
            font-size 18px
            font-weight 800
            margin-bottom 3px
            padding-left 10px
          p:last-child
            font-size 12px
            color grey
        .price-gool
          color white
          padding-right 5px
          font-weight 700
          height 100%
          width 90px
          display flex
          align-items center
          justify-content center
          background-color rgb(40,50,58)
          &.enough
            background-color rgb(59,167,118)
    .food-list
      position absolute
      width 100%
      top 0
      transform translateY(-100%)
      background-color white
      z-index 2
      &.move-enter-active,&.move-leave-active
        transition all .5s
      &.move-enter,&.move-leave-to
        transform translateY(0)
      .cartTitle
        padding 0px 10px
        display flex
        justify-content space-between
        height 30px
        align-items center
        background-color rgb(241,245,247)
        top-border-1px(rgba(7, 17, 27, 0.1))
        button
          display inline-block
          border 1px solid rgb(241,245,247)
          height 100%
          letter-spacing 3px
      .list-content
        max-height 200px
        overflow hidden
        ul
          li
            padding 10px
            display flex
            align-items center
            top-border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
              padding-bottom 20px
            span:first-child
              width 60%
            .foodPrice
              flex-grow 1
              color red
              font-weight 700

    .list-cover
      position fixed
      background-color rgba(0, 0, 0, .4)
      left 0
      right 0
      top 0
      bottom 8%
      z-index: 1
      &.fade-enter-active,&.fade-leave-active
        transition opacity .5s
      &.fade-enter, &.fade-leave-to
        opacity 0

</style>


