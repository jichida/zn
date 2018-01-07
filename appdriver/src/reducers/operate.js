import { createReducer } from 'redux-act';
import {
    setbizstatus,
    setcurlocation,
    set_nearbyrequestsresult,
    carmap_resetmap
} from '../actions';
import {normalizr_requestlist} from './normalizr';
import _ from 'lodash';

const locz = [0,0];
const initial = {
  operate: {
    driverstatus:'未接单',//‘已接单’
    bizstatusstring:'停运',//营运状态	1:载客、2.接单、3 :空驶、4.停运==>停运->空驶->接单->载客->空驶
    bizstatus:4,//营运状态	1:载客、2.接单、3 :空驶、4.停运==>停运->空驶->接单->载客->空驶
    curlocation:{lat:locz[1],lng:locz[0]},//当前位置，一直在变化
    nearbyrequests:{
        list:[],
        requests:{
        }
    }
  },
};

const bizstatusstringmap = {
  '载客':1,
  '接单':2,
  '空驶':3,
  '停运':4
};

const operate = createReducer({
  [carmap_resetmap]:(state,initobj)=> {
    let nearbyrequests = {
      list:[],
      requests:{}
    };
    return { ...state,nearbyrequests};
  },
  [setbizstatus]:(state, payload) => {
    let bizstatusstring = payload;
    let bizstatus = bizstatusstringmap[bizstatusstring];
    return { ...state,bizstatus,bizstatusstring};
  },
  [setcurlocation]:(state, payload) => {
    let curlocation = payload;
    return { ...state,curlocation};
  },
  [set_nearbyrequestsresult]:(state, payload) => {
    const nearbyrequests = {...payload};
    return { ...state,nearbyrequests};
  },
}, initial.operate);

export default operate;
