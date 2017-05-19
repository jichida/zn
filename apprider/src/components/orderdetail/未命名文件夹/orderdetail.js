import React from 'react';
import { connect } from 'react-redux';
import {
    View,Container,NavBar,Button
} from 'amazeui-touch';

import OrderDetailNotpaid from './orderdetail_notpaid.js';
import OrderDetailpaid from './orderdetail_paid.js';


export class Page extends React.Component {

    componentWillMount () {
    }
    onClickBack(){
        this.props.history.goBack();
    }
    componentWillUnmount () {

    }
    render() {
        if(this.props.hasOwnProperty('orderinfo')){
            if(this.props.orderinfo.hasOwnProperty('paystatus')){
                if(this.props.orderinfo.paystatus === '未支付' || this.props.orderinfo.paystatus === '部分支付'){
                    return <OrderDetailNotpaid {...this.props} />;
                }
                else if(this.props.orderinfo.paystatus === '已支付'){
                    return <OrderDetailpaid {...this.props} />;
                }
            }
        }
        return <div>无效订单</div>;
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
