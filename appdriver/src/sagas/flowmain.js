/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import config from '../config.js';
import { fork, take, call, put, cancel } from 'redux-saga/effects';

import store from '../env/store.js';

import {wsrecvhandler} from './wsrecvhandler.js';
import {getcurrentpos} from './getcurrentpos';
import data from './datahandler.js';
import {
    login_result,
    logout_result,
    logout_request,
    notify_socket_connected
} from '../actions';

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
        let fnsz = data.sendmessageauthfnsz;

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
    let fnsz =  data.sendmessagefnsz;
    for (var cmd in fnsz) {
        yield fork(write, socket,fnsz[cmd],cmd);
    }
}


export function* flowmain() {
    const socket = yield call(connect);
    //连接上以后直接发送-----》
    sendmsgwhenreconnect(socket);

    const taskread = yield fork(read, socket);
    const taskwritewithauth = yield fork(handleIOWithAuth, socket);
    const taskwrite = yield fork(handleIO, socket);

}
