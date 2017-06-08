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
    let {payload:loginresult} = action;
    if(loginresult.approvalstatus === '已审核' && loginresult.loginsuccess){
      let curlocation = yield call(getcurrentpos);
      let operateLogindoc = {
        driverlocation :[curlocation.lng,curlocation.lat]
      };
      yield put(operatelogin(operateLogindoc));
    }

    console.log("开始接单并且获取到当前位置");

  });

  yield takeEvery(`${stopoperate}`, function*(action) {
    let {payload:loginresult} = action;
    if(loginresult.approvalstatus === '已审核' && loginresult.loginsuccess){
      let curlocation = yield call(getcurrentpos);
      let operateLogoutdoc = {
        driverlocation :[curlocation.lng,curlocation.lat]
      };
      console.log("退出发送当前位置");
      yield put(operatelogout(operateLogoutdoc));
    }
  });
}
