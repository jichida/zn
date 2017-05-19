/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    getpaysign_result,
    ui_setorderdetail
} from '../actions';


const initial = {
    orderdetail: {
        paysign:'',
        paytype:'alipay',
        ratenum:0,
        comment:'',
        //
        showaddevaluate : false,
    },
};

const orderdetail = createReducer({
    [getpaysign_result]: (state, payload) => {
        let resultroute = [...payload];
        return {
            ...state,
            resultroute
        };
    },
    //设置订单临时数据
    [ui_setorderdetail]: (state, payload) => {
         return {
            ...state,
            ...payload
        };
    },


}, initial.orderdetail);

export default orderdetail;
