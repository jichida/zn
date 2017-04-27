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
    gettourbus_request,

    getabouthtml_request,

    loginsendauth_request,loginwithauth_request,loginwithtoken_request,

    getoftenuseaddress_request,
    setoftenuseaddress_request,
    searchtext_request,

    logout_request,
    logout_result,
    getcurrentlocationandnearestdrivers_request,
    getnearestdrivers_request,
    starttriprequestorder_request,
    canceltriprequestorder_request,
    pushrequesttodrivers_request,
    insertorder_request,
    getmytriporders_request,
    getprice_request,
    getpaysign_request,
    updateorder_request,
    fillprofile_request,
    notify_socket_connected,
    updateorder_comment_request,
    

} from '../actions';
import {driveroute_request} from '../actions';
import store from '../env/store.js';
import {wsrecvhandler} from './wsrecvhandler.js';


let sendmsgwhenreconnect =(socket)=>{
    //连接上以后直接发送-----》
    let token = localStorage.getItem('zhongnan_rider_token');
    if (token !== null) {
        socket.emit('apprider',{cmd:'loginwithtoken',data:{token:token}});
    }
    socket.emit('apprider',{cmd:'gethotcity',data:{}});
    socket.emit('apprider',{cmd:'gettourbus',data:{}});
    socket.emit('apprider',{cmd:'getsystemconfig',data:{}});


    store.dispatch(notify_socket_connected(true));
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
        console.log(`获取到:${action}`);
        yield put(action);
    }
}

function* write(socket,fun,cmd) {
    while (true) {
        let { payload } = yield take(fun);
        console.log(`写命令--》${cmd}:` + JSON.stringify(payload));
        socket.emit('apprider',{cmd:cmd,data:payload});
    }
}

function* handleIOWithAuth(socket) {
    while (true) {
        console.log("未登录!");
        yield take(`${login_result}`);
        console.log("登录成功!");
        let fnsz = {
            'getemerygencycontact':`${getemerygencycontact_request}`,
            'getoftenuseaddress':`${getoftenuseaddress_request}`,
            'setoftenuseaddress':`${setoftenuseaddress_request}`,
            'starttriprequestorder':`${starttriprequestorder_request}`,
            'canceltriprequestorder':`${canceltriprequestorder_request}`,
            'pushrequesttodrivers':`${pushrequesttodrivers_request}`,
            'getmytriporders':`${getmytriporders_request}`,
            'insertorder':`${insertorder_request}`,
            'updateorder':`${updateorder_request}`,
            'getpaysign':`${getpaysign_request}`,
            'fillprofile':`${fillprofile_request}`,
            'updateorder_comment':`${updateorder_comment_request}`,
            'logout':`${logout_request}`,
        };

        let tasksz =[];
        for (let cmd in fnsz) {
            let task =  yield fork(write, socket,fnsz[cmd],cmd);
            tasksz.push(task);
        }
        let action = yield take(`${logout_result}`);

        for (let task of tasksz) {
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

        'searchtext':`${searchtext_request}`,
        'driveroute':`${driveroute_request}`,
        'getcurrentlocationandnearestdrivers':`${getcurrentlocationandnearestdrivers_request}`,
        'getnearestdrivers':`${getnearestdrivers_request}`,
        'gettourbus':`${gettourbus_request}`,
        'getprice':`${getprice_request}`,
    };


    let tasksz =[];
    for (let cmd in fnsz) {
        let task =  yield fork(write, socket,fnsz[cmd],cmd);
        tasksz.push(task);
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
