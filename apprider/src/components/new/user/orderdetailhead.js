﻿/*
    个人中心-订单详情-头部
*/
import React, { Component } from 'react';
import '../../../../public/newcss/userorderinfo.css';
//快车、代驾、出租车
import Kuaiche from './orderdetailhead_kuaiche';
import Pinche from './orderdetailhead_pinche';
import Lvyoudaba from './orderdetailhead_lvyoudaba';

export default class Page extends Component {
    render() {
        const { orderinfo,driverinfo } = this.props;
        return (
            <div className="orderinfohead">
            	{
            		orderinfo.triptype=="代驾"||
            		orderinfo.triptype=="快车"||
            		orderinfo.triptype=="出租车"?
            		(
            			<Kuaiche
            				orderinfo={orderinfo}
            				driverinfo={driverinfo}
            			/>
            		):""
            	}
            	{
            		orderinfo.triptype=="大巴"?
            		(
            			<Lvyoudaba 
            				orderinfo={orderinfo}
            				driverinfo={driverinfo}
            			/>
            		):""
            	}
            	{
            		orderinfo.triptype=="拼车"?
            		(
            			<Pinche 
            				orderinfo={orderinfo}
            				driverinfo={driverinfo}
            			/>
            		):""
            	}
            </div>
        )
    }
}


