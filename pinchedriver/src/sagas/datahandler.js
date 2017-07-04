import {
    common_err,

    login_request,
    login_result,//这个result特殊，需要判断是否登录

    logout_request,
    logout_result,

    getmypincheroute_request,
    getmypincheroute_result,

    getonepincheroutepassengers_request,
    getonepincheroutepassengers_result,

    getsystemconfig_result
  } from '../actions';


//接收的对应关系
let recvmessagetoresultpair = {
  'getsystemconfig_result':getsystemconfig_result,

  'common_err':common_err,

  'login_result':login_result,
  'logout_result':logout_result,

  'getmypincheroute_result':getmypincheroute_result,
  'getonepincheroutepassengers_result':getonepincheroutepassengers_result,
};

//非验证发送接口
let sendmessagefnsz = {
  'logout':`${logout_request}`,
  'login':`${login_request}`,
};

//验证发送接口
let sendmessageauthfnsz = {
  'getmypincheroute':`${getmypincheroute_request}`,
  'getonepincheroutepassengers':`${getonepincheroutepassengers_request}`,
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
