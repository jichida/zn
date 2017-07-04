import { createAction } from 'redux-act';
import {
    getnotifymessage_request,
    getnotifymessage_result,
} from '../actions/index.js';
import { take,put, call,race,takeLatest } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import config from '../config.js';
const synccallreq = createAction('synccallreq');

let synccall=(payload,fn)=>{
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(synccallreq({fn,resolve,reject,...payload}));
    });
  }
}

function* createflowsz(fnwatres,action){
    let {payload:{fn,resolve,reject,...data}} = action;
    yield put(fn(data));//发送请求

    console.log('createflowsz==>payload:' +JSON.stringify(data));
    const { response, timeout } = yield race({
       response: take(fnwatres),
       timeout: call(delay, config.requesttimeout)
    });
    if(!!timeout){
      reject('请求超时!');
    }
    else{
      let {payload:{err,result}} = response;
      if (!!err) {
        reject(err);
      }
      else{
        resolve({result});
      }
    }
}

//以下导出放在视图
export function callthen(actionreq,payload){
  return synccall(payload,actionreq);
}

//以下导出放在saga中
export function* createsagacallbackflow(){
  let waitfnsz = [];
  waitfnsz.push(`${getnotifymessage_result}`);
  for(let i=0;i <waitfnsz.length; i++){
     let fnresult = waitfnsz[i];
     yield takeLatest(synccallreq,createflowsz,fnresult);
  }
}
