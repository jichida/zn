import {select, fork, take, call, put, cancel,race } from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {
    serverpush_restoreorder,
} from '../actions';
import { push } from 'react-router-redux';

export function* createrestoreorderflow(){
  while(true){
    let restoreorderaction = yield take(serverpush_restoreorder);
    const {payload} = restoreorderaction;
    console.log("司机恢复订单===>" + JSON.stringify(payload));
    yield put(serverpush_restoreorder(payload));
    yield put(push('/starttrip'));

  }
}
