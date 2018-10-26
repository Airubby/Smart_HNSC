import request from '@/utils/request'
import Qs from 'querystring'

// 全局变量
var version = 'v1'
var host = `/apply/${version}`

// 预算申报

/**
 * [getCostApplyYearStatus 预算申报-年初申报预算-顶部流程状态]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getCostApplyYearStatus(arg) {
  return request.get(`/apply/costApply/yearStatus`, {
    params: arg
  });
}
/**
 * [getCostApplyHistoryList 预算申报-年初申报预算-历史操作记录]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getCostApplyHistoryList(arg) {
  return request.get(`/apply/costApply/historyList`, {
    params: arg
  });
}




/**
 * [addJustifyApply 新增编辑调整预算申报接口]
 * @params Object
 **/

export function addJustifyApply(arg) {
  return request.get(`${host}/apply/addJustifyApply`, Qs.stringify(arg), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// /**
//  * [getFirstApplyList GET 获取当前用户所在部门的一上预算申报（例如：信息中心2018年年初预算一上申报）]
//  * @params Object
//  **/

// export function getFirstApplyList(arg) {
//   return request.get(`${host}/apply/getFirstApplyList`, {
//     params: arg
//   })
// }

// /**
//  * [getJustifyApplyList 获取当前用户所在部门的调整预算申报（例如：信息中心2018年调整预算申报）]
//  * @params Object
//  **/

// export function getJustifyApplyList(arg) {
//   return request.get(`${host}/apply/getJustifyApplyList`, arg)
// }

// /**
//  * [getSencondApplyList 获取二上预算申报（例如：信息中心2018年年初预算一上申报）]
//  * @params Object
//  **/

// export function getSencondApplyList(arg) {
//   return request.get(`${host}/apply/getSencondApplyList`, arg)
// }


// // 预算批复
// /**
//  * [getReplyJustifyApplyList 获取该部门调整预算申报（例如：信息中心2018年调整预算申报）]
//  * @params Object GET
//  **/

// export function getReplyJustifyApplyList(arg) {
//   return request.get(`${host}/reply/getJustifyApplyList`, arg)
// }
// /**
//  * [getOfficeReplyList 获取临时局机关预算批复]
//  * @params Object GET
//  **/

// export function getOfficeReplyList(arg) {
//   return request.get(`${host}/reply/getOfficeReplyList`, arg)
// }
// /**
//  * [getReplySecApplyList 获取二上预算申报（例如：信息中心2018年年初预算一上申报）]
//  * @params Object
//  **/

// export function getReplySecApplyList(arg) {
//   return request.get(`${host}/reply/getSencondApplyList`, arg)
// }
