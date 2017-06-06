import { put,takeEvery } from 'redux-saga/effects';
import {
    serverpush_restoreorder,
    triporder_addone
} from '../actions';
import { push } from 'react-router-redux';

export function* createrestoreorderflow(){
    yield takeEvery(`${serverpush_restoreorder}`, function*(restoreorderaction) {
      const {payload} = restoreorderaction;
      console.log("恢复订单===>" + JSON.stringify(payload));
      yield put(triporder_addone(payload.triporder));
      //yield put(serverpush_restoreorder(payload));
      yield put(push('/requestorderstarting'));
    });
  // while(true){
  //   let restoreorderaction = yield take(serverpush_restoreorder);
  //   const {payload} = restoreorderaction;
  //   console.log("恢复订单===>" + JSON.stringify(payload));
  //   yield put(triporder_addone(payload.triporder));
  //   yield put(serverpush_restoreorder(payload));
  //   yield put(push('/requestorderstarting'));
  // }
}
