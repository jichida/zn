/*
    个人中心-订单详情-支付订单
*/
import React, { Component } from 'react';
import '../../../public/newcss/userorderinfo.css';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userorderinfo.css';
const { LoadMore } = WeUI;
import _ from 'lodash';

export default class Page extends Component{
    render(){
        const {orderinfo} = this.props;
        const {orderprice,triptype} = orderinfo;

        let paycontentlist  = [];
        if(triptype === '出租车' || triptype === '快车' || triptype === '代驾' ){
            const {realtimepricedetail} = orderinfo;
            if(!!realtimepricedetail && orderprice > 0){
              const {totalkm} = realtimepricedetail;
              paycontentlist.push({
                name:`里程${totalkm}公里`,
                fee:``
              });
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

        return (
                <div className="paycontent">
                    <div className="content">
                        <LoadMore showLine>{orderinfo.paystatus}</LoadMore>
                        <span className="price color_warning">{orderprice}元</span>
                    </div>
                    <div className="pricelist PanelBox">
                        <div className="tit">车费情况</div>
                        <div className="list">
                            {
                              _.map(paycontentlist,(feeinfo,index)=>{
                                return (
                                  <p key={index}><span>{feeinfo.name}</span><span>{feeinfo.fee}</span></p>
                                )
                              })
                            }
                            <p><span className="color_warning">4.5折券抵扣(最高5元)</span><span className="color_warning">-5.0元</span></p>
                        </div>
                    </div>
                    {orderinfo.paystatus==='未支付' && <div className="getMoney"><span>去支付</span></div>}
                </div>
        )
    }
}
