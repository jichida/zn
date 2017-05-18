﻿/*
    个人中心-订单详情-头部-//出租车－快车－代驾
*/
import React, { Component } from 'react';
import '../../../../public/newcss/userorderinfo.css';

export default class Page extends Component{
    render(){
        const {orderinfo,driverinfo} = this.props;
        return (
            <div className="kuaicheinfo">
                <div className="driver">
                    <img src={driverinfo.avatar} className="avatar"/>
                    <div className="info">
                        <div>
                            <span>{driverinfo.name}</span>
                            <span className="star"></span>
                        </div>
                        <div>
                            {driverinfo.carinfo} <span>{driverinfo.cartype}</span>
                        </div>
                    </div>
                    <a 
                        href={`tel:${driverinfo.phone}`}
                        className="call">
                        <img src="newimg/20.png" />
                        联系TA
                    </a>
                </div>
                <div className="address">
                    <div>{orderinfo.srcaddress.addressname}</div>
                    <div>{orderinfo.dstaddress.addressname}</div>
                </div>
            </div>
        )
    }
}


