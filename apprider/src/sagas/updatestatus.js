import { select,put,takeEvery,call } from 'redux-saga/effects';
import {
  acceptrequest,
  acceptrequest_request,

  updaterequeststatus,
  updaterequeststatus_request,
} from '../actions';

import { push } from 'react-router-redux';
import {getcurrentpos_sz} from '../util/geo';

export function* createupdatestatusflow(){
  yield takeEvery(`${acceptrequest}`, function*(action) {
    const {payload} = action;
    payload.driverlocation = yield call(getcurrentpos_sz);
    yield put(acceptrequest_request(payload));
  });

  yield takeEvery(`${updaterequeststatus}`, function*(action) {
    const {payload} = action;
    payload.driverlocation = yield call(getcurrentpos_sz);
    yield put(updaterequeststatus_request(payload));
  });

}
