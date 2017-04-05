import { fork } from 'redux-saga/effects';
import {starttriprequestorderflow,getpaysignflow,insertorderflow} from '../actions/sagacallback';
import {sendstartpositionflow,createinitflow} from './sendstartposition';
import {createrestoreorderflow} from './restoreorder';
import {flowmain} from './flowmain';


export default function* rootSaga() {
  yield fork(createrestoreorderflow);//监视恢复订单
  yield fork(flowmain);
  yield fork(starttriprequestorderflow);
  yield fork(getpaysignflow);
  yield fork(insertorderflow);
  yield fork(sendstartpositionflow);
  yield fork(createinitflow);
}
