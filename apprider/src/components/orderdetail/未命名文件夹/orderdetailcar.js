import React from 'react';
import {Rating} from 'belle';
const OrderToPayDetail = (props) => {
  if(!props.hasOwnProperty('orderinfo')){
    return (<div>无效订单</div>);
  }
  let driverinfo = props.orderinfo.driveruserinfo|| {
        drivername:'无名司机',
        carid:'隐藏车牌',
        carname:'匿名车辆',
        starnum:5
      };
  let onClickFeedetail = ()=>{
    props.history.push(`/feedetail/${props.orderinfo._id}`);
  }
  return (
    <div>
    <div className="group group-no-padded margin-top-0">
      <div className="group-body">
        <ul className="list">
          <li target="_blank" className="item item-content">
            <div className="item-media"><img width="60" src="images/user.jpg"  className=" radius50" alt='user'/></div>
            <div className="item-main">
              <div className="item-title-row">
                <h3 className="item-title">{driverinfo.drivername}~{driverinfo.carid}</h3>
              </div>
              <div className="item-subtitle">{driverinfo.carname}</div>

              <Rating defaultValue={driverinfo.starnum} disabled={true}
              characterStyle={{'fontSize':'1.4rem'}}/>
            </div>
            <img src="images/dh.png" alt="img" style={{width:"40px"}}/> </li>
        </ul>
      </div>
    </div>

    <div className="group group-no-padded">
      <div className="group-body">
      <div className="padding text-center">
        您好，您需要支付
        <div><b className="fize28 text-primary">{props.orderinfo.orderprice}</b>元</div>
		<div className="g">
    <div onClick={onClickFeedetail} className="col text-right col-center">查看详情<span className="icon icon-right-nav item-icon"></span></div>
    <div className="col text-left col-center">优惠券抵扣：<b className="text-primary">5</b>元</div></div>
      </div>
      </div>
    </div>
     </div>);
}



export default OrderToPayDetail;
