/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    ui_setorderdetail,
    getsystemconfig_result,
    ui_setselcommenttag
} from '../actions';
import _ from 'lodash';

const initial = {
    orderdetail: {
        commenttagsfordriver:[],
        maxshowtags:9,
        commenttagsfordriverselmax:[],

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
    [getsystemconfig_result]:(state,payload)=>{
      const {commenttagsfordriver,maxshowtags} = payload;
      return {...state,commenttagsfordriver,maxshowtags};
    },
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
        const {commenttagsfordriver,maxshowtags} = state;
        let commenttagsfordriverselmaxleft = _.xor(commenttagsfordriver,commenttagsel);
        commenttagsfordriverselmaxleft = _.shuffle(commenttagsfordriverselmaxleft);
        let commenttagsfordriverselmax = [...commenttagsel,...commenttagsfordriverselmaxleft];
        if(commenttagsfordriverselmax.length > maxshowtags){
          let drops = commenttagsfordriverselmax.length - maxshowtags;
          commenttagsfordriverselmax = _.dropRight(commenttagsfordriverselmax,drops);
        }

        return {
            ...state,
            commenttagsfordriverselmax,
            commenttagsel
        };
    },
    //设置订单临时数据
    [ui_setorderdetail]: (state, payload) => {
        let commenttagsfordriverselmax = state.commenttagsfordriverselmax;
        if(!!payload.showaddevaluate){
          //初始化
           commenttagsfordriverselmax = [...state.commenttagsfordriver];
           commenttagsfordriverselmax = _.shuffle(commenttagsfordriverselmax);
           if(commenttagsfordriverselmax.length > state.maxshowtags){
             let drops = commenttagsfordriverselmax.length - state.maxshowtags;
             commenttagsfordriverselmax = _.dropRight(commenttagsfordriverselmax,drops);
           }
        }
         return {
            ...state,
            commenttagsfordriverselmax,
            ...payload
        };
    },


}, initial.orderdetail);

export default orderdetail;
