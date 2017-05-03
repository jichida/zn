import { put,takeEvery } from 'redux-saga/effects';
import {
  loginsendauth_result,
  showpopmessage,

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
  md_canceltriprequestorder_result
} from '../actions';

export function* wsrecvsagaflow() {
  yield takeEvery(`${md_serverpush_triporder}`, function*(action) {
      let {payload:result} = action;
      yield put(serverpush_triporder(result));
      yield put(triporder_updateone(result.triporder));
  });

  yield takeEvery(`${md_loginsendauth_result}`, function*(action) {
      let {payload:result} = action;
      yield put(loginsendauth_result(result));
      yield put(showpopmessage({
        title:'成功',
        msg:result.popmessage,
        type:'success'
      }));
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
        yield put(showpopmessage({
          title:result.title,
          msg:result.errmsg,
          type:'error'
        }));
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
