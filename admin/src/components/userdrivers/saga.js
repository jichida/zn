import { put, takeEvery,takeLatest,call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { showNotification } from 'admin-on-rest';
import {
    REVIEW_APPROVE_SUCCESS,
    REVIEW_APPROVE_FAILURE,
    REVIEW_REJECT_SUCCESS,
    REVIEW_REJECT_FAILURE,
    REVIEW_APPROVESTART_SUCCESS,
    REVIEW_APPROVESTART_FAILURE,
} from './action';
import {
    UPLOADEXCEL,
    UPLOADEXCEL_LOADING,

    UPLOADEXCEL_FAILURE,
    UPLOADEXCEL_SUCCESS,

} from './action';
import { fetchJson } from '../../util/fetch.js';
import config from '../../env/config';
import {excelupload} from '../../util/excelupload';

const uploadandimportexcel=(event)=>{
  return new Promise((resolve,reject)=>{
    const usertoken = localStorage.getItem('admintoken');
    excelupload(event,{usertoken},(issuc,result)=>{
      if(issuc){
        resolve(result);
      }
      else{
        resolve(result);
      }

    });
  });
};

export default function* reviewSaga() {
    yield [
        takeEvery(REVIEW_APPROVE_SUCCESS, function* (action) {
            yield put(showNotification('resources.userdriver.notification.approved_success'));
            yield put(push('/userdriver'));
        }),
        takeEvery(REVIEW_APPROVE_FAILURE, function* (action) {
            const {error} = action;
            yield put(showNotification('resources.userdriver.notification.approved_error', 'warning'));
            console.error(error);
        }),
        takeEvery(REVIEW_REJECT_SUCCESS, function* (action) {
            yield put(showNotification('resources.userdriver.notification.rejected_success'));
            yield put(push('/userdriver'));
        }),
        takeEvery(REVIEW_REJECT_FAILURE, function* (action) {
            const {error} = action;
            yield put(showNotification('resources.userdriver.notification.rejected_error', 'warning'));
            console.error(error);
        }),
        takeEvery(REVIEW_APPROVESTART_SUCCESS, function* (action) {
            yield put(showNotification('resources.userdriver.notification.approvedstart_success'));
            yield put(push('/userdriver'));
        }),
        takeEvery(REVIEW_APPROVESTART_FAILURE, function* (action) {
            const {error} = action;
            yield put(showNotification('resources.userdriver.notification.approvedstart_error', 'warning'));
            console.error(error);
        }),
        takeLatest(UPLOADEXCEL, function* (action) {
          const {payload} = action;
          try{
            yield put({type:UPLOADEXCEL_LOADING,payload:{}});
            const result = yield call(uploadandimportexcel,payload.event);
            console.log(result);
            yield put({type:UPLOADEXCEL_SUCCESS,payload:{}});

            if(!!result.resultstring){
              alert(result.resultstring);
            }

          }
          catch(e){
            console.log(e);
            yield put({type:UPLOADEXCEL_FAILURE,payload:{}});
          }
        })
    ];
}
