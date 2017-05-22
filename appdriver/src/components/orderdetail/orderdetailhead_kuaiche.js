/*
    个人中心-订单详情-头部-//出租车－快车－代驾
*/
import React, { Component } from 'react';
import '../../../public/newcss/userorderinfo.css';

export default class Page extends Component{
    render(){
        const {orderinfo} = this.props;
        return (
            <div className="kuaicheinfo">
                <div className="driver">
                    <img src="newimg/4.png" className="avatar"/>
                    <div className="address">
                    <div>{orderinfo.srcaddress.addressname}</div>
                    <div>{orderinfo.dstaddress.addressname}</div>
                    </div>
                    <a
                        href={`tel:${19999999999}`}
                        className="call">
                        <img src="newimg/19.png" />
                    </a>
                </div>

            </div>
        )
    }
}
