import { fork } from 'redux-saga/effects';
import {createsagacallbackflow} from '../actions/sagacallback';
import {sendstartpositionflow,createinitflow} from './sendstartposition';
import {createrestoreorderflow} from './restoreorder';
import {flowmain} from './flowmain';


export default function* rootSaga() {
  yield fork(createrestoreorderflow);//监视恢复订单
  yield fork(flowmain);
  yield fork(createsagacallbackflow);
  yield fork(sendstartpositionflow);
  yield fork(createinitflow);
}
