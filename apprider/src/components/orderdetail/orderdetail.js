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
        // const driverinfo = {
        //     name : "赵师傅",
        //     phone : "19000000000",
        //     avatar : "newimg/17.png",
        //     carinfo : "白色现代·苏A12345",
        //     cartype : "出租车"
        // }
        let {
          driverinfo:
          {
            DriverName:name,
            DriverPhone:phone,
            Model,
            Brand,
            PlateColor,
            VehicleNo,
            starnum
          }
       } = orderinfo;
       let carinfo = `${PlateColor}${Model}·${VehicleNo}`;
       let driverinfo = {
           name,
           phone,
           avatar : "newimg/17.png",
           carinfo,
           cartype : orderinfo.triptype
       }
        return (
            <div className="userorderinfoPage AppPage">
                <NavBar back={true} title="订单详情" />
                <div className="pageContent">
                    <Orderdetailhead orderinfo={orderinfo} driverinfo={driverinfo} />
                    <Orderdetailpaycontent orderinfo={orderinfo} />
                    <Orderdetailevaluate orderinfo={orderinfo} />
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
