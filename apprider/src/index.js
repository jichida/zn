import React from 'react';
import ReactDOM from 'react-dom';
import Root from './env/root';
import store,{sagaMiddleware} from './env/store';
import rootSaga from './sagas';
// import {handleChange} from './sagas/subscribereduxstate';
import {
    postNotifyFromJPush
} from './env/jpush';
import {
  registerandroid
} from './env/android';
import {
  haveWechatApp
} from './env/login';
import {
  setisweixininstalled
} from './actions';

sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Root />,
  document.getElementById('root')
);


// store.subscribe(handleChange);
registerandroid();
postNotifyFromJPush(store.dispatch);

haveWechatApp((data)=>{
  //alert(JSON.stringify(`微信是否安装:${JSON.stringify(data)}`));
  let isweixininstalled = true;
  if(!!data){
    // 	{code: 1} 手机没有安装微信客户端
    isweixininstalled = data.code === '1'?false:true;
  }
  store.dispatch(setisweixininstalled(isweixininstalled));
});
