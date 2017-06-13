import { select,put,takeEvery,call } from 'redux-saga/effects';
import {
  acceptrequest,
  acceptrequest_request,

  updaterequeststatus,
  updaterequeststatus_request,

  carmap_resetmap,
  changestartposition,

  carmap_setendaddress,
  carmap_settriptype,
  getprice_request
} from '../actions';

import { replace } from 'react-router-redux';

import {getcurrentpos,getcurrentpos_sz} from '../util/geo';

const getmapstate = (state) => {
  const {iswaitingforcallpage,triptype,totaldistance,totalduration} = state.carmap;
  return {iswaitingforcallpage,registertype:triptype,totaldistance,totalduration};
};

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

  yield takeEvery(`${carmap_resetmap}`, function*(action) {
      const {payload} = action;
      if(!!payload.url){
        yield put(replace(payload.url));
      }
      let curlocation = yield call(getcurrentpos);
      yield put(changestartposition({
          location:`${curlocation.lng},${curlocation.lat}`
      }));//重新发送一次附近请求
  });

  //===========以下两种情况要发送价格请求===========
  yield takeEvery(`${carmap_setendaddress}`, function*(action) {
      //目的地地址选中后
      let {iswaitingforcallpage,...payload} = yield select(getmapstate);
      if(iswaitingforcallpage){
        yield put(getprice_request(payload));
      }

  });

  yield takeEvery(`${carmap_settriptype}`, function*(action) {
    let {iswaitingforcallpage,...payload} = yield select(getmapstate);
    if(iswaitingforcallpage){
      yield put(getprice_request(payload));
    }
  });
}
