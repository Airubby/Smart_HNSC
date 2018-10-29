import request from '@/utils/request'
import Qs from 'querystring'

// 教育培训模块
// {
//   "Result": {
//     "Token": "f9170edc",
//     "AppID": "11111111-1111-1111-1111-111111111111",
//     "ViewID": "11111111-1111-1111-1111-111111111111",
//     "Account": "18908061520",
//     "Name": "太极测试账号",
//     "ID": "2630",
//     "Orgs": [
//       {
//         "User_ID": "2630",
//         "Org_ID": "519",
//         "View_ID": "11111111-1111-1111-1111-111111111111",
//         "Parent_ID": "10",
//         "User_Name": "太极测试账号",
//         "Org_Name": "第三方接入"
//       }
//     ],
//     "Funcs": [],
//     "IpAddress": "171.221.203.85",
//     "CreateTime": "2018-10-29T12:28:02.6125433+08:00"
//   },
//   "PagingInfo": null,
//   "Message": "操作成功",
//   "Code": 200
// }

/** 
 * [getEducationStatus 登录弹窗答题状态获取]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getEducationStatus(arg) {
  return request.get(`/education/getStatus`, {
    params: arg
  });
}

/**
 * [getLoginTitle 登录弹窗答题列表获取]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getLoginTitle(arg) {
  return request.get(`/education/getLoginTitle`, {
    params: arg
  });
}

/**
 * [postLoginTitleAnswer 提交登录弹窗答题]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function postLoginTitleAnswer(arg) {
  return request.get(`/education/postLoginTitleAnswer`, {
    params: arg
  });
}

/**
 * [getMyEduNumber 获取我的答题数量正确率及答题次数]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getMyEduNumber(arg) {
  return request.get(`/education/myEdu/getNumber`, {
    params: arg
  });
}

/**
 * [getMyEduTitle 获取我的答题列表信息]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getMyEduTitle(arg) {
  return request.get(`/education/myEdu/getTitle`, {
    params: arg
  });
}
