
import {
    starttriprequestorder_request,wait_starttriprequestorder_request,wait_starttriprequestorder_result,
    canceltriprequestorder_request,wait_canceltriprequestorder_request,wait_canceltriprequestorder_result,
    getpaysign_request,wait_getpaysign_request,wait_getpaysign_result,
    insertorder_request,wait_insertorder_request,wait_insertorder_result,
} from '../actions/index.js';

import { fork, take, call, put, cancel,race } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import config from '../config.js';

let synccall=(payload,waitfn,fn)=>{
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(waitfn({resolve,reject,payload}));
      dispatch(fn({...payload}));
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
export function starttriprequestorder(payload){
  return synccall(payload,wait_starttriprequestorder_request,starttriprequestorder_request);
}

export function canceltriprequestorder(payload){
  return synccall(payload,wait_canceltriprequestorder_request,canceltriprequestorder_request);
}

export function getpaysign(payload){
  return synccall(payload,wait_getpaysign_request,getpaysign_request);
}

export function insertorder(payload){
  return synccall(payload,wait_insertorder_request,insertorder_request);
}
//2.

//以下导出放在saga中
export function* starttriprequestorderflow(){
  return yield createflow(`${wait_starttriprequestorder_request}`,`${wait_starttriprequestorder_result}`);
}

export function* canceltriprequestorderflow(){
  return yield createflow(`${wait_canceltriprequestorder_request}`,`${wait_canceltriprequestorder_result}`);
}

export function* getpaysignflow(){
  return yield createflow(`${wait_getpaysign_request}`,`${wait_getpaysign_result}`);
}

export function* insertorderflow(){
  return yield createflow(`${wait_insertorder_request}`,`${wait_insertorder_result}`);
}

