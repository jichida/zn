﻿/*
    个人中心-订单详情
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/userorderinfo.css';
import NavBar from '../tools/nav.js';
import StarRatingComponent from 'react-star-rating-component';
const { 
    Form,
    FormCell,
    CellBody,
    TextArea,
    LoadMore
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="userorderinfoPage AppPage">
                <NavBar back={true} title="订单详情" />
                <div className="pageContent">

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

                    <div className="tt">评价司机</div>

                    <div className="evaluate PanelBox">
                        <StarRatingComponent 
                            name="star" 
                            editing={false}
                            starCount={5}
                            value={4.5}
                            emptyStarColor="#EEEEEE"
                        />
                        <span className="text">默认好评</span>
                    </div>

                    <div className="information PanelBox">
                        <div className="tit color_warning">正在积极参与中...</div>
                        <div className="cont">
                            距离发车时间还有20天，请耐心等待<br/>
                            目前已参与人数20人，还差20人
                        </div>
                    </div>

                    <div className="promptcenter">如有退款，请与平台客服联系</div>


                    <div className="getMoney"><span>收现金</span></div>

                    <div className="addevaluate" style={{display:"none"}}>
                        <div className="wamp">
                            <div className="tit">
                                <span>评价司机</span>
                                <img src="newimg/12.png" className="close" />
                            </div>
                            <div className="star">
                                <StarRatingComponent 
                                    name="star" 
                                    editing={true}
                                    starCount={5}
                                    value={1}
                                    emptyStarColor="#EEEEEE"
                                />
                            </div>
                            <div className="text">
                                <Form> 
                                    <FormCell>
                                        <CellBody>
                                            <TextArea placeholder="请输入您的评价内容" rows="3" maxlength="200"></TextArea>
                                        </CellBody>
                                    </FormCell>
                                    <div className="btn Primary">提交</div>
                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Page;