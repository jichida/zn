import {select, fork, take, call, put, cancel,race } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
    serverpush_restoreorder,
    triporder_addone
} from '../actions';
import { push } from 'react-router-redux';

export function* createrestoreorderflow(){
  while(true){
    let restoreorderaction = yield take(serverpush_restoreorder);
    const {payload} = restoreorderaction;
    console.log("恢复订单===>" + JSON.stringify(payload));
    yield put(triporder_addone(payload.triporder));
    yield put(serverpush_restoreorder(payload));
    yield put(push('/requestorderstarting'));
  }
}
