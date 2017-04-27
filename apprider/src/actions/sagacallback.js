
import {
    starttriprequestorder_request,wait_starttriprequestorder_request,wait_starttriprequestorder_result,
    canceltriprequestorder_request,wait_canceltriprequestorder_request,wait_canceltriprequestorder_result,
    getpaysign_request,wait_getpaysign_request,wait_getpaysign_result,
    insertorder_request,wait_insertorder_request,wait_insertorder_result,
    updateorder_request,wait_updateorder_request,wait_updateorder_result
} from '../actions/index.js';

import { fork, take, call, put, cancel,race ,takeLatest} from 'redux-saga/effects';
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

export function updateorder(payload){
  return synccall(payload,wait_updateorder_request,updateorder_request);
}

//2.
function* createflowsz(fnwatres,action){
    let {payload:{resolve,reject,payload:data}} = action;
    console.log('createflowsz==>payload:' +JSON.stringify(data));
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
//以下导出放在saga中
export function* createsagacallbackflow(){
  let waitfnsz = [];
  waitfnsz.push([`${wait_starttriprequestorder_request}`,`${wait_starttriprequestorder_result}`]);
  waitfnsz.push([`${wait_canceltriprequestorder_request}`,`${wait_canceltriprequestorder_result}`]);
  waitfnsz.push([`${wait_getpaysign_request}`,`${wait_getpaysign_result}`]);
  waitfnsz.push([`${wait_insertorder_request}`,`${wait_insertorder_result}`]);
  waitfnsz.push([`${wait_updateorder_request}`,`${wait_updateorder_result}`]);

  for(let fnsz of waitfnsz){
     yield takeLatest(fnsz[0],createflowsz, fnsz[1]);
  }

}