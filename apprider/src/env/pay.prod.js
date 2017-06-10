//import {updateorder_request,ui_setorderdetail} from '../../actions';
import {getpaysign} from '../actions/sagacallback';
import Common from './xview/Common.js';

 export const payorder = (paysign,orderinfo,callbackfn)=>{
   try{
     if(orderinfo.paytype === 'weixin'){
       Common.wxpayUrl(paysign,(result)=>{
         callbackfn(result);
      });
     }
     else if(orderinfo.paytype === 'alipay'){
        Common.alipayUrl(paysign,(result)=>{
          callbackfn(result);
       });
     }
     else if(orderinfo.paytype === 'leftbalance'){
       callbackfn(paysign);
     }
   }
   catch(e){
     alert(`payorder错误.${JSON.stringify(e)}`);
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
           Common.wxpayUrl(paysign,(result)=>{
          });
         }
         else if(this.props.paytype === 'alipay'){
            Common.alipayUrl(paysign,(result)=>{
           });
         }
         else if(orderinfo.paytype === 'leftbalance'){
           //callbackfn(paysign);
         }
      });
  }
  catch(e){
    alert(`onclickpay错误.${JSON.stringify(e)}`);
    //callbackfn(paysign);
  }
}
