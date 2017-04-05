/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

//查询城市列表
export const getbuscarpoolcitylist_request = createAction('getbuscarpoolcitylist_request');
export const getbuscarpoolcitylist_result  = createAction('getbuscarpoolcitylist_result');
//查询拼车结果
export const getbuscarpool_request = createAction('getbuscarpool_request');
export const getbuscarpool_result = createAction('getbuscarpool_result');

