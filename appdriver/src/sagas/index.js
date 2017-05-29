import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';
import {startacceptrequestflow,updaterequeststatusflow,canceltriprequestorderflow} from '../actions/sagacallback';
import {getcurpositionflow,createstartoperateloginoutflow,createnavdrawrouteflow} from './senddriverposition';
import {createrestoreorderflow} from './restoreorder';
import {wsrecvsagaflow} from './wsrecvsaga';
import {jpushflow} from './jpushflow';

export default function* rootSaga() {
  yield fork(jpushflow);
  yield fork(wsrecvsagaflow);
  yield fork(createrestoreorderflow);
  yield fork(createnavdrawrouteflow);
  yield fork(createstartoperateloginoutflow);
  yield fork(flowmain);
  yield fork(getcurpositionflow);
  yield fork(startacceptrequestflow);
  yield fork(updaterequeststatusflow);
  yield fork(canceltriprequestorderflow);
}
