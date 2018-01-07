import { select,put,takeLatest, } from 'redux-saga/effects';
import {
  serverpush_nearbyrequests,
  serverpush_nearbyrequests_addone,
  serverpush_nearbyrequests_removeone,
  set_nearbyrequestsresult
} from '../actions';
import _ from 'lodash';
import {normalizr_requestlist} from '../reducers/normalizr';
import {playaudio} from '../env/audio';

export function* createnearbyrequestsflow(){
  yield takeLatest(`${serverpush_nearbyrequests}`, function*(action) {
    try{
      const {payload} = action;
      const {list} = payload;
      let nearbyrequestsresult = normalizr_requestlist({list});
      let nearbyrequests = {
        list:nearbyrequestsresult.result.list||[],
        requests:nearbyrequestsresult.entities.requests||{}
      };
      const oldnearbyrequests = yield select((state)=>{
        return state.operate.nearbyrequests;
      });
      //查找现在list中有但oldlist中没有的数据
      const differlist = _.difference(nearbyrequests.list,oldnearbyrequests.list);
      if(differlist.length > 0){
        playaudio('audio4');
      }
      yield put(set_nearbyrequestsresult(nearbyrequests));
    }
    catch(e){
      console.log(e);
    }

  });

  yield takeLatest(`${serverpush_nearbyrequests_addone}`, function*(action) {
    try{
      const {payload} = action;
      const oldnearbyrequests = yield select((state)=>{
        return state.operate.nearbyrequests;
      });

      let nearbyrequestslist = [payload._id,...oldnearbyrequests.list];
      let requestsentities = oldnearbyrequests.requests;
      requestsentities[payload._id] = payload;

      const nearbyrequests = {
          list:[...nearbyrequestslist],
          requests:{
            ...requestsentities
          }
        };
      yield put(set_nearbyrequestsresult(nearbyrequests));
      playaudio('audio4');
    }
    catch(e){
      console.log(e);
    }
  });

  yield takeLatest(`${serverpush_nearbyrequests_removeone}`, function*(action) {
    try{
      const {payload} = action;
      const oldnearbyrequests = yield select((state)=>{
        return state.operate.nearbyrequests;
      });

      let nearbyrequestslist = [];
      _.map(oldnearbyrequests.list,(requestid)=>{
        if(requestid !== payload._id){
          nearbyrequestslist.push(requestid);
        }
      });
      let requestsentities = oldnearbyrequests.requests;
      delete requestsentities[payload._id];
      const nearbyrequests = {
            list:[...nearbyrequestslist],
            requests:{
                ...requestsentities
            }
        }
       yield put(set_nearbyrequestsresult(nearbyrequests));
    }
    catch(e){
      console.log(e);
    }

  });

}
