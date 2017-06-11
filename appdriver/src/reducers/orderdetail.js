/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    ui_setorderdetail,
    ui_setorderdetail_reset,
    getsystemconfig_result,
    ui_setselcommenttag
} from '../actions';
import _ from 'lodash';

const initial = {
    orderdetail: {
        commenttags_:[],
        maxshowtags:9,
        commenttags_selmax:[],

        paysign:'',
        paytype:'alipay',
        ratenum:5,
        comment:'',
        commenttagsel:[],
    },
};

const orderdetail = createReducer({
    [getsystemconfig_result]:(state,payload)=>{
      const {commenttagsforrider:commenttags_,maxshowtags} = payload;
      return {...state,commenttags_,maxshowtags};
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
        const {commenttags_,maxshowtags} = state;
        let commenttags_selmaxleft = _.xor(commenttags_,commenttagsel);
        commenttags_selmaxleft = _.shuffle(commenttags_selmaxleft);
        let commenttags_selmax = [...commenttagsel,...commenttags_selmaxleft];
        if(commenttags_selmax.length > maxshowtags){
          let drops = commenttags_selmax.length - maxshowtags;
          commenttags_selmax = _.dropRight(commenttags_selmax,drops);
        }
        return {
            ...state,
            commenttags_selmax,
            commenttagsel
        };
    },
    [ui_setorderdetail_reset]:(state, payload) => {
      let commenttags_selmax = [];
      let commenttagsel = [];//clear
      let ratenum = 0;
      let comment = '';
        //初始化
       commenttags_selmax = [...state.commenttags_];
       commenttags_selmax = _.shuffle(commenttags_selmax);
       if(commenttags_selmax.length > state.maxshowtags){
         let drops = commenttags_selmax.length - state.maxshowtags;
         commenttags_selmax = _.dropRight(commenttags_selmax,drops);
       }
       commenttagsel = [];
       ratenum = 0;
       return {
           ...state,
           ratenum,
           commenttags_selmax,
           commenttagsel,
           comment
       };
    },
    [ui_setorderdetail]: (state, payload) => {
        return {
            ...state,
            ...payload
        };
    },
}, initial.orderdetail);

export default orderdetail;
