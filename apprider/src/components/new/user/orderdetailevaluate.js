/*
    个人中心-订单详情-评价司机
*/
import React, { Component } from 'react';
import '../../../../public/newcss/userorderinfo.css';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/userorderinfo.css';
import StarRatingComponent from 'react-star-rating-component';
const { 
    Form,
    FormCell,
    CellBody,
    TextArea,
    LoadMore } = WeUI;

export default class Page extends Component{
    render(){
        const {orderinfo} = this.props;
        return (
                <div className="evaluatecontent">
                    <div className="tt">评价司机<input type="checkbox" /></div>
                    <div className="evaluate PanelBox">
                        <StarRatingComponent 
                            name="star" 
                            editing={false}
                            starCount={5}
                            value={4}
                            emptyStarColor="#EEEEEE"
                        />
                        <span className="text">默认好评</span>
                    </div>

                    <div className="addevaluate show">
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
                            <div className="hottag">
                                <span className="sel">师傅长得帅</span>
                                <span>比较幽默</span>
                                <span>车技好</span>
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
        )
    }
}


