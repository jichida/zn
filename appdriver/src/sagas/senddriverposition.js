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
       currentlocresult: take(tosaga_getcurrentloc),
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
      yield put(sendcurlocationtoserver({
        driverlocation:[curposition.lng,curposition.lat],
        driverstatus:operate.driverstatus,//未接单／已接单
        bizstatusstring:operate.bizstatusstring,//营运状态	1:载客、2.接单、3 :空驶、4.停运==>停运->空驶->接单->载客->空驶
        bizstatus:operate.bizstatus,//营运状态	1:载客、2.接单、3 :空驶、4.停运==>停运->空驶->接单->载客->空驶
        triporderid:operate.triporderid
      }));//发送给server
    }


  }
}

export function* createstartoperateloginoutflow(){
  while(true){
    let result = yield [
      take(login_result),
      take(setcurlocation)
    ];
    console.log("登录并且获取到当前位置：" + JSON.stringify(result));
    let loginresult = result[0].payload;
    let curlocation = result[1].payload;
    let operateLogindoc = {
      driverlocation :[curlocation.lng,curlocation.lat]
    };
    if(loginresult.approvalstatus === '已审核'){
    yield put(operatelogin(operateLogindoc));
    }
    //登出或退出APP
    console.log("等待登出或退出");
    const { logoutaction, exitappaction } = yield race({
      logoutaction: take(`${logout_result}`),
      exitappaction: take(`${notify_exit_app}`),
    });

    console.log("等待下一轮登录");
    if(logoutaction && loginresult.approvalstatus === '已审核'){
      yield put(logoutaction);
    }

    if(exitappaction && loginresult.approvalstatus === '已审核'){
      console.log("开始获取地址");
      curlocation = yield call(getcurrentpos);
      let operateLogoutdoc = {
        driverlocation :[curlocation.lng,curlocation.lat]
      };
      console.log("登出或退出APP发送当前位置：" + JSON.stringify(operateLogoutdoc));
      yield put(operatelogout(operateLogoutdoc));
      break;
    }

  }

}

let getnavdrawroute =({drawroute,startlnglat,endlnglat})=> {
  console.log('获取一个实时导航:' + drawroute);
  return new Promise(resolve => {
    if(drawroute){
      console.log('获取一个实时导航:' + JSON.stringify(startlnglat));
      console.log('获取一个实时导航:' + JSON.stringify(endlnglat));
      let driving = new window.AMap.Driving({extensions:'base'});
      // 根据起终点经纬度规划驾车导航路线
      driving.search(new window.AMap.LngLat(startlnglat.lng, startlnglat.lat),
       new window.AMap.LngLat(endlnglat.lng, endlnglat.lat),
      (status,result)=>{
            if(status === 'complete'){
              for(let route of result.routes){
                let totaldistancetxt = getstringofdistance(route.distance);
                let totaldurationtxt = getstringoftime(route.time);
                let latlngs = [];
                let instruction = '';
                for(let drivestep of route.steps){
                  if(instruction.length === 0){
                    instruction = drivestep.instruction;
                  }
                  for(let pt of drivestep.path){
                      latlngs.push({
                        lat:pt.lat,
                        lng:pt.lng
                      });
                  }
                }
                resolve({
                    drawroute,
                    totaldistancetxt,
                    totaldurationtxt,
                    latlngs,
                    instruction
                  });
                return;
              }//for(let route of result.routes){
            }//if(status === 'complete'){
          resolve({drawroute:false});
      });//driving.search
    }//if
    else{
      resolve({
        drawroute
        });
    }
  });//return new Promise(resolve => {
}//getnavdrawroute

export function* createnavdrawrouteflow(){
  while(true){
    let drawrouteaction = yield take(nav_drawroute);
    const {payload} = drawrouteaction;
    console.log("createnavdrawrouteflow===>" + JSON.stringify(payload));
    let result = yield call(getnavdrawroute,payload);
    yield put(nav_drawroute(result));
  }
}
//https://goshakkk.name/lazy-auth-redux-saga-flow/
// function* purchaseFlow() {
//   // when the button is clicked
//   yield take(COMPLETE_PURCHASE);
//   // check if the user is authenticated already
//   const isAuthed = yield select(isAuthenticated);
//   if (!isAuthed) {
//     // dispatch an action to open the sign up modal
//     yield put(openAuthModal());
//     // wait for either LOGIN_SUCCESS or AUTH_CANCELED
//     const result = yield take([LOGIN_SUCCESS, AUTH_CANCELED]);
//     if (result.type === AUTH_CANCELED) {
//       return
//     }
//   }
//   // if either already authenticated, or just signed up
//   // dispatch an action that will actually make the request
//   yield put(buy());
// }
