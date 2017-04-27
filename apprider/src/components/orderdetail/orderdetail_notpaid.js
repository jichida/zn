import React from 'react';
import { connect } from 'react-redux';
import Payway from './payway.js';
import OrderDetailPinche from './orderdetailpinche';
import OrderDetailTourbus from './orderdetailtourbus';
import OrderDetailCar from './orderdetailcar';
import {
  View,Container,NavBar,Button
} from 'amazeui-touch';
import config from '../../config.js';


import {updateorder_request,ui_setorderdetail} from '../../actions';
import {getpaysign} from '../../actions/sagacallback';
import {onclickpay} from '../../env/pay';
export class Page extends React.Component {
  componentWillMount () {
  }
  onClickBack(){
    this.props.history.goBack();
  }
  onClickPay(){
    onclickpay(this.props);
  }

  onChange(paytype){
      this.props.dispatch(ui_setorderdetail({
          paytype:paytype
      }));
  }
  render() {
   const itemLeft = {
       title: '返回'
     };
     const dataLeft = {
       title: '订单详情',
       leftNav: [{...itemLeft, icon: 'left-nav'}],
       onAction: this.onClickBack.bind(this)
     };
     const {orderinfo}  = this.props;
     let OrderPayDetail = null;
     if(orderinfo){
         if(orderinfo.triptype === '拼车'){
           OrderPayDetail = <OrderDetailPinche {...this.props} />;
         }
         else if(orderinfo.triptype  === '旅游大巴'){
           OrderPayDetail = <OrderDetailTourbus {...this.props} />;
         }
         else {
           OrderPayDetail = <OrderDetailCar {...this.props} />;
         }
      }
      else{
        OrderPayDetail = <div>无效订单</div>;
      }

    let paystatus = orderinfo.paystatus || '未支付';
    let realprice = orderinfo.orderprice;
    if(orderinfo.triptype === '旅游大巴' || orderinfo.triptype === '代驾'){
      if(paystatus === '未支付'){
        realprice = orderinfo.frontmoney;
      }
      else{
        realprice = orderinfo.orderprice - orderinfo.frontmoney;
      }
    }

     return (
        <View>
          <NavBar {...dataLeft}/>
          <Container>
          <div>
            {OrderPayDetail}
            <Payway cursel={this.props.paytype} onChange={this.onChange.bind(this)}/>
    	     </div>

        </Container>
		      <nav className="tabbar tabbar-primary padding-0">
         <button onClick={this.onClickPay.bind(this)} className="btn btn-primary btn-block">确认支付{realprice}元</button>
         </nav>
        </View>
    );
  }
}

export default Page;
