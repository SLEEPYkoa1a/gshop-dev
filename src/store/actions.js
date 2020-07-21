
import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
  RECEIVE_RECORD_USER,
  RECEIVE_USER,
  RESET_USER_INFO,
  GET_SHOP_GOODS,
  GET_SHOP_RATINGS,
  GET_SHOP_INFO,
  UPDATE_CART,
  CLEAR_CART,
  ADD_USER
} from './mutations-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api'

export  default {
  //异步获取信息

  async getAddress({commit,state}){
    //发送异步ajax请求
    const geoHash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geoHash)  //这里需要去看接口文档来获取到需要的address,用acync/await来获取
    console.log(result)
    if(result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }

  },
  //获取食品分类
  async getCategory ({commit}){
    const result = await reqFoodCategorys()

    if(result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  //获取店铺列表
  async getShopList({commit, state}) {
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  getCategorys({commit}, categorys){
    commit(RECEIVE_ADDRESS, {categorys})
  },
  getShops({commit}, shops){
    commit(RECEIVE_SHOPS, {shops})
  },

  //同步记录用户登录信息
  recordUser({commit}, userInfo) {
    commit(RECEIVE_RECORD_USER, {userInfo})
  },
  //更新购物车
  updateCart({commit}, cartInfo) {
    commit(UPDATE_CART, {cartInfo})
  },
  //清空购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  },
  //同步添加新用户
  addUser({commit},newUser) {
    commit(ADD_USER, {newUser})
  },
  //异步获取已登录的用户信息
  async getUserInfo({commit}) {
    // const result = await reqUserInfo()
    // if(result.code === 0){
    //   const userInfo = result.data
    //   commit (RECEIVE_USER, {userInfo})
    // }
  },

  //异步登出,为开启后台时的登出方式,ajax请求登出
  // async reqLogout({commit}) {
    // const result = await reqLogout()
    // if(result.code === 0){
    //   commit (RESET_USER_INFO)
    // }
  // },

  //本地同步登出,只需要修改state.userInfo
  reqLogout({commit}){
    commit(RESET_USER_INFO)
  },

  //获取shop页面数据

  async getShopGoods ({commit}){
    const result = await reqShopGoods()
    if(result.code === 0){
      const shopGoods = result.data
      commit(GET_SHOP_GOODS, {shopGoods})
    }
  },

  async getShopRatings ({commit}) {
    const result = await reqShopRatings()
    if(result.code === 0){
      const shopRatings = result.data
      commit(GET_SHOP_RATINGS, {shopRatings})
    }
  },
  //获取用户登录信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if(result.code === 0) {
      const shopInfo = result.data
      commit(GET_SHOP_INFO, {shopInfo})
    }
  }
}

