// 引入配置
import {baseUrl} from './config.js'
export default function (url, data = {}, method = "GET") {
return new Promise((resolve,reject)=>{
  wx.request({
    method,
    url: baseUrl + url,
    data,
    success: (res) => {
      // console.log(res)
      // 判断当前是否是在登录
      if(data.isLogin){

        // 对请求回来的cookie进行操作
        const cookie = res.cookies.find((item)=>{
         return item.indexOf('MUSIC_U')===0
        })
        // 将cookie缓存起来
        wx.setStorage({
          key: 'cookie',
          data: JSON.stringify(cookie),
        })
       
      }
      // onsole.log(res)
      //调用成功方法,返回一个成功的promise对象
      resolve(res.data)
    },
    header:{
      'Cookie':JSON.parse(wx.getStorageSync("cookie")||'[]').toString()
    }
  })

})

}