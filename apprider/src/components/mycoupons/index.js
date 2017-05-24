/*
    优惠券
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/discount.css';
import NavBar from '../tools/nav.js';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    } = WeUI;
import {
  mycoupongetall_request
} from '../../actions';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
// coupon:{ type: Schema.Types.ObjectId, ref: 'Coupon' },
// creator:{ type: Schema.Types.ObjectId, ref: 'User' },
// name:String,    //优惠券名
// pricediscountmax:Number,//最大抵扣金额
// pricediscountpercent:Number,//抵扣折扣
// expdate: Date,// 过期时间
// usestatus:{ type: Schema.Types.String,default: '未使用'},// //未使用／已使用／已失效
// fromorder:{ type: Schema.Types.ObjectId, ref: 'Order' },
// created_at: { type: Date, default:new Date()},
// used_at:Date,
const MycouponItem = (props) => {
  const {mycoupon,onClickItem} = props;
  const {name,usestatus,pricediscountpercent,pricediscountmax,expdate} = mycoupon;
  const createdatestring = moment(mycoupon.created_at).format("YYYY-MM-DD");
  const expdatestring = moment(expdate).format("YYYY-MM-DD");
  return (
    <div className="li" onClick={onClickItem}>
        <div className="w">
            <div className="a"></div>
            <div className="b">
                <div className="c">
                    <div className="price color_warning">
                        <span className="aa">{name}</span>
                        <span className="bb">有效期至{expdatestring}</span>
                    </div>
                    <div className="zhekou color_warning">
                        <span className="aa">{pricediscountpercent*10}</span>
                        <span className="bb">折</span>
                    </div>
                </div>
                <div className="d">最高抵扣{pricediscountmax}元</div>
            </div>
        </div>
    </div>
  );
}

class Page extends Component {
    componentWillMount () {
      this.props.dispatch(mycoupongetall_request({
        query:{},
        options:{
          sort:{created_at:-1},
          offset: 0,
          limit: 10,
        }
      }));
    }

    onClickItem(mycoupon){
      if(this.props.sel){
        this.props.history.goBack();
      }
    }

    render() {
        const {couponlist} = this.props;
        return (
            <div className="discountPage AppPage">
                <NavBar back={true} title="优惠券" />
                <div className="list">
                {
                  _.map(couponlist,(mycoupon)=>{
                    return (<MycouponItem key={mycoupon._id} mycoupon={mycoupon}
                      onClickItem={this.onClickItem.bind(this,mycoupon)}/>)
                  })
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({mycoupon:{couponlist}},props) => {
  let sel = props.match.params.sel === 'sel'?true:false;
  return {couponlist,sel};
}

export default connect(
  mapStateToProps
)(Page);
