// 引入对应的请求地址
import {baseUrl} from './config.js'
// 定义一g个jax二次封装的函数
export default function(url,data={},method="GET"){
  return new Promise((resolve,reject)=>{
    wx.request({
     method,
     url: baseUrl+url,
     data,
     header:{
      cookie:JSON.parse(wx.getStorageSync('cookie')||'[]')
     },
     success:(res)=>{
      //  console.log(res)
      // 判断是否是在登录
      if(data.isLogin){
        // 对获取到的缓存行操作
        const cookie=res.cookies.find(item=>{
          return item.indexOf('MUSIC')===0
        })
        // 将操作后的cookie缓存起来
        wx.setStorage({
          key: 'cookie',
          data: JSON.stringify(cookie),
        })
      }
        resolve(res.data)
        }
    })
  })
}