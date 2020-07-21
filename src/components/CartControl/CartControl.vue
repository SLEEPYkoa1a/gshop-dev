<template>
  <div class="wrapper">
    <transition name="move">
      <i class="iconfont icon-Remove" v-if="displayCount" @click.stop="updateCount(false)"></i>
    </transition>

    <span v-if="displayCount">{{displayCount}}</span>
    <i class="iconfont icon-AddwithcircleF" @click.stop="updateCount(true)"></i>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
      }
    },
    props: {
      typeIndex: Number,
      foodIndex: Number,
    },
    computed: {
      ...mapState(['shopGoods','cartInfo']),

      displayCount(){
        if(this.cartInfo.length === 0 ){//购物车为空,返回0
          return 0
        }else{//不为空,找name相同的food
          var thisFood = this.thisFood
          let tempFood = this.cartInfo.find(function(s){
            return s.name == thisFood.name
          })
          if(tempFood){
            //如果购cartInfo有此商品,则更新显示数量foodCount为cartInfo当中的数量
            return tempFood.count
          }else{
            return 0
          }
        }

      },
      thisFood () {
        return this.shopGoods[this.typeIndex].foods[this.foodIndex]
      }
    },
    methods: {
      updateCount(inOrDe){
        console.log(this.typeIndex, this.foodIndex)
        console.log("更新一次")

        var tempCount = inOrDe ? this.displayCount + 1 : this.displayCount - 1

        var cartInfo = this.cartInfo
        var {name, price} = this.thisFood


        //购物车为空,直接放入,数量为1
        if(cartInfo.length === 0) {

          cartInfo.push({
            name: name,
            typeIndex: this.typeIndex,
            foodIndex: this.foodIndex,
            count: tempCount,
            price: price
          })
        }else{

          //不为空,去找name相同的food
          var food = cartInfo.find(function(a){
            return a.name === name
          })

          // 如果没有购物车中没有当前商品,则添加一个
          if(!food) {
            cartInfo.push({
              name: name,
              typeIndex: this.typeIndex,
              foodIndex: this.foodIndex,
              count: tempCount,
              price: price
            })
          } else if(tempCount == 0) //有该商品,但是目前数量<=0,就删除
          {
            console.log("数量为0")
            cartInfo.splice(cartInfo.indexOf(food), 1)
          }
          else  //有该商品,且当前数量大于,则更新其数量
          {
            food.count = tempCount
          }
        }
      }
    },
    mounted () {
    },
    beforeUpdate () {
      this.$store.dispatch('updateCart',this.cartInfo)
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .wrapper
    display flex
    /*outline 1px solid*/
    font-size 18px
    height 30px
    align-items:center
    span
      /*outline 1px solid*/
      margin 0 8px
    .iconfont
      font-size 20px
      color rgb(2,167,116)
      &.icon-AddwithcircleF
        font-size 23px
      &.icon-Remove
        &.move-enter-active, &.move-leave-active
          transition all .2s
        &.move-enter, &.move-leave-to
          opacity 0
          transform translateX(15px) rotate(120deg)
</style>
