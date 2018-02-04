const config = require('../config.js');
let globalpayparam = {
    'alipay':
     {
      partner:'2088821585680935',
      seller_id:'15894448379@163.com',
      notify_url:config.rooturl+'/pay/alipay',//'http://www.guorouwang.com/wap_android5/pay/notify_url.jsp',
      service:'mobile.securitypay.pay',
      payment_type:'1',
      _input_charset:'utf-8',
      it_b_pay:'30m',
      keyfilename:__dirname +'/zn.pem',
      publickey:'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB',
    },
    'weixin':{
      appid:'wx2dd3b98bd67763d2',//微信分配的公众账号ID（企业号corpid即为此appId）,wxd678efh567hg6787
      attach:'测试数据',//附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据
      mch_id:'1491675102',//微信支付分配的商户号,例:1230000109
      notify_url:config.rooturl+'/pay/weixin',//接收微信支付异步通知回调地址
      trade_type:'APP',
      unifiedorderurl:'https://api.mch.weixin.qq.com/pay/unifiedorder',
      //以上为预支付
      keystring:'e10adc3949ba59abbe56e057f20f883e',
      package:'Sign=WXPay',
    },
};

module.exports = globalpayparam;
