/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    getpaysign_result,
    ui_setorderdetail,
    ui_setselcommenttag
} from '../actions';
import _ from 'lodash';

const initial = {
    orderdetail: {
        paysign:'',
        paytype:'alipay',
        usecoupon:false,
        coupon:{},

        ratenum:0,
        comment:'',
        commenttagsel:[],
        //
        showaddevaluate : false,
    },
};

const orderdetail = createReducer({
    [ui_setselcommenttag]: (state, payload) => {
        const {addflag,comments} = payload;
        let commenttagsel = [...state.commenttagsel];
        if(addflag){
          commenttagsel.push(comments);
        }
        else{
           _.remove(commenttagsel,(sel)=>{
            return comments === sel;
          });
        }
        return {
            ...state,
            commenttagsel
        };
    },
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
