<template>
  <div class="shop-wrapper">
    <ShopHeader>
    </ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/shopgoods">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopratings" >评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopinfo">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
    <ShopCart></ShopCart>
  </div>
</template>

<script>
  import ShopHeader from './ShopHeader/ShopHeader.vue'
  import ShopGoods from './ShopGoods/ShopGoods.vue'
  import ShopRatings from './ShopRatings/ShopRatings.vue'
  import ShopInfo from './ShopInfo/ShopInfo.vue'
  import ShopCart from './ShopCart/ShopCart.vue'
  export default { //向外暴露
    data() {
      return{

      }
    },
    mounted() {
      this.$store.dispatch('getShopInfo')
      this.$store.dispatch('getShopRatings')
//      this.$store.dispatch('getShopGoods')
    },
    components: {
      ShopHeader,
      ShopGoods,
      ShopRatings,
      ShopInfo,
      ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  /*.shop-wrapper*/
    /*position relative*/
    .tab
      height 40px
      line-height 40px
      background #fff
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        float left
        width: 33.33333%
        text-align center
        font-size 14px
        color rgb(77, 85, 93)
        a
          display block
          position relative
          &.router-link-active
            color #02a774
            &::after
              content ''
              position absolute
              left 50%
              bottom 1px
              width 35px
              height 2px
              transform translateX(-50%)
              background #02a774
</style>
