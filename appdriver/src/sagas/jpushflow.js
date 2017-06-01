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
import _ from 'lodash';
import { push,goBack,go  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

function alertmessage(payload){
   return new Promise((resolve, reject) => {
       alert(payload);
       resolve({});
   });
}

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
        try{
          //yield call(alertmessage,`jpushlistenInMessage ===>${JSON.stringify(msgobj)}`);
          let {payload:msgobj} = action;
          let message = '接收到一条消息';
          message = _.get(msgobj,'aps.alert',message);
          yield put(set_weui({
            toast:{
            text:message,
            show: true,
            type:'success'
          }}));
          if(msgobj.hasOwnProperty('_id')){
            yield put(push(`/mymessagedetail/${msgobj._id}`));
          }
          console.log(`jpushlistenInMessage ===>${JSON.stringify(msgobj)}`);
        }
        catch(e){
        //  alert(`err->jpushlistenInMessage ===>${JSON.stringify(msgobj)},e:${JSON.stringify(e)}`);
        }

    });

    yield takeEvery(`${jpushpostNotification}`, function*(action) {
        // 按 2，模拟发送（点击了推送消息）
        try{
          //alert(`jpushpostNotification ===>${JSON.stringify(msgobj)}`);
          //yield call(alertmessage,`jpushpostNotification ===>${JSON.stringify(msgobj)}`);
          let {payload:msgobj} = action;
          if(msgobj.hasOwnProperty('_id')){
            yield put(push(`/mymessagedetail/${msgobj._id}`));
          }
          else{
            let message = '接收到一条消息';
            message = _.get(msgobj,'aps.alert',message);
            yield put(set_weui({
              toast:{
              text:message,
              show: true,
              type:'success'
            }}));
          }
          //console.log(`jpushpostNotification ===>${JSON.stringify(msgobj)}`);
        }
        catch(e){
          //alert(`err->jpushpostNotification ===>${JSON.stringify(msgobj)},e:${JSON.stringify(e)}`);
        }

    });
}
