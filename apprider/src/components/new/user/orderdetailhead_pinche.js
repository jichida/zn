/*
    个人中心-订单详情-头部-//出租车－快车－代驾
*/
import React, { Component } from 'react';
import '../../../../public/newcss/userorderinfo.css';

export default class Page extends Component{
    render(){
        const {orderinfo,driverinfo} = this.props;
        return (
                <div className="pinche">
                    <div className="time">2017-02-05 07:30</div>
                    <div className="city">
                        <span className="start">天长快车站</span>
                        <span className="line"></span>
                        <span className="end">南京</span>
                    </div>
                    <div className="time2">07:30 <span>40人成团</span></div>
                </div>
        )
    }
}


