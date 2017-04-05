import {
    acceptrequest_request,wait_acceptrequest_request,wait_acceptrequest_result,
    updaterequeststatus_request,wait_updaterequeststatus_request,wait_updaterequeststatus_result,
    canceltriprequestorder_request,wait_canceltriprequestorder_request,wait_canceltriprequestorder_result
} from '../actions/index.js';
import { fork, take, call, put, cancel,race } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import config from '../config.js';
import {getcurrentlocationfn} from '../util/geo.js';
//注：获取地理位置放这里，可以达到实时效果，放视图中并不实时！
let synccall=(payload,waitfn,fn)=>{
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      getcurrentlocationfn((locz)=>{
         if(locz[0] !== 0 && locz[1] !== 0){
           let result = payload;
           result.driverlocation = locz;
           console.log("synccall------>" + JSON.stringify(result));
           dispatch(waitfn({resolve,reject,result}));
           dispatch(fn({...result}));
         }
       });

    });
  }
}


function* createflow(fnwaitreq,fnwatres){
  while (true) {
    let {payload:{resolve,reject}} = yield take(fnwaitreq);
    const { response, timeout } = yield race({
       response: take(fnwatres),
       timeout: call(delay, config.requesttimeout)
    });
    if(timeout){
      reject('请求超时!');
    }
    else{
      let {payload:{err,result}} = response;
      if (err) {
        reject(err);
      }
      else{
        resolve(result);
      }
    }
  }
}


//以下导出放在视图中
export function acceptrequest(payload){
  return synccall(payload,wait_acceptrequest_request,acceptrequest_request);
}
export function updaterequeststatus(payload){
  return synccall(payload,wait_updaterequeststatus_request,updaterequeststatus_request);
}
export function canceltriprequestorder(payload){
  return synccall(payload,wait_canceltriprequestorder_request,canceltriprequestorder_request);
}


//2.
//以下导出放在saga中
export function* startacceptrequestflow(){
  return yield createflow(`${wait_acceptrequest_request}`,`${wait_acceptrequest_result}`);
}
export function* updaterequeststatusflow(payload){
  return yield createflow(`${wait_updaterequeststatus_request}`,`${wait_updaterequeststatus_result}`);
}
export function* canceltriprequestorderflow(payload){
  return yield createflow(`${wait_canceltriprequestorder_request}`,`${wait_canceltriprequestorder_result}`);
}
