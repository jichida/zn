/*
    个人中心-订单详情
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userorderlist.css';
import NavBar from '../tools/nav.js';
import _ from "lodash";
import { connect } from 'react-redux';
import moment from "moment";
import {
    getmytriporders_request
    } from '../../actions';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter
    } = WeUI;

//快车信息
export class Kuaiche extends Component{
    render(){
        const {info} = this.props;
        return (
            <div className="pinchelistli">
                <div className="li a">{info.srcaddress.addressname}</div>
                <div className="li b">{info.dstaddress.addressname}</div>
            </div>
        )
    }
}

//拼车信息
export class Pinche extends Component{
    render(){
        const {info} = this.props;
        return (
            <div className="pinchelistli">
                <div>出发时间: {moment(info.startdate).format("YYYY-MM-DD")+" "+info.starttime}</div>
                <div>出发地: {info.startcity} {info.startstation}</div>
                <div>目的地: {info.endcity} {info.endstation}</div>
            </div>
        )
    }
}


class Page extends Component {

    componentWillMount () {
        this.props.dispatch(getmytriporders_request({
            query: {
              triptype:{'$ne':'充值'}
            },
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
                                        key={index}
                                        access>
                                        <CellBody>
                                            <div className="tt">
                                                <div className="ttinfo">
                                                    <span className="i">{orderinfo.isrealtime?'':'预约'}</span>
                                                    <span className="time">{moment(orderinfo.created_at).format("YYYY-MM-DD H:mm:ss")}</span>
                                                    <span className="type">{orderinfo.triptype}</span>
                                                </div>
                                                <span className="status color_warning">{orderinfo.orderstatus}</span>
                                            </div>

                                            {orderinfo.triptype==="拼车"?(
                                                <Pinche info={orderinfo} />
                                            ):""}

                                            {orderinfo.triptype==="快车"||orderinfo.triptype==="代驾"||orderinfo.triptype==="出租车"?(
                                                <Kuaiche info={orderinfo} />
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
