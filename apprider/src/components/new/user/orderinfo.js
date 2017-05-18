/*
    个人中心-订单详情
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/userorderinfo.css';
import NavBar from '../tools/nav.js';

import { connect } from 'react-redux';
import Orderdetailhead from "./orderdetailhead";
import Orderdetailpaycontent from "./orderdetailpaycontent";
import Orderdetailevaluate from "./orderdetailevaluate";

const { 
    Form,
    FormCell,
    CellBody,
    TextArea,
    LoadMore
    } = WeUI;

class Page extends Component {

    render() {
        const { orderinfo } = this.props;
        const driverinfo = {
            name : "赵师傅",
            phone : "19000000000",
            avatar : "newimg/17.png",
            carinfo : "白色现代·苏A12345",
            cartype : "出租车"
        }
        return (
            <div className="userorderinfoPage AppPage">
                <NavBar back={true} title="订单详情" />
                <div className="pageContent" style={{display:"none"}}>

                    <div className="orderinfohead">
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
                        <div className="address">
                            <div>江宁区东山路214号成安国际大厦</div>
                            <div>建邺区东山路214号成安国际大厦</div>
                        </div>
                    </div>
                    


                    <div className="orderinfohead">
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

                    <div className="orderinfohead">
                        <div className="pinche">
                            <div className="time">2017-02-05 07:30</div>
                            <div className="city">
                                <span className="start">天长快车站</span>
                                <span className="line"></span>
                                <span className="end">南京</span>
                            </div>
                            <div className="time2">07:30 <span>40人成团</span></div>
                        </div>
                    </div>



                    <div className="content">
                        <LoadMore showLine>已支付</LoadMore>
                        <span className="price color_warning">121.0元</span>
                    </div>


                    <div className="pricelist PanelBox">
                        <div className="tit">车费情况</div>
                        <div className="list">
                            <p><span>起步价</span><span>0.0元</span></p>
                            <p><span>里程费(23.5公里)</span><span>71.0元</span></p>
                            <p><span>时长费(76分钟)</span><span>30.4元</span></p>
                            <p><span>高速费</span><span>120.0元</span></p>
                            <p><span className="color_warning">4.5折券抵扣(最高5元)</span><span className="color_warning">-5.0元</span></p>
                        </div>
                    </div>

                    

                    <div className="information PanelBox">
                        <div className="tit color_warning">正在积极参与中...</div>
                        <div className="cont">
                            距离发车时间还有20天，请耐心等待<br/>
                            目前已参与人数20人，还差20人
                        </div>
                    </div>

                    <div className="information PanelBox">
                        <img src="newimg/23.png" width="60" />
                        <div className="tit color_warning">恭喜你参团成功</div>
                        <div className="cont">
                            请注意开车时间，提前到站等候发车
                        </div>
                    </div>

                    <div className="information PanelBox">
                        <img src="newimg/24.png" width="60" />
                        <div className="tit color_warning">谢谢你的参与</div>
                        <div className="cont">
                            参团失败，请另选择交通工具
                        </div>
                    </div>

                    <div className="cancelorder">
                        <img src="newimg/25.png" width="60" />
                        <div className="tit">订单已取消</div>
                        <div className="reason">取消原因:太远了</div>
                        <div className="btn">回首页</div>
                    </div>


                    <div className="promptcenter">如有退款，请与平台客服联系</div>


                    <div className="getMoney"><span>收现金</span></div>






                </div>
                <div className="pageContent">
                    <Orderdetailhead orderinfo={orderinfo} driverinfo={driverinfo} />
                    <Orderdetailpaycontent orderinfo={orderinfo} />
                    <Orderdetailevaluate orderinfo={orderinfo} />
                </div>
            </div>
        )
    }
}
const mapStateToProps =  ({orderdetail,myorders}, props) =>{
    //let triporderid = props.match.params.triporderid;
    let orderinfo = myorders.triporders["59166b1c6aba146808e436e3"];
    console.log(orderdetail);
    console.log(orderinfo);
    return {...orderdetail,orderinfo};
};

export default connect(
    mapStateToProps,
)(Page);

