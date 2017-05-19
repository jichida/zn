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

export default class Page extends Component{
    render(){
        const {orderinfo} = this.props;
        return (
                <div className="paycontent">
                    <div className="content">
                        <LoadMore showLine>{orderinfo.paystatus}</LoadMore>
                        <span className="price color_warning">121.0元</span>
                    </div>
                    <div className="pricelist PanelBox">
                        <div className="tit">车费情况</div>
                        <div className="list">
                            <p><span>起步价</span><span>1.2元</span></p>
                            <p><span>里程费(7.2公里)</span><span>10元</span></p>
                            <p><span>时长费(76分钟)</span><span>30.4元</span></p>
                            <p><span>高速费</span><span>120.0元</span></p>
                            <p><span className="color_warning">4.5折券抵扣(最高5元)</span><span className="color_warning">-5.0元</span></p>
                        </div>
                    </div>
                    <div className="getMoney"><span>去支付</span></div>
                </div>
        )
    }
}


