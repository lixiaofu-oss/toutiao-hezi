/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'
// axios()
// axios.get()
// axios.post()

// 创建一个 axios 实例，说白了就是复制了一个 axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 请求的基础路径
  
  //定制后端返回的原始数据的处理
  // 参数data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // console.log(data)

    //后端返回的数据可能不是JSON 格式字符串
    //如果不是的话，那么 JSONbig.parse 调用就会报错
    //所以我们使用 try-catch 来捕获异常，处理异常的发生
    try{
      //如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      //如果转换失败了，则进入这里
      //我们在这里把数据原封不动的直接返回给请求使用
      return data
    }
    

    //axios 默认是在内部 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }],
})
//登录请求
//http://api-toutiao-web.itheima.net
//页面请求基础路径  这个登录接口进不去
//http://ttapi.research.itcast.cn

// 请求拦截器
request.interceptors.request.use(
  // 所有请求会经过这里
  //config 是当前请求相关的配置信息对象
  //config 是可以修改的
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))


    // 如果有登录用户信息，则统一设置 token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    //然后我们就可以在允许请求出去之前定制统一业务功能处理
    //例如：统一设置 token

    //当这里 return config 之后请求才会真正发出去
    return config
  }, function (error) {
    // 请求失败，会经过这里
    return Promise.reject(error)
  });


// 响应拦截器

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })