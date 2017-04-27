import {
    showpopmessage,
    common_err,

    getabouthtml_result,

    login_result, login_err,
    getoftenuseaddress_result, 
    getoftenuseaddress_err,
    setoftenuseaddress_result, 
    setoftenuseaddress_err,

    getbuscarpoolcitylist_result,
    getbuscarpool_result,
    loginsendauth_result,
    loginsendauth_err,
    gethotcity_result,
    sethotcity,

    searchtext_result,
    getcurrentlocationandnearestdrivers_result,
    getnearestdrivers_result,
    starttriprequestorder_result,
    canceltriprequestorder_result,
    insertorder_result,
    insertorder_err,

    wait_updateorder_result,
    updateorder_result,
    getprice_result,
    driveroute_result,
    triporder_addone,
    triporder_updateone,
    gettourbus_result,
    getmytriporders_result,

    fillprofile_result,
    logout_result,
    updateorder_comment_result,
    getsystemconfig_result,


    wait_canceltriprequestorder_result,
    wait_starttriprequestorder_result,
    wait_insertorder_result,

    wait_getpaysign_result,
    getpaysign_result,
    getpaysign_err,

    serverpush_triprequest,
    serverpush_triporder,
    serverpush_triprequestandorder,
    serverpush_driverlocation,
    serverpush_orderprice,
    serverpush_restoreorder
} from '../actions';



const handlerlist = {
  ['getsystemconfig_result']: (socket, emit)=> {
    return ((payload) => {
      emit(getsystemconfig_result(payload));
    });
  },
  ['updateorder_comment_result']: (socket, emit)=> {
    return ((payload) => {
      emit(triporder_updateone(payload));
    });
  },
  ['serverpush_restoreorder']: (socket, emit)=> {
    return ((payload) => {
      emit(serverpush_restoreorder(payload));
    });
  },
  ['serverpush_driverlocation']: (socket, emit)=> {
    return ((payload) => {
      emit(serverpush_driverlocation(payload));
    });
  },
  ['serverpush_orderprice']: (socket, emit)=> {
    return ((payload) => {
      emit(serverpush_orderprice(payload));
    });
  },
  ['driveroute_result']: (socket, emit)=> {
    return ((payload) => {
      emit(driveroute_result(payload));
    });
  },
  ['getprice_result']: (socket, emit)=> {
    return ((payload) => {
      emit(getprice_result(payload));
    });
  },
  ['logout_result']: (socket, emit)=> {
    return ((payload) => {
      emit(logout_result(payload));
    });
  },
  ['getabouthtml_result']:(socket,emit)=>{
    return (result)=> {
      emit(getabouthtml_result(result));
    }
  },
  ['loginsendauth_result']:(socket,emit)=>{
    return ({authtoken,popmessage})=> {
      emit(loginsendauth_result(authtoken));
      emit(showpopmessage({
        title:'成功',
        msg:popmessage,
        type:'success'
      }));
    }
  },
  ['loginsendauth_err']:(socket,emit)=>{
    return ({errmsg})=>{
      emit(showpopmessage({
        title:'发送失败',
        msg:errmsg,
        type:'error'
      }));
    }
  },
  ['login_result']:(socket,emit)=>{
    return (payload)=>{
      emit(login_result(payload));
      // emit(showpopmessage({
      //   title:'成功',
      //   msg:'登录成功',
      //   type:'success'
      // }));
    }
  },
  ['fillprofile_result']:(socket,emit)=>{
    return ({profile})=>{
      emit(fillprofile_result({profile}));
    }
  },
  ['login_err']:(socket,emit)=>{
    return ({errmsg})=>{
      emit(showpopmessage({
        title:'登录失败',
        msg:errmsg,
        type:'error'
      }));
    }
  },
  ['common_err']:(socket,emit)=>{
    return ({errmsg})=>{
      emit(showpopmessage({
        title:'错误',
        msg:errmsg,
        type:'error'
      }));
    }
  },
  ['getbuscarpool_result']:(socket,emit)=>{
    return ({list})=>{
      emit(getbuscarpool_result(list));
    }
  },
  ['getbuscarpoolcitylist_result']:(socket,emit)=>{
    return ({citylist})=>{
      emit(getbuscarpoolcitylist_result(citylist));
    }
  },
  ['gettourbus_result']:(socket,emit)=>{
    return ({list})=>{
      emit(gettourbus_result(list));
    }
  },
  ['gethotcity_result']:(socket,emit)=>{
    return ({hotcity})=>{
      emit(sethotcity(hotcity));
    }
  },
  ['getoftenuseaddress_result']:(socket,emit)=>{
    return ({oftenuseaddress})=>{
      emit(getoftenuseaddress_result(oftenuseaddress));
    }
  },
  ['setoftenuseaddress_result']:(socket,emit)=>{
    return ({oftenuseaddress})=>{
      emit(setoftenuseaddress_result(oftenuseaddress));
    }
  },
  ['searchtext_result']:(socket,emit)=>{
    return ({result})=>{
      emit(searchtext_result({result}));
    }
  },
  ['getcurrentlocationandnearestdrivers_result']:(socket,emit)=>{
    return (result)=>{
      emit(getcurrentlocationandnearestdrivers_result(result));
    }
  },
  ['getnearestdrivers_result']:(socket,emit)=>{
    return (result)=>{
      emit(getnearestdrivers_result(result));
    }
  },
  ['serverpush_triprequest']:(socket,emit)=>{
    return (result)=>{
      emit(serverpush_triprequest(result));
    }
  },
  ['serverpush_triporder']:(socket,emit)=>{
    return (result)=>{
      emit(serverpush_triporder(result));
      emit(triporder_updateone(result.triporder));
    }
  },
  ['serverpush_triprequestandorder']:(socket,emit)=>{
    return (result)=>{
      emit(serverpush_triprequestandorder(result));
      emit(triporder_updateone(result.triporder));
    }
  },
  ['starttriprequestorder_result']:(socket,emit)=>{
    return (result)=>{
      emit(starttriprequestorder_result(result));
      emit(wait_starttriprequestorder_result({result:result}));
      emit(triporder_addone(result.triporder));
    }
  },
  ['insertorder_result']:(socket,emit)=>{
    return (result)=>{
      emit(triporder_addone(result.triporder));
      emit(wait_insertorder_result({result:result}));
    }
  },
  ['updateorder_result']:(socket,emit)=>{
    return (result)=>{
      emit(triporder_updateone(result.triporder));
      emit(wait_updateorder_result({result:result}));
    }
  },
  ['insertorder_err']:(socket,emit)=>{
    return (errmsg)=>{
      emit(wait_insertorder_result({err:errmsg}));
    }
  },
  ['canceltriprequestorder_result']:(socket,emit)=>{
    return (result)=>{
      emit(canceltriprequestorder_result(result));
      emit(wait_canceltriprequestorder_result({result:result}));
      emit(triporder_updateone(result.triporder));
    }
  },
  ['getpaysign_result']:(socket,emit)=>{
    return (result)=>{
      emit(wait_getpaysign_result({result:result}));
    }
  },
  ['getpaysign_err']:(socket,emit)=>{
    return ({errmsg})=>{
      emit(wait_getpaysign_result({err:errmsg}));
    }
  },
  ['getmytriporders_result']:(socket,emit)=>{
    return (result)=>{
      emit(getmytriporders_result(result));
    }
  },
};

export function wsrecvhandler(socket,emit){
  for(let handlername in handlerlist) {//不使用过滤
    socket.on(handlername,handlerlist[handlername](socket,emit));
  }
}
