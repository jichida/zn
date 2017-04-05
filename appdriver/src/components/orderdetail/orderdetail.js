import React from 'react';
import { connect } from 'react-redux';
import {
  View,Container,NavBar,Button
} from 'amazeui-touch';
import {Rating} from 'belle';

import Orderdetailnotcomment from './orderdetail_notcomment.js';
import Orderdetailcomment from './orderdetail_commented.js';
import Orderdetailnotpaid from './orderdetail_notpaid.js';

import {updateorder_request,ui_setorderdetail} from '../../actions';
import {updateorder_comment_request,getcommenttags_request} from '../../actions';


export class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
    if(this.props.hasOwnProperty('orderinfo')){
      if(this.props.orderinfo.paystatus === '已支付'
      && (this.props.orderinfo.commentflag&2)===0 ){
        this.props.dispatch(getcommenttags_request());
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    if(nextProps.hasOwnProperty('orderinfo')){
        //从未支付切换到已支付
       if(nextProps.orderinfo.paystatus === '已支付'
        && this.props.orderinfo.paystatus === '未支付'){//
        let iscomment = (this.props.orderinfo.commentflag&2) > 0;
        if(!iscomment){
          this.props.dispatch(getcommenttags_request());
        }
      }
    }
  }
  componentWillUnmount () {
    //this.props.onUpdatePage('orderdetailpage_clearobj');
  }
  onClickBack(){
    this.props.history.goBack();
  }
  onClickCarComment(rate){
    let commentinfo = {
      rateriderinfo:{
        ratenum:this.props.ratenum,
        comment:this.props.comment
      },
      commentflag:(this.props.orderinfo.commentflag | 2)
    }
    this.props.dispatch(updateorder_comment_request({
      query:{_id:this.props.orderinfo._id},
      data:commentinfo
    }));
  }
  onChangeFieldname(fieldname,value){//e.target.value
    //this.props.onUpdatePage('orderdetailpage_' + fieldname ,value);
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
        onAction: ()=>{
          this.onClickBack();
        },
      };

      let detailco = <div>无效订单</div>;

      if(this.props.hasOwnProperty('orderinfo')){
        if(this.props.orderinfo.paystatus === '未支付'){
            detailco = <Orderdetailnotpaid {...this.props}/>;
        }
        else if(this.props.orderinfo.paystatus === '已支付'){//
          let iscomment = (this.props.orderinfo.commentflag & 2) > 0;
          detailco = iscomment?<Orderdetailcomment {...this.props}/>:<Orderdetailnotcomment  {...this.props}
        onClickCarComment={this.onClickCarComment.bind(this)}
        onChangeFieldname={this.onChangeFieldname.bind(this)} />;
        }

      }
    return (
          <View>
            <NavBar {...dataLeft}/>
            {detailco}
          </View>
    );
  }
}


const mapStateToProps =  ({orderdetail,myorders}, props) =>{
  let triporderid = props.match.params.triporderid;
  let orderinfo = myorders.triporders[triporderid];
  return {...orderdetail,orderinfo};
};

export default connect(
    mapStateToProps,
)(Page);
