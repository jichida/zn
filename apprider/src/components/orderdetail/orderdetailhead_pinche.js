/*
    个人中心-订单详情-头部-//出租车－快车－代驾
*/
import React, { Component } from 'react';
import '../../../public/newcss/userorderinfo.css';
import moment from 'moment';

export default class Page extends Component{
    render(){
        const {orderinfo} = this.props;
        const {
          startcity,
          endcity,
          startstation,
          endstation,
          startdate,
          starttime,
          groupnumber
        } = orderinfo;
        return (
                <div className="pinche">
                    <div className="time">{moment(startdate).format('YYYY-MM-DD')}</div>
                    <div className="city">
                        <span className="start">{startcity}({startstation})</span>
                        <span className="line"></span>
                        <span className="end">{endcity}({endstation})</span>
                    </div>
                    <div className="time2">{starttime} <span>{groupnumber}人成团</span></div>
                </div>
        )
    }
}
