/*
    个人中心-订单详情
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/userorderlist.css';
import NavBar from '../tools/nav.js';
import _ from "lodash";
import { connect } from 'react-redux';
import moment from "moment";
import {
    getmytriporders_request
    } from '../../../actions';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter
    } = WeUI;

class Page extends Component {

    componentWillMount () {
        this.props.dispatch(getmytriporders_request({
            query: {},
            options:{
                sort:{created_at:-1},
                offset: 0,
                limit: 1000,
            }
        }));
    }

    render() {
        const {mytriporderlist, triporders, history} = this.props;
        return (
            <div className="userorderlistPage AppPage">
                <NavBar back={true} title="我的订单" />
                <div className="list">
                    <Cells>
                        {
                            _.map(mytriporderlist,(orderid,index)=>{
                                let orderinfo = triporders[orderid];
                                console.log(orderinfo);
                                return (
                                    <Cell
                                        onClick={()=>{history.push(`/orderdetail/${orderinfo._id}`);}}
                                        access>
                                        <CellBody>
                                            <div className="tt">
                                                <div className="ttinfo">
                                                    <span className="i">预约</span>
                                                    <span className="time">{moment(orderinfo.created_at).format("YYYY-MM-DD H:mm:ss")}</span>
                                                    <span className="type">{orderinfo.triptype}</span>
                                                </div>
                                                <span className="status color_warning">{orderinfo.orderstatus}</span>
                                            </div>
                                            {orderinfo.hasOwnProperty("srcaddress")?(
                                                <div className="li a">{orderinfo.srcaddress.addressname}</div>
                                            ):""}
                                            {orderinfo.hasOwnProperty("dstaddress")?(
                                                <div className="li b">{orderinfo.dstaddress.addressname}</div>
                                            ):""}
                                        </CellBody>
                                        <CellFooter />
                                    </Cell>
                                )
                            })
                        }
                        
                    </Cells>
                </div>
            </div>
        )
    }
}
const data =({myorders})=>{
    return {...myorders};
};
export default connect(data)(Page);


