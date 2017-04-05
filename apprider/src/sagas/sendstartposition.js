import config from '../config.js';
import {select, fork, take, call, put, cancel,race } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import L from 'leaflet';
import {getcurrentlocationfn} from '../util/geo.js';
import {
    carmap_setcurlocation,
    changestartposition,
    notify_socket_connected,
    carmap_changemarkerstartlatlng,
    getcurrentlocationandnearestdrivers_request,
    getnearestdrivers_request,
    carmap_setmapcenter
} from '../actions';

import store from '../env/store.js';
//获取地理位置信息，封装为promise
let getcurrentpos =()=> {
  return new Promise(resolve => {
     getcurrentlocationfn((locz)=>{
        if(locz[0] !== 0 && locz[1] !== 0){
          resolve({lat:locz[1],lng:locz[0]});
        }
      });
  });
}

//获取地理位置坐标，初始化地图
//如果和服务端连接，要获取地理位置名字
export function* createinitflow(){//仅执行一次
  const curlocation = yield call(getcurrentpos);
  yield put(carmap_setcurlocation(curlocation));

   let srclocationstring = curlocation.lng + ',' + curlocation.lat;
   let markerstartlatlng = L.latLng(curlocation.lat, curlocation.lng);//lat,lng
   yield put(carmap_setmapcenter(markerstartlatlng));
   yield put(carmap_changemarkerstartlatlng(markerstartlatlng));
   if(srclocationstring.length > 0){
       let app = store.getState().app;
       if(!app.socketconnected){
           console.log(`等待连接。。。`);
           yield take(`${notify_socket_connected}`);
           yield call(delay, 2*1000);//延时2秒
       }
       console.log(`地理位置从0->有值，需要初始化地图（触发一次，同时触发3）`);
       yield put(changestartposition({
               location:srclocationstring
       }));
   }
}

//想打车时,附近的车辆需要定时刷新
const getmapprops = (state) => {
  return {...state.carmap};
};
export function* sendstartpositionflow(){
  while (true) {
        const { response, timeout } = yield race({
           response: take(`${changestartposition}`),
           timeout: call(delay, config.intervalrequestnearbydriver)
        });
        const mapprops = yield select(getmapprops);
        if(timeout){
            // 1.第一阶段
            // 2.停留在主页面.
            // 3.未停留在价格页面.
            // 4.不在拖动中
            // 5.获取到位置
          if(mapprops.mapstage === 'pageinit' && mapprops.isindexmapvisiable
              && !mapprops.iswaitingforcallpage && !mapprops.dragging){
            if(mapprops.hasOwnProperty('srcaddress')){
              let srclocationstring = mapprops.srcaddress.location.lng+ "," + mapprops.srcaddress.location.lat;
              yield put(getnearestdrivers_request({
                    location:srclocationstring,
                    registertype:mapprops.triptype
                }));

            }
          }
        }
        else{
          console.log(`地理位置从0->有值，需要初始化地图（触发一次，同时触发3）,获取位置`);
          yield put(getnearestdrivers_request(
            {...response.payload,registertype:mapprops.triptype}
          ));
        }
  }
}

//业务需求：
// 叫车前发送自己的位置，获取附近的车（如果位置发送变化，则立马发送；否则定时发送）
// 叫车后停止发送
// const getmapstage = (state) => state.carmap.mapstage;
//
//
// export function* createstartpositionflow(){
//   while (true) {
//     //获取state
//     const { response, timeout } = yield race({
//        response: take(changestartposition),
//        timeout: call(delay, config.requesttimeout)
//     });
//     if(timeout){
//     }
//     else{
//       const mapstage = yield select(getmapstage);
//       if(mapstage === 'pageinit'){
//         yield put(getcurrentlocationandnearestdrivers_request(response.payload));
//       }
//     }
//   }
// }
