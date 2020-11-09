// 引入配置
import {baseUrl} from './config.js'
export default function (url, data = {}, method = "GET") {
return new Promise((resolve,reject)=>{
  wx.request({
    method,
    url: baseUrl + url,
    data,
    success: (res) => {
      // onsole.log(res)
      //调用成功方法,返回一个成功的promise对象
      resolve(res.data)
    }
  })

})

}