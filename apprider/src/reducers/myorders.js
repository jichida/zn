/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    ui_setmyorderstabheader,
    getmytriporders_result,
    triporder_addone,
    triporder_updateone,
    serverpush_orderprice
} from '../actions';
import {normalizr_triporderslist} from './normalizr';

const initial = {
    myorders: {
        tabheader:'all',
        inited:true,
        remoteRowCount:0,
        mytriporderlist:[],
        triporders:{
        }
    },
};

const myorders = createReducer({
    [ui_setmyorderstabheader]:(state, tabheader) => {
      return  {...state,tabheader,inited:true};
    },
    [getmytriporders_result]:(state, {result}) => {
        // docs {Array} - Array of documents
        // total {Number} - Total number of documents in collection that match a query
        // limit {Number} - Limit that was used
        //     [page] {Number} - Only if specified or default page/offset values were used
        //     [pages] {Number} - Only if page specified or default page/offset values were used
        //     [offset] {Number} - Only if specified or default page/offset values were used
        let list = result.docs;
        let remoteRowCount = result.total;
        let mytriporders = normalizr_triporderslist({list});

        if(state.inited){
            //替换
            return {
              ...state,
              mytriporderlist:mytriporders.result.list,
              triporders:{...mytriporders.entities.triporders},
              inited:true,
              remoteRowCount
            };
        }
        //追加记录
        return {
            ...state,
            mytriporderlist:[...state.mytriporderlist,...mytriporders.result.list],
            triporders:{...state.triporders,...mytriporders.entities.triporders}
        };

    },
    [triporder_addone]:(state, payload) => {
        let orderlist = [payload._id,...state.mytriporderlist];
        let orderentities = state.triporders;
        orderentities[payload._id] = payload;
        return {
          ...state,
          mytriporderlist:[...orderlist],
          triporders:{...orderentities}
        };
    },
    [triporder_updateone]:(state, payload) => {
        console.log("triporder_updateone===>" + JSON.stringify(payload));
        let orderentities = state.triporders;
        orderentities[payload._id] = payload;
        return {
          ...state,
          triporders:{...orderentities}
        };
    },
    [serverpush_orderprice]:(state,payload)=>{
      let {realtimepricedetail,triporderid} = payload;
      let orderentities = state.triporders;
      let orderinfo = orderentities[triporderid];
      orderinfo.realtimepricedetail = realtimepricedetail;
      orderentities[triporderid] = orderinfo;
      return {
        ...state,
        triporders:{...orderentities}
      };
    },
}, initial.myorders);

export default myorders;
