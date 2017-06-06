import config from '../config.js';
import {takeEvery, call, put } from 'redux-saga/effects';
import {
  startoperate,
  stopoperate,
  operatelogin,
  operatelogout,
} from '../actions';
import {getcurrentpos} from './getcurrentpos';


export function* createstartoperateloginoutflow(){
  yield takeEvery(`${startoperate}`, function*(action) {
    let {payload:{loginresult}} = action;
    let curlocation = yield call(getcurrentpos);
    let operateLogindoc = {
      driverlocation :[curlocation.lng,curlocation.lat]
    };
    console.log("开始接单并且获取到当前位置");
    if(loginresult.approvalstatus === '已审核'){
      yield put(operatelogin(operateLogindoc));
    }

  });

  yield takeEvery(`${stopoperate}`, function*(action) {
    let {payload:{loginresult}} = action;
    let curlocation = yield call(getcurrentpos);
    let operateLogoutdoc = {
      driverlocation :[curlocation.lng,curlocation.lat]
    };
    console.log("退出APP发送当前位置");
    yield put(operatelogout(operateLogoutdoc));
  });
}
