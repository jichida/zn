/*
    个人中心-我的钱包
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userwallet.css';
import NavBar from '../tools/nav.js';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    CellsTitle
    } = WeUI;
import _ from 'lodash';
import {
  getrechargerecords_request,
} from '../../actions';
import {updateorder} from '../../actions/sagacallback.js';
import {onclickpay} from '../../env/pay';
//充值页面
class Page extends Component {
  constructor(props) {
      super(props);
   }
   componentWillMount () {
   }
   pay = (values)=>{
      let paytype = 'alipay';
      //更新订单信息，然后发送pay请求
      //例：充99返100,参数为realprice:99,orderprice:100
      const triporderid = this.props.match.params.triporderid;
      let orderinfo = {
        realprice:0.01,//实充价格
        orderprice:0.01,//新增余额价格
        paytype,
      };
      this.props.dispatch(updateorder({
        query:{_id:triporderid},
        data:orderinfo
      })).then((result)=>{
        onclickpay({
          orderinfo:result.triporder,
          paytype,
          dispatch:this.props.dispatch
        });
      });
   }
  render() {
        //支付方式和充值金额，用redux-form实现
        const {orderinfo,balance} = this.props;
        return (
            <div className="userwalletPage AppPage">
                <NavBar back={true} title="充值" />
                <div className="head">
                    <img src="newimg/10.png" />
                    <div>
                        <span className="tit">余额(元)</span>
                        <span className="myprice">{balance}</span>
                    </div>
                </div>
                <div className="list">
                    <Cells className="tixianlnk">
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/21.png" alt=""/>
                            </CellHeader>
                            <CellBody onClick={()=>{this.pay({
                              paytype:'alipay',
                              money:0.01
                            });}}>
                                充值
                            </CellBody>
                            <CellFooter />
                        </Cell>
                    </Cells>
                </div>
            </div>
        )
    }
}

const mapStateToProps =  ({myorders,userlogin:{balance}}, props) =>{
    let triporderid = props.match.params.triporderid;
    let orderinfo = myorders.triporders[triporderid];
    return {balance,orderinfo};
};

export default connect(
    mapStateToProps,
)(Page);
