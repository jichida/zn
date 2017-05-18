/*
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
                        <img src="newimg/17.png" className="avatar"/>
                        <div className="address">
                            <div>江宁区东山路214号成安国际大厦</div>
                            <div>建邺区东山路214号成安国际大厦</div>
                        </div>
                        <img src="newimg/19.png" className="phone" />
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

                    <div className="tt">评价乘客</div>

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

                    <div className="getMoney"><span>收现金</span></div>

                    <div className="addevaluate">
                        <div className="wamp">
                            <div className="tit">
                                <span>评价乘客</span>
                                <img src="newimg/22.png" className="close" />
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