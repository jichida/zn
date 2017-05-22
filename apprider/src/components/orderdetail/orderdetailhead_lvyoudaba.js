﻿/*
    个人中心-订单详情-头部-//出租车－快车－代驾
*/
import React, { Component } from 'react';
import '../../../public/newcss/userorderinfo.css';
import moment from 'moment';

export default class Page extends Component{
    render(){
        const {orderinfo} = this.props;
        const {
          triptype,
          rentusername,
          rentuserphone,
          startdate,
          enddate,
          orderdetail
        } = orderinfo;
        return (
            <div className="kuaicheinfo">
                <div className="driver">
                    <img src="newimg/17.png" className="avatar"/>
                    <div className="info">
                        <div>
                            <span>{rentusername}({rentuserphone})</span>
                            <span className="star"></span>
                        </div>
                        <div>
                            <span>{triptype}</span>
                        </div>
                    </div>
                    <div className="call">
                        <img src="newimg/20.png" />
                    </div>
                </div>
                <div className="busslist">
                    <div><img src="newimg/18.png" />用车时间:  {moment(startdate).format('YYYY-MM-DD')}</div>
                    <div><img src="newimg/18.png" />用车时间:  {moment(enddate).format('YYYY-MM-DD')}</div>
                    <div><img src="newimg/21.png" />{orderdetail}</div>
                </div>
            </div>
        )
    }
}
