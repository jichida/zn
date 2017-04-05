/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import config from '../config.js';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
    login_result,//这个result特殊，需要判断是否登录
    getbuscarpoolcitylist_request,
    getbuscarpool_request,
    getemerygencycontact_request,

    showpopmessage,
    disconnect,
    getabouthtml_request,

    loginsendauth_request,loginwithauth_request,loginwithtoken_request,

    getoftenuseaddress_request,
    setoftenuseaddress_request,
    searchtext_request,

    getcurrentlocationandnearestdrivers_request,
    updaterequeststatus_request,
    canceltriprequestorder_request,
    acceptrequest_request,
    getmytriporders_request,
    sendcurlocationtoserver,

    operatelogin,
    operatelogout,
    notify_socket_connected,
    logout_request,logout_result,
    updateorder_comment_request,
} from '../actions';
import store from '../env/store.js';

import {driveroute_request} from '../actions';
import {starttriprequestorderflow} from '../actions/sagacallback';

import {wsrecvhandler} from './wsrecvhandler.js';
import {getcurrentpos} from './getcurrentpos';

let sendmsgwhenreconnect =(socket)=>{
    let token = localStorage.getItem('zhongnan_driver_token');
    if (token !== null) {
        //take token to login...
        socket.emit('appdriver',{cmd:'loginwithtoken',data:{token:token}});
    }
    store.dispatch(notify_socket_connected(true));
}

let sendmsgwhenlogined  = (socket)=>{
    //发送app版本信息
    socket.emit('appdriver',{cmd:'senddriverappinfo',data:{appversion:config.appversion}});
}

function connect() {
    const socket = io(config.serverurl);
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
}

function subscribe(socket) {
    return eventChannel(emit => {
        wsrecvhandler(socket,emit);
        socket.on('connect',()=>{
            sendmsgwhenreconnect(socket);
        });
        socket.on('disconnect',()=>{
            store.dispatch(notify_socket_connected(false));
        });
        socket.on('error',()=>{
            //emit(disconnect());
        });
        return () => {};
    });
}

function* read(socket) {
    const channel = yield call(subscribe, socket);
    while (true) {
        let action = yield take(channel);
        console.log(`read action:${action}`);
        yield put(action);
    }
}

function* write(socket,fun,cmd) {
    while (true) {
        let { payload } = yield take(fun);
        console.log(`${cmd}:` + JSON.stringify(payload));
        socket.emit('appdriver',{cmd:cmd,data:payload});
    }
}

function* handleIOWithAuth(socket) {
    let tasksz =[];
    while (true) {
        console.log("等待登录中...!");
        yield take(`${login_result}`);
        sendmsgwhenlogined(socket);

        console.log("登录成功!");
        let fnsz = {
            'getbuscarpool':`${getbuscarpool_request}`,
            'getoftenuseaddress':`${getoftenuseaddress_request}`,
            'setoftenuseaddress':`${setoftenuseaddress_request}`,
            'acceptrequest':`${acceptrequest_request}`,
            'sendcurlocationtoserver':`${sendcurlocationtoserver}`,
            'updaterequeststatus':`${updaterequeststatus_request}`,
            'canceltriprequestorder':`${canceltriprequestorder_request}`,
            'getmytriporders':`${getmytriporders_request}`,
            'updateorder_comment':`${updateorder_comment_request}`
        };

        for (var cmd in fnsz) {
            let task =  yield fork(write, socket,fnsz[cmd],cmd);
            tasksz.push(task);
        }

        //注销比较特殊
        let actionlogoutrequest = yield take(`${logout_request}`);
        console.log("捕获到登出消息,开始获取地址");
        let curlocation = yield call(getcurrentpos);
        let operateLogoutdoc = {
          driverlocation :[curlocation.lng,curlocation.lat]
        };
        console.log("登出APP发送当前位置(注销)：" + JSON.stringify(operateLogoutdoc));
        socket.emit('appdriver',{cmd:'operatelogout',data:operateLogoutdoc});
        socket.emit('appdriver',{cmd:'logout',data:actionlogoutrequest.payload});
        let actionlogoutresult = yield take(`${logout_result}`);
        for (var task of tasksz) {
            yield cancel(task);
        }
    }
}

function* handleIO(socket) {
    let fnsz =  {
        'getabouthtml':`${getabouthtml_request}`,
        'loginsendauth':`${loginsendauth_request}`,
        'loginwithauth':`${loginwithauth_request}`,
        'loginwithtoken':`${loginwithtoken_request}`,
        'getbuscarpoolcitylist':`${getbuscarpoolcitylist_request}`,
        'getbuscarpool':`${getbuscarpool_request}`,
        'getemerygencycontact':`${getemerygencycontact_request}`,
        'searchtext':`${searchtext_request}`,
        'driveroute':`${driveroute_request}`,
        'getcurrentlocationandnearestdrivers':`${getcurrentlocationandnearestdrivers_request}`,
        'operatelogin':`${operatelogin}`,
        'operatelogout':`${operatelogout}`,
    };

    for (var cmd in fnsz) {
        yield fork(write, socket,fnsz[cmd],cmd);
    }
}


export function* flowmain() {
    // while (true) {
    //   console.log("flow...");

    const socket = yield call(connect);
    //连接上以后直接发送-----》
    sendmsgwhenreconnect(socket);
    //  socket.emit('appdriver',{ cmd:'gethotcity',data:{}});

    const taskread = yield fork(read, socket);
    const taskwritewithauth = yield fork(handleIOWithAuth, socket);
    const taskwrite = yield fork(handleIO, socket);

    //   yield take(`${disconnect}`);
    //   console.log('断开连接,重新连接中');
    //   yield cancel(taskread);
    //   yield cancel(taskwritewithauth);
    //   yield cancel(taskwrite);
    // }
}
