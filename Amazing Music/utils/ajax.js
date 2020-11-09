// 引入对应的请求地址
import {baseUrl} from './config.js'
// 定义一g个jax二次封装的函数
export default function(url,data={},method="GET"){
  return new Promise((resolve,reject)=>{
    wx.request({
     method,
     url: baseUrl+url,
     data,
     success:(res)=>{
        resolve(res.data)
        }
    })
  })
}