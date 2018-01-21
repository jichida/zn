import { put, takeEvery,takeLatest,call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { showNotification } from 'admin-on-rest';
import {
    STATONE,
    STATONE_LOADING,

    STATONE_FAILURE,
    STATONE_SUCCESS,

} from './action';
import { fetchJson } from '../../../util/fetch.js';
import config from '../../../env/config';

export default function* statPlatformSaga() {

  yield takeLatest(STATONE, function* (action) {
    const {payload} = action;
    try{
      const url = `${config.serverurl}/statone/${payload.resource}`;
      const options = {
        method:'POST',
      };
      yield put({type:STATONE_LOADING,payload:{resource:payload.resource}});
      const {json} = yield call(fetchJson,url,options);
      yield put({type:STATONE_SUCCESS,payload:{resource:payload.resource,json}});
    }
    catch(e){
      yield put({type:STATONE_FAILURE,payload:{resource:payload.resource}});
    }
  });

}
