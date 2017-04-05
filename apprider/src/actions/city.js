/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';
//城市相关
export const gethotcity_request = createAction('gethotcity_request');
export const gethotcity_result = createAction('gethotcity_result');
export const sethotcity = createAction('sethotcity');
export const setcurcity = createAction('setcurcity');
export const setcurselcity = createAction('setcurselcity');