/*
    支付
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import NavBar from '../tools/nav.js';
import '../../../public/newcss/pay.css';
//import Selpay from './selpay.js';
const {
    Cell,
    CellBody,
    CellFooter,
    Cells
    } = WeUI;
import _ from 'lodash';
import Selpay from '../mywallet/renderselpay';
import {
  ui_setorderdetail,
  payorder_request,
} from '../../actions';

class Page extends Component {
    onClickSelCoupon(){
      this.props.history.push('/mycoupons/sel');
    }
    onClickPay(){
      const {orderinfo,paytype,realprice} = this.props;
      const {
        orderprice,
        triptype
      } = orderinfo;
      let orderinfotopay = {
        paytype,
        realprice
      };
      if(paytype === 'leftbalance'){
        orderinfotopay.balanceprice = realprice;
        orderinfotopay.realprice = 0;
      }
      orderinfotopay.ordertitle = `${triptype}订单`;
      orderinfotopay.orderdetail = `${triptype}订单${orderprice}元`;
      this.props.dispatch(payorder_request({
        query:{_id:orderinfo._id},
        data:orderinfotopay
      }));
    }
    onChangePaytype(paytype){
      this.props.dispatch(ui_setorderdetail({paytype}));
    }
    render() {
        const {orderinfo,paytype,realprice} = this.props;
        const {
          orderprice,
          triptype
        } = orderinfo;

        let paycontentlist  = [];
        if(triptype === '出租车' || triptype === '快车' || triptype === '代驾' ){
            const {realtimepricedetail} = orderinfo;
            if(!!realtimepricedetail && orderprice > 0){
              let {pricelistdetail} = realtimepricedetail;
              paycontentlist = pricelistdetail || [{
                name:`里程${realtimepricedetail.totalkm}公里`,
                fee:`${orderprice}元`
              }];
            }
            else{
              paycontentlist.push({
                name:`费用`,
                fee:`0元`
              });
            }
        }
        else if(triptype === '拼车'){
          paycontentlist.push({
            name:`拼车费用`,
            fee:`${orderprice}元`
          });
        }
        else if(triptype === '旅游大巴'){
          paycontentlist.push({
            name:`总费用`,
            fee:`${orderprice}元`
          });
        }

        let input = {
          value:paytype,
          onChange:this.onChangePaytype.bind(this)
        };
        return (
            <div className="payPage AppPage">
                <NavBar back={true} title="支付订单" />
                <div className="orderinfo">
                    <div className="tit">{triptype}车费情况</div>
                    <div className="list">
                        {
                          _.map(paycontentlist,(feeinfo,index)=>{
                            return (
                              <p key={index}><span>{feeinfo.name}</span><span>{feeinfo.fee}</span></p>
                            )
                          })
                        }
                    </div>
                </div>

                <div className="list">

                    <Cells>
                        <Cell access onClick={this.onClickSelCoupon.bind(this)}>
                            <CellBody>
                                优惠券
                            </CellBody>
                            <CellFooter>
                                <span>3张</span>
                            </CellFooter>
                        </Cell>
                        <Cell access>
                            <CellBody>
                                优惠券
                            </CellBody>
                            <CellFooter>
                                <span className="color_error">-3元</span>
                            </CellFooter>
                        </Cell>
                    </Cells>
                    <Selpay paytypelist={['weixin','alipay','leftbalance']} input={input}/>
                </div>
                <div className="paybtn">
                    <span>
                        还需支付：<span>{realprice}元</span>
                    </span>
                    <span className="btn Primary" onClick={this.onClickPay.bind(this)}>
                        确定支付
                    </span>
                </div>
            </div>
        )
    }

}

const mapStateToProps =  ({orderdetail,myorders}, props) =>{
    let triporderid = props.match.params.triporderid;
    let orderinfo = myorders.triporders[triporderid];
    let realprice = orderinfo.orderprice;
    //优惠券／优惠券抵扣金额
    return {...orderdetail,orderinfo,realprice};
};

export default connect(
    mapStateToProps,
)(Page);
