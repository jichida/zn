/**
 * Created by wangxiaoqing on 2017/3/21.
 */
import React from 'react';
import moment from 'moment';
import WeUI from 'react-weui';
const {
    Cell,
    CellBody,
    CellFooter
    } = WeUI;


let OrderItem =(props)=> {
    let {orderinfo,onClickSelCurOrder} = props;
    if(!orderinfo){
        return (<div>无订单项</div>);
    }
    console.log("orderitem:" + JSON.stringify((orderinfo)));
    if (typeof orderinfo.created_at === 'string') {
      orderinfo.created_at = new Date(Date.parse(orderinfo.created_at));
    }

    let createtimestring =moment(orderinfo.created_at).format("MM月DD日 HH时mm分");

    let srcaddressname = '';
    let dstaddressname = '';
    try{
      srcaddressname = orderinfo.srcaddress.addressname;
      dstaddressname = orderinfo.dstaddress.addressname;
    }
    catch(e){

    }

    let triptypename = orderinfo.isrealtime?'实时':'预约';
    return (
      <Cell access  onClick={()=>{onClickSelCurOrder(orderinfo);}}>
          <CellBody>
              <div className="tt">
                  <div className="ttinfo">
                      <span className="i">{triptypename}</span>
                      <span className="time">{createtimestring}</span>
                      <span className="type">{orderinfo.triptype}</span>
                  </div>
                  <span className="status color_warning">{orderinfo.orderstatus}</span>
              </div>
              <div className="li a">{srcaddressname}</div>
              <div className="li b">{dstaddressname}</div>
          </CellBody>
          <CellFooter />
      </Cell>
    );
}

export default OrderItem;
