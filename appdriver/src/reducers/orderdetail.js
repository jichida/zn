/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    ui_setorderdetail,
    ui_setselcommenttag
} from '../actions';
import _ from 'lodash';

const initial = {
    orderdetail: {
        paysign:'',
        paytype:'alipay',
        ratenum:5,
        comment:'',
        commenttagsel:[],
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
    [ui_setorderdetail]: (state, payload) => {
        return {
            ...state,
            ...payload
        };
    },
}, initial.orderdetail);

export default orderdetail;
