/*
    个人中心-订单详情
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userorderinfo.css';
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
        let hascommented = false;
        const {triptype} = orderinfo;
        if(triptype === '出租车' || triptype === '快车' || triptype === '代驾' ){
          hascommented = orderinfo.paystatus === '已支付';
        }
        return (
            <div className="userorderinfoPage AppPage">
                <NavBar back={true} title="订单详情" />
                <div className="pageContent">
                    <Orderdetailhead orderinfo={orderinfo} />
                    <Orderdetailpaycontent orderinfo={orderinfo} />
                    {hascommented && <Orderdetailevaluate orderinfo={orderinfo} />}
                </div>
            </div>
        )
    }
}
const mapStateToProps =  ({orderdetail,myorders}, props) =>{
    let triporderid = props.match.params.triporderid;
    let orderinfo = myorders.triporders[triporderid];
    console.log(orderdetail);
    console.log(orderinfo);
    return {...orderdetail,orderinfo};
};

export default connect(
    mapStateToProps,
)(Page);
