/*ajax请求模块
* 返回promise对象（异步返回的是response.data）*/
import axios from 'axios'
export default function ajax (url, data={}, type='GET') {
  return new Promise(function (resolve, reject){
    let promise

    if(type === 'GET'){
      let dataStr = ''
      Object.keys(data).forEach(key =>{
        dataStr += key + '=' + data[key] + '&'
      })

      if (dataStr !== ''){
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))//去掉最后一个&
        url = url + '?' + dataStr
      }
      //发送请求
      promise = axios.get(url)
    }
    else {
      //发送post请求
      promise = axios.post(url, data)
    }

    promise.then(response => {
      resolve(response.data)
    })
      .catch(error => {
        reject(error)
      })
  })
}
