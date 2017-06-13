import { select,put,takeEvery,call } from 'redux-saga/effects';
import {
  carmap_setenableddrawmapflag,
  driveroute_request,
  acceptrequest,
  acceptrequest_request,

  updaterequeststatus,
  updaterequeststatus_request,

  serverpush_restoreorder,
  serverpush_driverlocation,
  selrequest,
  setcurlocation,
  carmap_resetmap,
  serverpush_triprequest,
  serverpush_triprequestandorder,
  updaterequeststatus_result,
  acceptrequest_result,
} from '../actions';

import { push } from 'react-router-redux';
import {getcurrentpos_sz} from './getcurrentpos';

// const getmapstate_fornav_start2end = (state) => {
//   const {markerstartlatlng,markerendlatlng} = state.carmap;
//   return {
//     drawroute:true,
//     startlnglat:markerstartlatlng,
//     endlnglat:markerendlatlng
//   };
// }
//
// const getmapstate_fornav_cur2end = (state) => {
//   const {driverlocation,markerendlatlng} = state.carmap;
//   return {
//     drawroute:true,
//     startlnglat:driverlocation,
//     endlnglat:markerendlatlng
//   };
// }
const locz = [0,0];
import L from 'leaflet';
const ISENABLEEDRAW_MARKERSTART = 1;
const ISENABLEDDRAW_MARKEREND = 2;
const ISENABLEDDRAW_MARKERDIRVER = 4;
const ISENABLEDDRAW_ROUTELEFT = 32;
// const ISENABLEDDRAW_ROUTEPASTPTS = 64;
// const ISENABLEDDRAW_POPWITHSTART = 128;
const ISENABLEDDRAW_POPWITHCUR  = 256;

const getmapstate_formapdraw = (state) => {
  const {driverlocation,markerstartlatlng,markerendlatlng,curmappagerequest} = state.carmap;
  let enableddrawmapflag = 0;
  if(!!driverlocation){
    if(driverlocation !== L.latLng(locz[1], locz[0])){
      enableddrawmapflag |= ISENABLEDDRAW_MARKERDIRVER;
    }
  }

  if(!!markerstartlatlng){
    if(markerstartlatlng !== L.latLng(locz[1], locz[0])){
      enableddrawmapflag |= ISENABLEEDRAW_MARKERSTART;
    }
  }

  if(!!markerendlatlng){
    if(markerendlatlng !== L.latLng(locz[1], locz[0])){
      enableddrawmapflag |= ISENABLEDDRAW_MARKEREND;
    }
  }

  if(!!curmappagerequest.requeststatus){
    if(curmappagerequest.requeststatus === '行程中'){
      enableddrawmapflag |= ISENABLEDDRAW_POPWITHCUR;
      enableddrawmapflag |= ISENABLEDDRAW_ROUTELEFT;
    }
    else if(curmappagerequest.requeststatus === '已接单'){
      enableddrawmapflag |= ISENABLEDDRAW_ROUTELEFT;
    }
  }
  return {enableddrawmapflag,driverlocation,curmappagerequest};
}


export function* createupdatestatusflow(){
  yield takeEvery(`${acceptrequest}`, function*(action) {
    const {payload} = action;
    payload.driverlocation = yield call(getcurrentpos_sz);
    yield put(acceptrequest_request(payload));
  });

  yield takeEvery(`${updaterequeststatus}`, function*(action) {
    const {payload} = action;
    payload.driverlocation = yield call(getcurrentpos_sz);
    yield put(updaterequeststatus_request(payload));
  });
  //===========******以下改变地图状态******===========
  yield takeEvery(
    [
      `${serverpush_restoreorder}`,
      `${selrequest}`,
      `${setcurlocation}`,
      `${carmap_resetmap}`,
      `${serverpush_triprequest}`,
      `${serverpush_triprequestandorder}`,
      `${updaterequeststatus_result}`,
      `${acceptrequest_result}`,
    ]
    , function*(action) {
      //目的地地址选中后
      let {
        enableddrawmapflag,
        driverlocation:curlocation,
        curmappagerequest:curreqobj
      } = yield select(getmapstate_formapdraw);
      yield put(carmap_setenableddrawmapflag(enableddrawmapflag));

      let sendnav = (action.type === serverpush_restoreorder.getType())
      || (action.type === setcurlocation.getType());
      if(sendnav){//发送导航
        //当前地址变化
        let drawroute = false;
        let startlnglat = curlocation;
        let endlnglat;
        if(curreqobj.requeststatus === '已取消'){
        }
        else if(curreqobj.requeststatus === '请求中'){
        }
        else if(curreqobj.requeststatus === '已接单'){
          drawroute = true;
          endlnglat = L.latLng(curreqobj.srcaddress.location.lat, curreqobj.srcaddress.location.lng);
        }
        else if(curreqobj.requeststatus === '待上车'){
        }
        else if(curreqobj.requeststatus === '行程中'){
          drawroute = true;
          endlnglat = L.latLng(curreqobj.dstaddress.location.lat, curreqobj.dstaddress.location.lng);
        }
        else if(curreqobj.requeststatus === '行程完成'){
        }
        yield put(driveroute_request({drawroute,startlnglat,endlnglat}));
      }

  });
}
