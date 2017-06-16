import { select,put,takeEvery,race,take,call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
    set_weui,
} from '../actions';
import { push } from 'react-router-redux';
import _ from 'lodash';

export function* createloadingflow(){
  let action_request = (action)=>{
    let actiontype = action.type;
    return _.endsWith(actiontype,'_request');
  }

  yield takeEvery(action_request, function*(actionreq) {
    let actionstringsz = _.split(actionreq.type,/[ _]/);
    let actionstring = actionstringsz[actionstringsz.length - 2];//肯定大于1，因为已经判断有_了
    if(actionstring === 'loginwithtoken'){
      actionstring = 'login';
    }
    let action_result = (action)=>{
      let actiontype = action.type;
      let isresult = _.endsWith(actiontype,`${actionstring}_result`);
      if(isresult){
        return true;
      }
      return false;
    }

    let action_commonerr = (action)=>{
      let actiontype = action.type;
      let iscommon_err = _.endsWith(actiontype,'common_err');
      if(iscommon_err){
        const {payload} = action;
        if(!!payload){
          return payload.type === actionstring;
        }
      }
      return false;
    }

    const { result,err, timeout } = yield race({
        result: take(action_result),
        err: take(action_commonerr),
        timeout: call(delay, 500)
    });

    if(!!timeout){
      //超过500毫秒才弹
      yield put(set_weui({
          loading : {
              show : true
          },
      }));

      const { result,err, timeout } = yield race({
          result: take(action_result),
          err: take(action_commonerr),
          timeout: call(delay, 5000)
      });

      if(!!timeout){
        console.log(`这是什么请求，要等那么多时间===>${actionstring}`);
      }

      yield put(set_weui({
          loading : {
              show : false
          },
      }));
    }

  });

}