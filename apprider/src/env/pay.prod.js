//import {updateorder_request,ui_setorderdetail} from '../../actions';
import {getpaysign} from '../actions/sagacallback';
import * as xview from './xview/Common.js';

 export const payorder = (paysign,orderinfo,callbackfn)=>{
   try{
     if(orderinfo.paytype === 'weixin'){
       xview.wxpayUrl(paysign,(result)=>{
         callbackfn(result);
      });
     }
     else if(orderinfo.paytype === 'alipay'){
        xview.alipayUrl(paysign,(result)=>{
          callbackfn(result);
       });
     }
     else if(orderinfo.paytype === 'leftbalance'){
       callbackfn(paysign);
     }
   }
   catch(e){
     alert(`paytype:${orderinfo.paytype}
       paysign:${JSON.stringify(paysign)}
       payorder错误.${JSON.stringify(e)}`);
     callbackfn(paysign);
   }

 }

export const onclickpay = ({orderinfo,paytype,dispatch})=> {
  try{
     let orderdoc = {
        out_trade_no: orderinfo._id,
        subject: orderinfo.ordertitle,//$('#subject').val(),//'WL144626511265842',//$('#subject').val(),
        orderdetail: orderinfo.orderdetail,//$('#body').val(),//'WL144626511265842',//
        total_fee: orderinfo.orderprice,//$('#fee').val(),//'9.00',
      };
      dispatch(getpaysign({
          paytype:paytype,
          paypage:'orderdetailpage',
          orderdoc:orderdoc,
      })).then((paysign)=>{

         if(this.props.paytype === 'weixin'){
           xview.wxpayUrl(paysign,(result)=>{
          });
         }
         else if(this.props.paytype === 'alipay'){
            xview.alipayUrl(paysign,(result)=>{
           });
         }
         else if(orderinfo.paytype === 'leftbalance'){

         }
      });
  }
  catch(e){
    alert(`onclickpay paytype:${orderinfo.paytype}
      paysign:${JSON.stringify(paysign)}
      payorder错误.${JSON.stringify(e)}`);
  
  }
}
