
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_RECORD_USER,
  RESET_USER_INFO,
  GET_SHOP_GOODS,
  GET_SHOP_RATINGS,
  GET_SHOP_INFO,
  UPDATE_CART,
  CLEAR_CART,
  ADD_USER
} from './mutations-types'

export  default {
  [RECEIVE_ADDRESS](state, {address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,{shops}) {
    state.shops = shops
  },
  [RECEIVE_RECORD_USER](state, {userInfo}){
    state.userInfo = userInfo
  },
  [RECEIVE_USER](state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state){
    state.userInfo = {}
  },
  [ADD_USER](state,{newUser}){
    state.userList.push(newUser)
  },
  [GET_SHOP_GOODS](state, {shopGoods}) {
    state.shopGoods = shopGoods
  },
  [GET_SHOP_RATINGS] (state, {shopRatings}) {
    state.shopRatings = shopRatings
  },
  [GET_SHOP_INFO] (state, {shopInfo}) {
    state.shopInfo = shopInfo
  },
  [UPDATE_CART] (state, {cartInfo}){
    state.cartInfo = cartInfo
  },
  [CLEAR_CART] (state){
    state.cartInfo = []
  }
}
