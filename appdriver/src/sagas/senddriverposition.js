import config from '../config.js';
import {select, fork, take, call, put, cancel,race } from 'redux-saga/effects';
import {
  getcurrentlocationandnearestdrivers_request,
  sendcurlocationtoserver,
  setcurlocation,
  changestartposition,
  carmap_setmapcenter,
  login_result,
  operatelogin,
  operatelogout,
  notify_exit_app,
  logout_result,
  tosaga_getcurrentloc,
  nav_drawroute
} from '../actions';
import {delay} from 'redux-saga';
import L from 'leaflet';
import {getstringoftime,getstringofdistance} from '../util/geo.js';

//业务需求：
//必须先登录，登录后一直发送位置
//上线，下线，出发，到达
//司机，车辆实时定位信息（一直在发）
import {getcurrentpos} from './getcurrentpos';

const getoperateprops = (state) => {
  let approvalstatus = state.userlogin.approvalstatus;
  let loginsuccess = state.userlogin.loginsuccess;
  let socketconnected = state.app.socketconnected;
  let triporderid = '0';
  if(state.carmap.curmappageorder.hasOwnProperty('_id')){
    triporderid = state.carmap.curmappageorder._id;
  }
  return {...state.operate,loginsuccess,socketconnected,approvalstatus};
};

export function* getcurpositionflow(){
  //获取当前位置
  const centerpos = yield call(getcurrentpos);
  let driverlocation = L.latLng([centerpos.lat, centerpos.lng]);
  yield put(carmap_setmapcenter(driverlocation));
  yield put(setcurlocation(centerpos));//存入store

  while (true) {
    //定时获取当前位置并发送
    //接单或者更新订单状态时，需要获取当前数据，所以可以立即得到而不用等待
    const { currentlocresult, timeout } = yield race({
       currentlocresult: take(`${tosaga_getcurrentloc}`),
       timeout: call(delay, config.sendlocationinterval)
    });
    let curposition;
    if(timeout){
      curposition = yield call(getcurrentpos);
    }
    else{
      curposition = currentlocresult.payload;
    }
    //定时获取地理位置，存入store
    yield put(setcurlocation(curposition));//存入store

    const operate = yield select(getoperateprops);
    if(operate.socketconnected && operate.loginsuccess && operate.approvalstatus === '已审核'){
      //如果连接并且已经登录,发送给服务端
      yield put(sendcurlocationtoserver({//RiverRegionCode/bizstatus/
        driverlocation:[curposition.lng,curposition.lat],
        // driverstatus:operate.driverstatus,//未接单／已接单
        // bizstatusstring:operate.bizstatusstring,//营运状态	1:载客、2.接单、3 :空驶、4.停运==>停运->空驶->接单->载客->空驶
        // bizstatus:operate.bizstatus,//营运状态	1:载客、2.接单、3 :空驶、4.停运==>停运->空驶->接单->载客->空驶
        // triporderid:operate.triporderid
      }));//发送给server
    }

  }
}
