import request from '@/utils/request'
import Qs from 'querystring'

// 教育培训模块

/** 
 * [getEducationStatus 登录弹窗答题状态获取]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function getEducationStatus(arg) {
  return request.get(`/api/Education/Is_Exam`, {
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
 * [searchEducationSubject 题库列表获取]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function searchEducationSubject(arg) {
  return request.get(`/api/Education/SearchEducationSubject`, {
    params: arg
  });
}

/**
 * [learningEducationSubject 题库学习列表获取]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function learningEducationSubject(arg) {
  return request.get(`/api/Education/LearningEducationSubject`, {
    params: arg
  });
}

/**
 * [educationClassify 数据字典题目类别获取]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function educationClassify(arg) {
  return request.get(`api/Dict/SearchDictDetail?parent_code=Education_Classify`, {
    params: arg
  });
}

/**
 * [legislationType 数据字典政策法规获取]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function legislationType(arg) {
  return request.get(`api/Dict/SearchDictDetail?parent_code=Legislation_Type`, {
    params: arg
  });
}

/**
 * [delEducationSubject 删除题库信息]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function delEducationSubject(arg) {
  return request.post(`/api/Education/DelEducationSubject`, arg);
}


/**
 * [searchWrongExam 获取我的答题列表信息，错题列表]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function searchWrongExam(arg) {
  return request.get(`/api/Education/SearchWrongExamByUserID`, {
    params: arg
  });
}

/**
 * [submitExam 提交登录弹窗答题]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function submitExam(arg) {
  return request.post(`/api/Education/SubmitExam`, arg);
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
  return request.post(`/api/Education/SaveEducationAnswerParameter`, arg);
}
// export function saveEducationAnswerParameter(arg) {
//   return request.post(`/api/Education/SaveEducationAnswerParameter`, Qs.stringify(arg),
//   {
//   headers: {
//   'Content-Type': 'application/x-www-form-urlencoded'
//   }
//   });
// }

/**
 * [updateEducationSubject 新增编辑题库]
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export function updateEducationSubject(arg) {
  return request.post(`/api/Education/UpdateEducationSubject`,arg);
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

