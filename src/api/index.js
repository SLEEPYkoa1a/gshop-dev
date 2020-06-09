/*包含n个接口请求函数
* 函数的返回值：promise*/
import ajax from './ajax'
// [1、根据经纬度获取位置详情]
export const reqAddress = (geoHash) => ajax(`/position/${geoHash}`)
// [2、获取食品分类列表]
export const reqFoodTypes = () => ajax('/index_category')

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = (longitude, latitude) => ajax('/shops', {longitude, latitude})

// [4、根据经纬度和关键字搜索商铺列表]
export const reqShopList = (keyword, geohash) => ajax('/search_shops',{keyword, geohash})

// [5、获取一次性验证码]
export const reqCaptcha = () => ajax('/captcha')

// [6、用户名密码登陆]
export const login = ()

// [7、发送短信验证码](#7发送短信验证码)<br/>
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
// [10、用户登出](#10用户登出)<br/>
