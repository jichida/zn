/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    ui_setorderdetail
} from '../actions';


const initial = {
    orderdetail: {
        paysign:'',
        paytype:'alipay',
        ratenum:5,
        comment:''
    },
};

const orderdetail = createReducer({
    [ui_setorderdetail]: (state, payload) => {
        return {
            ...state,
            ...payload
        };
    },
}, initial.orderdetail);

export default orderdetail;
