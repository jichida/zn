import { put,takeEvery } from 'redux-saga/effects';
import {
  loginsendauth_result,

  serverpush_triporder,
  triporder_updateone,

  serverpush_triprequestandorder,
  starttriprequestorder_result,

  wait_insertorder_result,
  wait_getpaysign_result,
  wait_starttriprequestorder_result,

  insertorder_result,
  updateorder_result,
  canceltriprequestorder_result,
  getpaysign_result,
  triporder_addone,

  common_err,
  wait_updateorder_result,
  wait_canceltriprequestorder_result,

  md_serverpush_triporder,
  md_loginsendauth_result,
  md_serverpush_triprequestandorder,
  md_starttriprequestorder_result,
  md_canceltriprequestorder_result,

  updateorder_comment_result,
  ui_setorderdetail,

  rechargepay_result,
  set_weui,

  mycoupongetall_result,
  wait_mycoupongetall_result,
  md_mycoupongetall,
  getnotifymessage_result,
  wait_getnotifymessage_result,
  md_getnotifymessage,
  getrechargerecords_result,
  wait_getrechargerecords_result,
  md_getrechargerecords,
  getmytriporders_result,
  wait_getmytriporders_result,
  md_getmytriporders,

  getorderdetail_result
} from '../actions';
import { push } from 'react-router-redux';
const waitfnsz = [
  [
    mycoupongetall_result,
    wait_mycoupongetall_result,
    `${md_mycoupongetall}`,
  ],
  [
    getnotifymessage_result,
    wait_getnotifymessage_result,
    `${md_getnotifymessage}`,
  ],
  [
    getrechargerecords_result,
    wait_getrechargerecords_result,
    `${md_getrechargerecords}`,
  ],
  [
    getmytriporders_result,
    wait_getmytriporders_result,
    `${md_getmytriporders}`,
  ],
];

export function* wsrecvsagaflow() {
  for(let i = 0; i < waitfnsz.length; i ++){
      let fnsz = waitfnsz[i];
      yield takeEvery(fnsz[2], function*(action) {
          let {payload:result} = action;
          console.log(`takeEvery===>result:${JSON.stringify(result)}`);
          yield put(fnsz[0](result));
          yield put(fnsz[1]({result:result}));
      });
  }


  yield takeEvery(`${updateorder_comment_result}`, function*(action) {
      let {payload:result} = action;
      //返回一个订单object
      yield put(triporder_updateone(result));
      yield put(ui_setorderdetail({showaddevaluate:false}));
  });

  yield takeEvery(`${getorderdetail_result}`, function*(action) {
      let {payload:result} = action;
      //返回一个订单object
      yield put(triporder_updateone(result.triporder));
  });



  yield takeEvery(`${rechargepay_result}`, function*(action) {
      let {payload:result} = action;
      //返回一个订单object
      yield put(triporder_addone(result.triporder));
      yield put(push(`/rechargepay/${result.triporder._id}`));
  });


  yield takeEvery(`${md_serverpush_triporder}`, function*(action) {
      let {payload:result} = action;
      yield put(serverpush_triporder(result));
      yield put(triporder_updateone(result.triporder));
  });

  yield takeEvery(`${md_loginsendauth_result}`, function*(action) {
      let {payload:result} = action;
      yield put(loginsendauth_result(result));
      let toast = {
          show : true,
          text : result.msg,
          type : "success"
      }
      yield put(set_weui({ toast }));
  });

  yield takeEvery(`${common_err}`, function*(action) {
      let {payload:result} = action;
      if(result.type === 'insertorder'){
        yield put(wait_insertorder_result({err:result.errmsg}));
      }
      else if(result.type === 'getpaysign'){
        yield put(wait_getpaysign_result({err:result.errmsg}));
      }
      else{
        yield put(set_weui({
          toast:{
          text:result.errmsg,
          show: true,
          type:'warning'
        }}));
      }
  });

  yield takeEvery(`${md_serverpush_triprequestandorder}`, function*(action) {
      let {payload:result} = action;
      yield put(serverpush_triprequestandorder(result));
      yield put(triporder_updateone(result.triporder));
  });

  yield takeEvery(`${md_starttriprequestorder_result}`, function*(action) {
      let {payload:result} = action;
      yield put(starttriprequestorder_result(result));
      yield put(wait_starttriprequestorder_result({result:result}));
      yield put(triporder_addone(result.triporder));
  });

  //===========
  yield takeEvery(`${insertorder_result}`, function*(action) {
      let {payload:result} = action;
      yield put(triporder_addone(result.triporder));
      yield put(wait_insertorder_result({result:result}));
  });
  yield takeEvery(`${updateorder_result}`, function*(action) {
      let {payload:result} = action;
      yield put(triporder_updateone(result.triporder));
      yield put(wait_updateorder_result({result:result}));
  });
  yield takeEvery(`${md_canceltriprequestorder_result}`, function*(action) {
      let {payload:result} = action;
      yield put(canceltriprequestorder_result(result));
      yield put(wait_canceltriprequestorder_result({result:result}));
      yield put(triporder_updateone(result.triporder));
  });
  yield takeEvery(`${getpaysign_result}`, function*(action) {
      let {payload:result} = action;
      yield put(wait_getpaysign_result({result:result}));
  });
}
