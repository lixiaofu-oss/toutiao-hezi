/* 
  用户相关请求模板
*/
import request from "@/utils/request.js";
//用户登录
export const login = data => {
  return request({
    method: "POST",
    url: "/mp/v1_0/authorizations",
    // data 用来设置 POST 请求体
    data: data
  })
}

//获取用户信息
export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user')) 

  return request({
    method: 'GET',
    url: "/mp/v1_0/user/profile"
    //后端要求把需要授权的用户身份放到请求头中
    //axios 可以通过 headers 选项设置请求头
    /* headers: {   //在request.js中统一设置了token，所以这里不需要
      //属性名和值都得看接口的要求
      // 属性名：Authorization，接口要求的
      // 属性值：Bearer空格token数据
      Authorization: `Bearer ${user.token}` 
      // Authorization: 'Bearer '+user.token
      // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDI1NzU4NDEsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.oZc1GytPFZm97GEZdoXvecTTZhUdayBXow4MdxL6SaQ'
    } */
  })
}
//修改用户的信息
// export const updateUser = () => {

// }