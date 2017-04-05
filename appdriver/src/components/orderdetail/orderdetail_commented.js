import React from 'react';
import {
  Button,Container
} from 'amazeui-touch';
import {Rating} from 'belle';

const OrderDetailCarComment = (props) => {
  let onClickFeedetail = ()=>{
    props.history.push(`/feedetail/${props.orderinfo._id}`);
  }
  return (
    <Container scrollable={true}>
    <div className="group group-no-padded margin-top-0">
      <div className="group-body">
        <ul className="list">
          <li target="_blank" className="item item-content">
            <div className="item-media"><img width="50" src="images/user.jpg" className="radius50" /></div>
            <div className="item-main">
              <div className="cfd_icon">{props.orderinfo.srcaddress.addressname}</div>
              <div className="zd_icon">{props.orderinfo.dstaddress.addressname}</div>
            </div>
            <img src="images/dh.png" alt="img" style={{width:"40px"}}/> </li>
        </ul>
      </div>
    </div>
    <div className="group group-no-padded">
      <div className="group-body">
        <div className="g text-center padding">
          <div className="col col-2 border_right"><span className="icon icon-zf text-primary fize32"></span>
            <div className="sk-icon-name text-truncate">{props.orderinfo.paystatus}</div>
          </div>
          <div className="col col-4">支付金额：<b className="fize28 text-primary">{props.orderinfo.orderprice}</b> 元</div>
        </div>
        <p onClick={onClickFeedetail} className="margin-0 text-center padding-bottom"><a ><small>查看收费明细</small></a></p>
      </div>
    </div>
    </Container>);
}



export default OrderDetailCarComment;
