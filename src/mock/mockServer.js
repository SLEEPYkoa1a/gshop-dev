import data from './data.json'
import Mock from 'mockjs'
// import svgCaptcha from 'svg-captcha'
// var captcha = require('svg-captcha')
Mock.mock('/goods', {code: 0, data: data.goods})
Mock.mock('/ratings', {code: 0, data: data.ratings})
Mock.mock('/info', {code: 0, data: data.info})
Mock.mock('/position', {code: 0, data: data.position})
Mock.mock('/index_category', {code: 0, data: data.index_category})
Mock.mock('/shops', {code: 0, data: data.shops})
Mock.mock('/search_shops', {code: 0, data: data.search_shops})
Mock.mock('/confirm_code', {code: 0, data: data.confirm_code})
Mock.mock('/login_pwd', {code: 0, data: data.login_pwd})
Mock.mock('/login_sms'), {code: 0, data: data.login_sms}
// Mock.mock('/userinfo', {code: 0, data: data.userInfo})
// Mock.mock('/userinfo', {code: 0, data: data.userInfo})
// var captcha = svgCaptcha.create({
//   ignoreChars: '0o1l',
//   noise: 2,
//   color: true
// })
//发送图片验证码
// Mock.mock('/captcha', {code: 0, data: captcha.data})

