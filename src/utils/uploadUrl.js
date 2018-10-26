/**
 *
 * 1.config 里如果环境已配置HOST，直接取HOST即可
 * const $uploadPath = process.env.HOST;
 * 2.若无配置HOST, 先判断开发环境process.env.NODE_ENV，手动设置相应的服务器地址，如下参考。
 * by wangsp
 **/
import $AjaxUrl from './severurl'

const $uploadPath = process.env.NODE_ENV == 'production' ?
  'http://218.246.5.8/Psms' : $AjaxUrl
export default $uploadPath
