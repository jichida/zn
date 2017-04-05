import {
    showpopmessage,
    common_err,
    disconnect,
    getabouthtml_result,

    login_result, login_err,
    getoftenuseaddress_result, getoftenuseaddress_err,
    setoftenuseaddress_result, setoftenuseaddress_err,

    getbuscarpoolcitylist_result,
    getbuscarpool_result,
    loginsendauth_result,
    loginsendauth_err,
    gethotcity_result,
    sethotcity,

    searchtext_result,
    getcurrentlocationandnearestdrivers_result,
    wait_acceptrequest_result,
    acceptrequest_result,
    serverpush_nearbyrequests,
    serverpush_nearbyrequests_removeone,
    serverpush_nearbyrequests_addone,
    updaterequeststatus_result,updaterequeststatus_err,wait_updaterequeststatus_result,
    canceltriprequestorder_result,wait_canceltriprequestorder_request,wait_canceltriprequestorder_result,

    driveroute_result,
    triporder_addone,
    triporder_updateone,
    getmytriporders_result,
    logout_result,
    serverpush_driverlocation,
    serverpush_orderprice,
    serverpush_restoreorder,
    updateorder_comment_result
} from '../actions';
import {serverpush_triprequest,serverpush_triporder,serverpush_triprequestandorder} from '../actions';

import {wait_starttriprequestorder_result} from '../actions';



const handlerlist = {
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
  ['logout_result']: (socket, emit)=> {
    return (() => {
      console.log("logout_result....");
      emit(logout_result());
    });
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
  ['serverpush_nearbyrequests']:(socket,emit)=>{
    return ({list})=>{
      emit(serverpush_nearbyrequests(list));
    }
  },
  ['serverpush_nearbyrequests_removeone']:(socket,emit)=>{
    return (result)=>{
      emit(serverpush_nearbyrequests_removeone(result));
    }
  },
  ['serverpush_nearbyrequests_addone']:(socket,emit)=>{
    return (result)=>{
      emit(serverpush_nearbyrequests_addone(result));
    }
  },
  ['getbuscarpool_result']:(socket,emit)=>{
    return ({hotcity})=>{
      emit(getbuscarpool_result(hotcity));
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
  ['acceptrequest_result']:(socket,emit)=>{
    return (result)=>{
      emit(acceptrequest_result(result));
      emit(wait_acceptrequest_result({result:result}));
      emit(triporder_addone(result.triporder));
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
  ['acceptrequest_err']:(socket,emit)=>{
    return ({errmsg})=>{
      emit(wait_acceptrequest_result({err:errmsg}));
    }
  },
  ['updaterequeststatus_result']:(socket,emit)=>{
    return (result)=>{
      emit(updaterequeststatus_result(result));
      emit(wait_updaterequeststatus_result({result:result}));
    }
  },
  ['canceltriprequestorder_result']:(socket,emit)=>{
    return (result)=>{
      emit(canceltriprequestorder_result(result));
      emit(wait_canceltriprequestorder_result({result:result}));
    }
  },
  ['driveroute_result']:(socket,emit)=>{
    return (result)=>{
      emit(driveroute_result(result));
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
