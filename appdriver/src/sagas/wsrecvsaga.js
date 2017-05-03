import { put,takeEvery } from 'redux-saga/effects';
import {
  acceptrequest_result,
  wait_acceptrequest_result,
  triporder_addone,

  loginsendauth_result,
  showpopmessage,
  serverpush_triporder,
  triporder_updateone,
  serverpush_triprequestandorder,
  updaterequeststatus_result,
  wait_updaterequeststatus_result,
  canceltriprequestorder_result,
  wait_canceltriprequestorder_result,

  common_err,

  md_acceptrequest_result,
  md_loginsendauth_result,
  md_serverpush_triporder,
  md_serverpush_triprequestandorder,
  md_updaterequeststatus_result,
  md_canceltriprequestorder_result
} from '../actions';

export function* wsrecvsagaflow() {
  yield takeEvery(`${md_acceptrequest_result}`, function*(action) {
      let {payload:result} = action;
      yield put(acceptrequest_result(result));
      yield put(wait_acceptrequest_result({result:result}));
      yield put(triporder_addone(result.triporder));
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

  yield takeEvery(`${md_serverpush_triporder}`, function*(action) {
      let {payload:result} = action;
      yield put(serverpush_triporder(result));
      yield put(triporder_updateone(result.triporder));
  });

  yield takeEvery(`${md_serverpush_triprequestandorder}`, function*(action) {
      let {payload:result} = action;
      yield put(serverpush_triprequestandorder(result));
      yield put(triporder_updateone(result.triporder));
  });

  yield takeEvery(`${common_err}`, function*(action) {
      let {payload:result} = action;

        yield put(showpopmessage({
          title:result.title,
          msg:result.errmsg,
          type:'error'
        }));

  });

  yield takeEvery(`${md_updaterequeststatus_result}`, function*(action) {
      let {payload:result} = action;
      yield put(updaterequeststatus_result(result.triporder));
      yield put(wait_updaterequeststatus_result({result:result}));
  });

  yield takeEvery(`${md_canceltriprequestorder_result}`, function*(action) {
      let {payload:result} = action;
      yield put(canceltriprequestorder_result(result));
      yield put(wait_canceltriprequestorder_result({result:result}));
  });

}
