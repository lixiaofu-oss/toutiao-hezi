/* 
  素材请求相关模块
*/

import request from '@/utils/request2'

/* 
  上传图片素材
*/
export const myLeaveList = params => {
  return request({
    method: 'GET',
    url: '/workleave/myLeaveList',
    //正常的文件上传接口要求 Content-Type 设置为 multipart/form-data
    //一般文件上传的接口都要求把请求头中的 Content-Type 设置为 multipart/form-data，但是我们使用 axios 上传文件的话不需要手动设置
    //你只要给 data 一个 FromData 对象那个即可
    // new FromData()
    params
  })
}
