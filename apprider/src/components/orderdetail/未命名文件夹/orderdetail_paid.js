import React from 'react';
import { connect } from 'react-redux';
import OrderDetailPinche from './orderdetailpinche';
import OrderDetailTourbus from './orderdetailtourbus';
import OrderDetailCar from './orderdetailcar';
import OrderDetailCarToComment from './orderdetailcar_comment';

import {
  View,Container,NavBar,Button
} from 'amazeui-touch';

import {updateorder_comment_request,getcommenttags_request,ui_setorderdetail} from '../../actions';

export class Page extends React.Component {
  componentWillMount () {
    if(this.props.orderinfo.triptype === '拼车'){
    }
    else if(this.props.orderinfo.triptype  === '旅游大巴'){
    }
    else {
      this.props.dispatch(getcommenttags_request());
    }
  }
  onClickBack(){
    this.props.history.goBack();
  }

  onClickCarComment(rate){
    let commentinfo = {
      ratedriverinfo:{
        ratenum:this.props.ratenum,
        comment:this.props.comment
      },
      commentflag:(this.props.orderinfo.commentflag | 1)
    }
    this.props.dispatch(updateorder_comment_request({
      query:{_id:this.props.orderinfo._id},
      data:commentinfo
    }));

  }
  onChangeFieldname(fieldname,value){//e.target.value
      let orderdetail = {};
      orderdetail[fieldname] = value;
      this.props.dispatch(ui_setorderdetail(orderdetail));
  }
  render() {
   const itemLeft = {
       title: '返回'
     };
     const dataLeft = {
       title: '订单详情',
       leftNav: [{...itemLeft, icon: 'left-nav'}],
       onAction: this.onClickBack.bind(this)
     };

     let OrderPayDetail = null;
     if(this.props.hasOwnProperty('orderinfo')){
           if(this.props.orderinfo.triptype === '拼车'){
             OrderPayDetail = <OrderDetailPinche {...this.props} />;
           }
           else if(this.props.orderinfo.triptype  === '旅游大巴'){
             OrderPayDetail = <OrderDetailTourbus {...this.props} />;
           }
           else {
             if((this.props.orderinfo.commentflag & 1) > 0){
               //已评论
               OrderPayDetail = <OrderDetailCar {...this.props} />;
             }
             else{
               //未评论
               OrderPayDetail = <OrderDetailCarToComment {...this.props}
               onClickCarComment={this.onClickCarComment.bind(this)}
               onChangeFieldname={this.onChangeFieldname.bind(this)}
               />;
             }
      }
     }
     else{
       OrderPayDetail = <div>无效订单</div>;
     }
     return (
        <View>
          <NavBar {...dataLeft}/>
          <Container>
          <div>
            {OrderPayDetail}
    	     </div>
        </Container>
        </View>
    );
  }
}


export default Page;
