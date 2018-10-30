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



/**
 * [getMyEduTitle 获取我的答题列表信息，错题列表]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getMyEduTitle(arg) {
  return request.get(`/api/Education/SearchWrongExamByUserID`, {
    params: arg
  });
}


/**
 * [randomSubject 获取登录弹窗答题,抽取答题列表]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function randomSubject(arg) {
  return request.get(`/api/Education/RandomSearchEducationSubject`, {
    params: arg
  });
}

/**
 * [submitExam 提交登录弹窗答题]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function submitExam(arg) {
  return request.get(`/api/Education/SubmitExam`, {
    params: arg
  });
}

/**
 * [getExamNumber 获取我的答题次数]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getExamNumber(arg) {
  return request.get(`/api/Education/GetExamNumberByUserID`, {
    params: arg
  });
}

/**
 * [getExamCount 获取我的答题数量]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getExamCount(arg) {
  return request.get(`/api/Education/GetExamCountByUserID`, {
    params: arg
  });
}

/**
 * [getExamRightRate 获取我的答题准去率]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getExamRightRate(arg) {
  return request.get(`/api/Education/GetExamRightRateByUserID`, {
    params: arg
  });
}

/**
 * [getEducationAnswerParameter 获取随机答题参数]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getEducationAnswerParameter(arg) {
  return request.get(`/api/Education/GetEducationAnswerParameter`, {
    params: arg
  });
}

/**
 * [saveEducationAnswerParameter 保存随机答题参数]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function saveEducationAnswerParameter(arg) {
  return request.get(`/api/Education/SaveEducationAnswerParameter`, {
    params: arg
  });
}

/**
 * [updateEducationSubject 新增编辑题库]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function updateEducationSubject(arg) {
  return request.get(`/api/Education/UpdateEducationSubject`, {
    params: arg
  });
}

/**
 * [getEducationSubject 获取题库详情]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getEducationSubject(arg) {
  return request.get(`/api/Education/GetEducationSubjectByID`, {
    params: arg
  });
}