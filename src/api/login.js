import request from '@/utils/request'
import Qs from 'querystring'

var version = 'v1'

export function login(userInfo) {
  return request.post(`/apply/${version}/security/login`, Qs.stringify({
    account: userInfo.account,
    password: userInfo.password,
    viewcode: userInfo.viewcode,
    appcode: userInfo.appcode,
    logintype: 'FORM' // 登录方式 默认必填
  }),
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


export function logout() {
  return request({
    url: `/apply/${version}/security/logout`,
    method: 'post'
  })
}
