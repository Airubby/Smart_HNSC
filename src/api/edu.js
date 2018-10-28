import request from '@/utils/request'
import Qs from 'querystring'

// 教育培训模块

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
