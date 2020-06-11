
import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS
} from './mutations-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops
} from '../api'

export  default {
  //异步获取信息

  async getAddress({commit,state}){
    //发送异步ajax请求
    const geoHash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geoHash)  //这里需要去看接口文档来获取到需要的address,用acync/await来获取
    if(result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }

  },
  async getCategory ({commit}){
    const result = await reqFoodCategorys()

    if(result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  async getShops({commit, state}) {
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
  }
}
