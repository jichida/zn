/*
    个人中心-订单详情-头部-//出租车－快车－代驾
*/
import React, { Component } from 'react';
import '../../../public/newcss/userorderinfo.css';

export default class Page extends Component{
    render(){
        const {info} = this.props;
        return (
            <div className="kuaicheinfo">
                <div className="driver">
                    <img src="newimg/17.png" className="avatar"/>
                    <div className="info">
                        <div>
                            <span>赵师傅</span>
                            <span className="star"></span>
                        </div>
                        <div>
                            白色现代·苏A12345 <span>出租车</span>
                        </div>
                    </div>
                    <div className="call">
                        <img src="newimg/20.png" />
                        联系TA
                    </div>
                </div>
                <div className="busslist">
                    <div><img src="newimg/18.png" />用车时间: 2017-01-22 10:00</div>
                    <div><img src="newimg/18.png" />用车时间: 2017-01-22 10:00</div>
                    <div><img src="newimg/21.png" />已付定金 60元</div>
                </div>
            </div>
        )
    }
}


