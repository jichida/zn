//import {updateorder_request,ui_setorderdetail} from '../../actions';
import {getpaysign} from '../actions/sagacallback';
import * as xview from './xview/Common';

export const onclickpay = ({orderinfo,payway,dispatch},callbackfn)=> {
  // if(payway === 'alipay'){
  //   let param={appid:"wx2be56c97af373c6b",noncestr:"flOaJHzueF6YaoYq",package:"Sign=WXPay",partnerid:"1420780402",prepayid:"wx2017030416453305ddbf9b350712243602",sign:"5EE3E0C56F9C2F0AEC95AB2FF78DD25F",timestamp:"1488617132"};
  //   alert(JSON.stringify(param));
  //   xview.wxpayUrl(param,(data)=>{
  //     alert(JSON.stringify(data));
  //   });
  // }
  // else if(payway === 'weixin'){
  //   let param="partner=\"2088521376976114\"&seller_id=\"1742688357@qq.com\"&out_trade_no=\"PC_D1488616952710292\"&subject=\"PC_D1488616952710292\"&body=\"XVIEW alipay\"&total_fee=\"10.01\"&notify_url=\"http://www.yaoquan.com28.cn/servlet/NotifyAlipayServlet\"&service=\"mobile.securitypay.pay\"&payment_type=\"1\"&_input_charset=\"utf-8\"&it_b_pay=\"30m\"&sign=\"Ee%2Fo%2B%2BGhOpktpKDw1iJ51glG9wdd0UJ2gji0z5VNeBPZRuKj7OHVp0S%2F6XOgUK7xrPJVqUFWuO06%2Fr4AYzMumH%2F4jI%2B2G3OULhDONmJsBJYCz4%2FVZk9TTWIY7YVlH5Kl28ztJRS5KsfpPbOvXpCytTYwVcydGgVvzDhRXsGIVq8%3D\"&sign_type=\"RSA\"";
  //   alert(param);
  //   xview.alipayUrl(param,(data)=>{
  //     alert(JSON.stringify(data));
  //   });
  // }


   let orderdoc = {
      out_trade_no: orderinfo._id,
      subject: orderinfo.ordertitle || '商品名称',//$('#subject').val(),//'WL144626511265842',//$('#subject').val(),
      body: orderinfo.body || '商品详情',//$('#body').val(),//'WL144626511265842',//
      total_fee: '0.01',//$('#fee').val(),//'9.00',
    };
    if(payway === 'weixin'){
        orderdoc.total_fee = 1;
    }
    dispatch(getpaysign({
        paytype:payway,
        paypage:'orderdetailpage',
        orderdoc:orderdoc,
    })).then((paysign)=>{
       if(payway === 'weixin'){
         xview.wxpayUrl(paysign,(result)=>{
          callbackfn(result);
        });
       }
       else if(payway === 'alipay'){
          xview.alipayUrl(paysign,(result)=>{
            callbackfn(result);
         });
       }
    });
}