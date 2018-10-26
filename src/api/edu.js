import request from '@/utils/request'
import Qs from 'querystring'

// 教育培训模块

/**
 * 该接口仅供参考使用
 * [getCostApplyYearStatus 预算申报-年初申报预算-顶部流程状态]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getCostApplyYearStatus(arg) {
  return request.get(`/apply/costApply/yearStatus`, {
    params: arg
  });
}
