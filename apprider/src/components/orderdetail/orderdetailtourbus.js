import React from 'react';
import moment from 'moment';
const OrderToPayDetail = (props) => {
  if(!props.hasOwnProperty('orderinfo')){
    return (<div>无效订单</div>);
  }
  let {orderinfo} = props;
  let startdate = new Date();
  let enddate = new Date();
  if(orderinfo.hasOwnProperty('startdate')){
    startdate = orderinfo.startdate;
  }
  if(orderinfo.hasOwnProperty('enddate')){
    enddate = orderinfo.enddate;
  }
  let startdatestring = moment(startdate).format("YYYY-MM-DD");
  let enddatestring = moment(enddate).format("YYYY-MM-DD");

  return (
    <div>
     <div className="group group-no-padded margin-top-0">
       <div className="group-body">
         <ul className="list">
           <li target="_blank" className="item item-content">
             <div className="item-media"><img width="60" src="images/user.jpg"  className=" radius50" alt='user'/></div>
             <div className="item-main">
               <div className="item-title-row">
                 <h3 className="item-title">{orderinfo.orderdetail}</h3>
               </div>
               <div className="item-desc">租车人：{orderinfo.rentusername}</div>
             </div>
             <img src="images/dh.png" alt="img" style={{width:"40px"}}/> </li>
         </ul>

               <div className="padding"><p className="margin-0">用车时间：{startdatestring}</p>
               <p className="margin-0">还车时间：{enddatestring}</p></div>
       </div>
     </div>
     <div className="group group-no-padded">
       <div className="group-body">
       <div className="padding text-center">
         <p><b className="fize28 text-primary">订单金额：{orderinfo.orderprice}</b>元</p>
       </div>
       </div>
     </div>
     </div>);
}



export default OrderToPayDetail;
