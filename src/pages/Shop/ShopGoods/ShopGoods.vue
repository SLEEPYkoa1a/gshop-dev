<template>
    <div class="goods">
      <div class="menu-wrapper">
        <ul class="scroll-content" @click="_initScroll">
          <li class="menu-item" :class="{current: index === currentType}" v-for="(type, index) in shopGoods"
              :key="index" @click.stop="jumpTo(index)" >
            <span class="text bottom-border-1px">
              <img class="icon" :src="type.icon" v-if="type.icon" alt="" >
              {{type.name}}
            </span>

          </li>
        </ul>
      </div>

      <div class="foods-wrapper">
        <ul class="scroll-content">
          <li class="food-list-hook" v-for="(type, index) in shopGoods" :key="index">
            <h1 class="title">{{type.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, num) in type.foods" :key="num"
                  @click="showDetail(index, num, true)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}} {{index}}</span>
                  </div>
                  <div class="price">
                    <span class="now">${{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">${{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper" >
                    <CartControl  :type-index="index" :food-index="num"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>

        <transition name="fade">
          <div class="food-detail" v-if="showFood">
            <div class="detail-content">
              <div class="food-img">
                <img :src="this.thisFood.image" alt="">
                <div class="material">{{this.thisFood.info}}</div>
              </div>
              <div class="description">
                <h2 class="name">{{this.thisFood.name}}</h2>
                <div class="detail-info">月售{{this.thisFood.sellCount}}份 好评率{{this.thisFood.rating}}%</div>
                <div class="price">${{this.thisFood.price}}</div>
              </div>
              <div class="cartcontrol-wrapper" >
                <CartControl  :type-index="this.typeIndex" :food-index="this.foodIndex"></CartControl>
              </div>
            </div>

            <div class="detail-cover" @click="showDetail(0, 0, false)"></div>
          </div>
        </transition>
      </div>


    </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import {mapState} from "vuex"
  import CartControl from '../../../components/CartControl/CartControl.vue'
  export default { //向外暴露
    data() {
      return {
        menuScrollY: 0,
        GoodsScrollY: 0,
        showFood: false,
        typeIndex: 0,
        foodIndex: 0
      }
    },
    components: {
      CartControl
    },
    computed: {
      ...mapState(['shopGoods']),
      typeTops(){
        var tops = []
        var temp = 0
        var goods = this.shopGoods

        for(let i = 0; i < goods.length; i++){
          if(i<1){
            tops[i] = temp
              26 + goods[i].foods.length * 118

          }else{
            tops[i] = tops[i-1] + 26 + goods[i-1].foods.length * 118
          }
        }

        return tops
      },
      currentType() {
        for(let i = 0; i < this.typeTops.length-1; i++){
          if(-this.GoodsScrollY < this.typeTops[i+1]){
            return i
          }
        }
        return this.typeTops.length-1
      },
      thisFood() {
        return this.shopGoods[this.typeIndex].foods[this.foodIndex]
      }
    },
    watch :{
      shopGoods(value){
        this.$nextTick(()=>{
          console.log('watch中初始化')
          this._initScroll()
        })
      }
    },
    mounted(){
      console.log('mounted中初始化')

      this.$store.dispatch('getShopGoods')
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll('.menu-wrapper', {
          scrollY: true,
          click: true,
          probeType: 2 // listening scroll hook
        })
        this.menuScroll.on('scroll', ({x, y})=> {
        })

        this.goodsScroll = new BScroll('.foods-wrapper',{
          click: true,
          scrollY: true,
          probeType: 2
        })
        this.goodsScroll.on('scroll', ({x, y})=> {
          this.GoodsScrollY = y
        })
        this.goodsScroll.on('scrollEnd', ({x, y})=> {
          this.GoodsScrollY = y
        })

      },
      jumpTo(index){
        console.log("jumpto中初始化")
        let {goodsScroll} = this
        let scrollY = this.typeTops[index]
        this.GoodsScrollY = -scrollY
        goodsScroll.scrollTo(0, -scrollY-1 , 500)
      },
      showDetail(index, num, showOrNot){
        if(showOrNot){
          this.showFood = true
          this.typeIndex = index
          this.foodIndex = num
        }else {
          this.showFood = false
        }
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display flex
    position: absolute
    top: 195px
    bottom: 8%
    width: 100%
    overflow hidden
    background: #fff

    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      overflow hidden
      .menu-item
        display table
        width: 56px
        padding 0 12px
        height 54px
        line-height 14px
        &.current
          position: relative
          z-index: 1
          margin-top -1px
          background #fff
          color green
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          bottom-border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        height 82px
        padding-bottom 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex 0 0 57px
          marigin-right 10px
        .content
          padding 2px 0 0 10px
          flex 1
          .name
            margin 2px 0 8px 0px
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            line-height 12px
            margin-bottom 8px
            text-overflow ellipsis
            white-space: nowrap
            overflow hidden
            width 100px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            /*outline 1px solid blue*/
            position absolute
            right 0
            bottom 12px
            font-size 14px



      .food-detail
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        display flex
        /*border 1px solid red*/
        z-index 100
        justify-content center
        align-items center
        &.fade-enter-active,&.fade-leave-active
          transition opacity .5s
        &.fade-enter,&.fade-leave-to
          opacity 0
        .detail-cover
          position absolute
          /*display none*/
          width 100%
          height: 100%
          background-color rgba(0, 0, 0, 0.5)
          z-index: 10
        .detail-content
          /*border 1px solid red*/
          position absolute
          z-index: 11
          border-radius 10px
          overflow hidden
          background-color white
          width 80%
          .food-img
            position relative
            /*outline 1px solid*/
            width 100%
            img
              width 100%
            .material
              color white
              font-size 12px
              position absolute
              bottom 10px
              margin 0 13px
          .description
            padding 10px
            font-size 16px
            line-height 20px
            .name
              font-weight 800
            .detail-info
              font-size 12px
              color rgb(153,157,161)
            .price
              margin-top 10px
              color red

          .cartcontrol-wrapper
            /*outline 1px solid blue*/
            position absolute
            right 10px
            bottom 12px
            font-size 14px
</style>
