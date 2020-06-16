
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_RECORD_USER,
  RESET_USER_INFO
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
    console.log('1')
    state.userInfo = {}
  }
}
