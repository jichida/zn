import {
    getbuscarpool_request,
    getemerygencycontact_request,
    gettourbus_request,

    getabouthtml_request,

    loginsendauth_request,
    loginwithauth_request,
    loginwithtoken_request,

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

    driveroute_request,

    getsystemconfig_result,
    updateorder_comment_result,
    serverpush_restoreorder,
    serverpush_driverlocation,
    serverpush_orderprice,
    driveroute_result,
    getprice_result,

    getabouthtml_result,
    login_result,
    fillprofile_result,
    common_err,
    getbuscarpool_result,
    gettourbus_result,

    getoftenuseaddress_result,
    setoftenuseaddress_result,
    searchtext_result,
    getcurrentlocationandnearestdrivers_result,
    getnearestdrivers_result,
    serverpush_triprequest,
    serverpush_triporder,
    serverpush_triprequestandorder,
    starttriprequestorder_result,
    getmytriporders_result,

    insertorder_result,
    updateorder_result,
    canceltriprequestorder_result,
    getpaysign_result,

    md_serverpush_triporder,
    md_loginsendauth_result,
    md_serverpush_triprequestandorder,
    md_starttriprequestorder_result,
    md_canceltriprequestorder_result,


    rechargepay_request,
    rechargepay_result,

    payorder_request,
    payorder_result,

    serverpush_userbalance,
    queryuserbalance_request,
    queryuserbalance_result,
    md_queryuserbalance_result
} from '../actions';


//接收的对应关系
exports.recvmessagetoresultpair = {
  'serverpush_userbalance':serverpush_userbalance,
  'queryuserbalance_result':queryuserbalance_result,
  'payorder_result':payorder_result,
  'rechargepay_result':rechargepay_result,
  'getsystemconfig_result':getsystemconfig_result,
  'updateorder_comment_result':updateorder_comment_result,
  'serverpush_restoreorder':serverpush_restoreorder,
  'serverpush_driverlocation':serverpush_driverlocation,
  'serverpush_orderprice':serverpush_orderprice,
  'driveroute_result':driveroute_result,
  'getprice_result':getprice_result,
  'logout_result':logout_result,
  'getabouthtml_result':getabouthtml_result,
  'login_result':login_result,
  'fillprofile_result':fillprofile_result,
  'common_err':common_err,
  'getbuscarpool_result':getbuscarpool_result,
  'gettourbus_result':gettourbus_result,
  'getoftenuseaddress_result':getoftenuseaddress_result,
  'setoftenuseaddress_result':setoftenuseaddress_result,
  'searchtext_result':searchtext_result,
  'getcurrentlocationandnearestdrivers_result':getcurrentlocationandnearestdrivers_result,
  'getnearestdrivers_result':getnearestdrivers_result,
  'serverpush_triprequest':serverpush_triprequest,
  'serverpush_triporder':md_serverpush_triporder,
  'loginsendauth_result':md_loginsendauth_result,
  'serverpush_triprequestandorder':md_serverpush_triprequestandorder,
  'starttriprequestorder_result':md_starttriprequestorder_result,
  'getmytriporders_result':getmytriporders_result,

  'insertorder_result':insertorder_result,
  'updateorder_result':updateorder_result,
  'canceltriprequestorder_result':md_canceltriprequestorder_result,
  'getpaysign_result':getpaysign_result
};

//非验证发送接口
exports.sendmessagefnsz = {
  'getabouthtml':`${getabouthtml_request}`,
  'loginsendauth':`${loginsendauth_request}`,
  'loginwithauth':`${loginwithauth_request}`,
  'loginwithtoken':`${loginwithtoken_request}`,
  'getbuscarpool':`${getbuscarpool_request}`,

  'searchtext':`${searchtext_request}`,
  'driveroute':`${driveroute_request}`,
  'getcurrentlocationandnearestdrivers':`${getcurrentlocationandnearestdrivers_request}`,
  'getnearestdrivers':`${getnearestdrivers_request}`,
  'gettourbus':`${gettourbus_request}`,
  'getprice':`${getprice_request}`,
};

//验证发送接口
exports.sendmessageauthfnsz = {
  'queryuserbalance':`${queryuserbalance_request}`,
  'payorder':`${payorder_request}`,
  'rechargepay':`${rechargepay_request}`,
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
}
