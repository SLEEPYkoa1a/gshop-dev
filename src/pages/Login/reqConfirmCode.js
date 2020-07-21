import {randomCode, sendCode} from './sms_util'

export function reqConfirmCode(phone) {
  //1. 获取请求参数数据
  var phone = phone;
  //2. 处理数据
  //生成验证码(6位随机数)
  // var code = randomCode(6);
  var code = "123456"
  //发送给指定的手机号
  console.log(`向${phone}发送验证码短信: ${code}`);
  sendCode(phone, code,
  //   function (success) {//success表示是否成功
  //   if (success) {
  //     users[phone] = code
  //     console.log('保存验证码: ', phone, code)
  //     res.send({"code": 0})
  //   } else {
  //     //3. 返回响应数据
  //     res.send({"code": 1, msg: '短信验证码发送失败'})
  //   }
  // }
  )

}
