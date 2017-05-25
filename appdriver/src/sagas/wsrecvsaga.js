import { put,takeEvery} from 'redux-saga/effects';
import {
  acceptrequest_result,
  wait_acceptrequest_result,
  triporder_addone,

  loginsendauth_result,
  showpopmessage,
  serverpush_triporder,
  triporder_updateone,
  serverpush_triprequestandorder,
  updaterequeststatus_result,
  wait_updaterequeststatus_result,
  canceltriprequestorder_result,
  wait_canceltriprequestorder_result,

  common_err,

  md_acceptrequest_result,
  md_loginsendauth_result,
  md_serverpush_triporder,
  md_serverpush_triprequestandorder,
  md_updaterequeststatus_result,
  md_canceltriprequestorder_result,

  md_register_result,
  md_login_result,
  login_result,
  register_result,

  md_fillrealnameprofile_result,
  fillrealnameprofile_result,
  withdrawcashapplyaddone_result,
  withdrawcashapplyauth_result,
  carcreate_result,
  set_weui,
} from '../actions';
import { push,goBack,go,replace } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

export function* wsrecvsagaflow() {
  yield takeEvery(`${withdrawcashapplyauth_result}`, function*(action) {
      let {payload:result} = action;
      yield put(go(-2));
  });

  yield takeEvery(`${withdrawcashapplyaddone_result}`, function*(action) {
      let {payload:result} = action;
      yield put(push(`/withdrawauth/${result.newitem._id}`));
  });


  yield takeEvery(`${carcreate_result}`, function*(action) {
      let {payload:result} = action;
      yield put(goBack());
  });

  yield takeEvery(`${md_fillrealnameprofile_result}`, function*(action) {
      let {payload:result} = action;
      yield put(fillrealnameprofile_result(result));//在审核中
      console.log(`fillrealnameprofile_result===>${JSON.stringify(result)}`);
      console.log(`fillrealnameprofile_result approvalstatus===>${result.approvalstatus}`);
      if(result.approvalstatus === '待审核'){//审批中
        yield put(replace('/approval'));
      }
  });

  yield takeEvery(`${md_login_result}`, function*(action) {
      let {payload:result} = action;
      yield put(login_result(result));
      // if(result.approvalstatus=== '未递交'){
      //   yield put(push('/register1'));
      // }
      // else if(result.approvalstatus === '已审批'){
      //   yield put(push('/'));
      // }
      // else{//待审批/审批中/已拒绝/ 复用同一个页面
      //   yield put(push('/approval'));
      // }
  });

  yield takeEvery(`${md_register_result}`, function*(action) {
      let {payload:result} = action;
      yield put(register_result(result));
      yield put(push('/register1'));
  });


  yield takeEvery(`${md_acceptrequest_result}`, function*(action) {
      let {payload:result} = action;
      yield put(acceptrequest_result(result));
      yield put(wait_acceptrequest_result({result:result}));
      yield put(triporder_addone(result.triporder));
  });

  yield takeEvery(`${md_loginsendauth_result}`, function*(action) {
      let {payload:result} = action;
      yield put(loginsendauth_result(result));
      yield put(set_weui({
        toast:{
        text:result.popmessage,
        show: true,
        type:'success'
      }}));
  });

  yield takeEvery(`${md_serverpush_triporder}`, function*(action) {
      let {payload:result} = action;
      yield put(serverpush_triporder(result));
      yield put(triporder_updateone(result.triporder));
  });

  yield takeEvery(`${md_serverpush_triprequestandorder}`, function*(action) {
      let {payload:result} = action;
      yield put(serverpush_triprequestandorder(result));
      yield put(triporder_updateone(result.triporder));
  });

  yield takeEvery(`${common_err}`, function*(action) {
        let {payload:result} = action;
        console.log(`common_err:${JSON.stringify(result)}`);
        yield put(set_weui({
          toast:{
          text:result.errmsg,
          show: true,
          type:'warning'
        }}));
  });

  yield takeEvery(`${md_updaterequeststatus_result}`, function*(action) {
      let {payload:result} = action;
      const {triprequest, triporder} = result;
      if(!!triporder){
        //最后会有一个顺序
        yield put(triporder_updateone(result.triporder));
      }
      yield put(updaterequeststatus_result(result));
      yield put(wait_updaterequeststatus_result({result:result}));
  });

  yield takeEvery(`${md_canceltriprequestorder_result}`, function*(action) {
      let {payload:result} = action;
      yield put(canceltriprequestorder_result(result));
      yield put(wait_canceltriprequestorder_result({result:result}));
  });

}
