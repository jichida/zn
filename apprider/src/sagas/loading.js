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
    let actionstring = actionstringsz[1];//肯定大于1，因为已经判断有_了
    if(actionstring === 'loginwithtoken'){
      actionstring = 'login';
    }
    let action_result = (action)=>{
      let actiontype = action.type;
      console.log(`action_result===>${actiontype}`);
      let isresult = _.endsWith(actiontype,`${actionstring}_result`);
      if(isresult){
        return true;
      }
      return false;
    }

    let action_commonerr = (action)=>{
      let actiontype = action.type;
      console.log(`common_err===>${actiontype}`);
      let iscommon_err = _.endsWith(actiontype,'common_err');
      if(iscommon_err){
        const {payload} = action;
        console.log(`common_err==>${payload.type}`);
        if(!!payload){
          return payload.type === actionstring;
        }
      }
      return false;
    }
    console.log(`actionreq:${actionreq.type}`);
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

      yield put(set_weui({
          loading : {
              show : false
          },
      }));
    }
    console.log(`等待请求===>${actionstring}`);
  });

}
