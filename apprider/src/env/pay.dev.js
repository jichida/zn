import {updateorder_request} from '../actions';
import {getpaysign} from '../actions/sagacallback';
import {
  requestpost,
} from '../util/util.js';


export const payorder = (paysign,orderinfo,callbackfn)=>{
  let postdata = {
      "out_trade_no":orderinfo._id
  };
  requestpost('/pay/alipaytest',postdata,(err,result)=>{
          console.log("testpost err:" + JSON.stringify(err));
          console.log("testpost result:" + JSON.stringify(result));
          callbackfn(result);
  });
}


export const onclickpay = ({orderinfo,paytype,dispatch})=> {
   let orderdoc = {
      out_trade_no: orderinfo._id,
      subject: orderinfo.ordertitle,//$('#subject').val(),//'WL144626511265842',//$('#subject').val(),
      orderdetail: orderinfo.orderdetail,//$('#body').val(),//'WL144626511265842',//
      total_fee: '0.01',//$('#fee').val(),//'9.00',
    };
    dispatch(getpaysign({
        paytype:paytype,
        paypage:'orderdetailpage',
        orderdoc:orderdoc,
    })).then((paysign)=>{
        console.log('----->获取到sign:' + paysign);
        let postdata = {
            "out_trade_no":orderinfo._id
        };
        requestpost('/pay/alipaytest',postdata,(err,result)=>{
                console.log("testpost err:" + JSON.stringify(err));
                console.log("testpost result:" + JSON.stringify(result));
        });
            // let payinfo = {
            //     paystatus:'已支付',
            //     paytype:paytype
            // }
            // dispatch(updateorder_request({
            //     query:{_id:orderinfo._id},
            //     data:payinfo
            // }));
    });
}
