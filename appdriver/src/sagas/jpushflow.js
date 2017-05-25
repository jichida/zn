import {takeEvery,put,call} from 'redux-saga/effects';
import {
    login_result,
    logout_result,
    jpushlistenInMessage,
    jpushpostNotification,
    set_weui
} from '../actions';
import {
    setJPushAlias,
    cancelJPushAlisa
} from '../env/jpush';
//获取地理位置信息，封装为promise
export function* jpushflow(){//仅执行一次
    yield takeEvery(`${login_result}`, function*(action) {
      let {payload:{userid}} = action;
      setJPushAlias(userid);
      console.log(`login_result ===>${JSON.stringify(userid)}`);
    });

    yield takeEvery(`${logout_result}`, function*(action) {
      let {payload:msgobj} = action;
      cancelJPushAlisa();
      console.log(`logout_result ===>${JSON.stringify(msgobj)}`);
    });

    yield takeEvery(`${jpushlistenInMessage}`, function*(action) {
        let {payload:msgobj} = action;
        yield put(set_weui({
          toast:{
          text:JSON.stringify(msgobj),
          show: true,
          type:'warning'
        }}));
        console.log(`jpushlistenInMessage ===>${JSON.stringify(msgobj)}`);
    });

    yield takeEvery(`${jpushpostNotification}`, function*(action) {
        let {payload:msgobj} = action;
        yield put(set_weui({
          toast:{
          text:JSON.stringify(msgobj),
          show: true,
          type:'warning'
        }}));
        console.log(`jpushpostNotification ===>${JSON.stringify(msgobj)}`);
    });
}
