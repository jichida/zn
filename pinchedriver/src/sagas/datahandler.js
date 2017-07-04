import {
    md_login_result,//这个result特殊，需要判断是否登录
    common_err,
    logout_request,
    login_request
} from '../actions';


//接收的对应关系
let recvmessagetoresultpair = {
  'common_err':common_err,

  'login_result':md_login_result,
};

//非验证发送接口
let sendmessagefnsz = {
  'logout':`${logout_request}`,
  'login':`${login_request}`,
};

//验证发送接口
let sendmessageauthfnsz = {

};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
