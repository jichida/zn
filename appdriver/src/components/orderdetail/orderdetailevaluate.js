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
    TextArea
  } = WeUI;
import _ from 'lodash';
import {
  ui_setorderdetail,
  ui_setorderdetail_reset,
  ui_setselcommenttag,
  updateorder_comment_request,
} from '../../actions';

export class Page extends Component{
    componentWillMount(){
      this.props.dispatch(ui_setorderdetail_reset({}))
    }
    componentWillUnmount(){
        this.addevaluatebox(false);
    }

    onChangeFieldname(fieldname,value){//e.target.value
        let orderdetail = {};
        orderdetail[fieldname] = value;
        this.props.dispatch(ui_setorderdetail(orderdetail));
    }
    onClickTag(addflag,comments){
      this.props.dispatch(ui_setselcommenttag({
        addflag,comments
      }));
    }
    onClickCarComment(){
      const {ratenum,commenttagsel,comment,orderinfo} = this.props;
      let commentflag = orderinfo.commentflag | 2;
      let commentinfo = {
        rateriderinfo:{
          ratenum,
          commenttagsel,
          comment
        },
        commentflag
      }
      this.props.dispatch(updateorder_comment_request({
        query:{_id:orderinfo._id},
        data:commentinfo
      }));
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
            commenttags_selmax,
            commenttagsel,
            showaddevaluate,
            maxshowtags,
            ratenum,//评分
            } = this.props;

        let iscommented = false;
        const {commentflag} = orderinfo;
        if(!!commentflag){
          if((commentflag & 2) > 0 ){
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
                          评价乘客
                      </div>
                    }

                    {iscommented &&
                      <div className="evaluate PanelBox">
                          <StarRatingComponent
                              name="star"
                              editing={false}
                              starCount={5}
                              value={ratenum}
                              emptyStarColor="#EEEEEE"

                          />
                      </div>
                    }

                    <div className={showaddevaluate?"addevaluate show":"addevaluate"}>
                        <div className="wamp">
                            <div className="tit">
                                <span>评价乘客</span>
                                <img
                                    src="newimg/12.png"
                                    onClick={()=>{this.addevaluatebox(false)}}
                                    className="close"
                                    alt=""/>
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
                                {
                                  _.map(commenttags_selmax,(tag,index)=>{
                                    if(_.findIndex(commenttagsel,(tagsel)=>{return tagsel===tag}) >= 0){
                                      return (<span key={index} className="sel"
                                      onClick={this.onClickTag.bind(this,false,tag)}>{tag}</span>);
                                    }
                                    return (<span key={index}
                                    onClick={this.onClickTag.bind(this,true,tag)}>{tag}</span>);
                                  })
                                }
                            </div>
                            <div className="text">
                                <Form>
                                    <FormCell>
                                        <CellBody>
                                            <TextArea placeholder="请输入您的评价内容" rows="3" maxlength="200"
                                            onChange={(e)=>{
                                             this.onChangeFieldname('comment',e.target.value)
                                           }}
                                           ></TextArea>
                                        </CellBody>
                                    </FormCell>
                                    <div className="btn Primary" onClick={this.onClickCarComment.bind(this)}>提交</div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

const data =  ({orderdetail}) =>{
    const {
      ratenum,
      commenttagsel,
      comment,
      commenttags_selmax,
      showaddevaluate,
    } = orderdetail;//评分
    return {
      ratenum,
      commenttagsel,
      comment,
      commenttags_selmax,
      showaddevaluate,
    };
};
export default connect(data)(Page);
