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
  updateorder_comment_request,
  ui_setorderdetail,
  ui_setselcommenttag
} from '../../actions';

export class Page extends Component{

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
      let commentflag = orderinfo.commentflag | 1;
      let commentinfo = {
        ratedriverinfo:{
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
            commenttagsfordriver,
            commenttagsel,
            showaddevaluate,
            maxshowtags,
            ratenum,//评分
            } = this.props;

        let iscommented = false;
        const {commentflag} = orderinfo;
        if(!!commentflag){
          if((commentflag & 1) > 0 ){
            iscommented = true;
          }
        }

        let commenttagsfordriverselmaxleft = _.xor(commenttagsfordriver,commenttagsel);
        commenttagsfordriverselmaxleft = _.shuffle(commenttagsfordriverselmaxleft);
        let commenttagsfordriverselmax = [...commenttagsel,...commenttagsfordriverselmaxleft];
        if(commenttagsfordriverselmax.length > maxshowtags){
          let drops = commenttagsfordriverselmax.length - maxshowtags;
          commenttagsfordriverselmax = _.dropRight(commenttagsfordriverselmax,drops);
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
                                  _.map(commenttagsfordriverselmax,(tag,index)=>{
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

const data =  ({orderdetail,app:{commenttagsfordriver,maxshowtags}}) =>{
    return {...orderdetail,commenttagsfordriver,maxshowtags};
};
export default connect(data)(Page);
