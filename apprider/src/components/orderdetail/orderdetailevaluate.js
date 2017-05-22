/*
    个人中心-订单详情-评价司机
*/
import React, { Component } from 'react';
import '../../../public/newcss/userorderinfo.css';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userorderinfo.css';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
const {
    Form,
    FormCell,
    CellBody,
    TextArea,
    LoadMore } = WeUI;
import {
    ui_setorderdetail
} from '../../actions';

export class Page extends Component{

    componentWillUnmount(){
        this.addevaluatebox(false);
    }

    onStarClick(nextValue, prevValue, name) {
        this.props.dispatch(ui_setorderdetail({ratenum:nextValue}))
    }

    addevaluatebox = (v)=>{
        this.props.dispatch(ui_setorderdetail({showaddevaluate:v}))
    }

    render(){
        const {
            orderinfo,
            showaddevaluate,
            dispatch,
            ratenum,//评分
            } = this.props;

        let iscommented = false;
        const {commentflag} = orderinfo;
        if(!!commentflag){
          if((commentflag & 1) > 0 ){
            iscommented = true;
          }
        }
        return (
                <div className="evaluatecontent">
                    {!iscommented &&
                      <div
                          className="tt"
                          onClick={()=>{this.addevaluatebox(true)}}
                          >
                          评价司机
                      </div>
                    }

                    {iscommented &&
                      <div className="evaluate PanelBox">
                          <StarRatingComponent
                              name="star"
                              editing={false}
                              starCount={5}
                              value={4}
                              emptyStarColor="#EEEEEE"

                          />
                      </div>
                    }

                    <div className={showaddevaluate?"addevaluate show":"addevaluate"}>
                        <div className="wamp">
                            <div className="tit">
                                <span>评价司机</span>
                                <img
                                    src="newimg/12.png"
                                    onClick={()=>{this.addevaluatebox(false)}}
                                    className="close" />
                            </div>
                            <div className="star">
                                <StarRatingComponent
                                    name="star"
                                    editing={true}
                                    starCount={5}
                                    value={ratenum}
                                    emptyStarColor="#EEEEEE"
                                    onStarClick={this.onStarClick.bind(this)}
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

const data =  ({orderdetail}) =>{
    return {...orderdetail};
};
export default connect(data)(Page);
