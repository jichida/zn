﻿/*
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
                    <img src="newimg/4.png" className="avatar" alt=""/>
                    <div className="address">
                        <div className="startaddress">{orderinfo.srcaddress.addressname}</div>
                        <div className="endaddress">{orderinfo.dstaddress.addressname}</div>
                    </div>
                    <a
                        href={`tel:${orderinfo.riderinfo.RiderPhone}`}
                        className="call">
                        <img src="newimg/19.png"  alt=""/>
                    </a>
                </div>

            </div>
        )
    }
}
