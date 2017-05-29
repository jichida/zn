﻿/*
    个人中心-我的钱包
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userwallet.css';
import NavBar from '../tools/nav.js';
import { connect } from 'react-redux';
import {
    queryuserbalance_request,
    getrechargerecords_request,
    rechargepay_request
} from '../../actions';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    CellsTitle
    } = WeUI;
import _ from 'lodash';
import moment from 'moment';

class Page extends Component {

    componentWillMount () {
      this.props.dispatch(queryuserbalance_request({}));

      this.props.dispatch(getrechargerecords_request({
        query: {},
        options:{
            sort:{created_at:-1},
            offset: 0,
            limit: 1000,
        }
      }));
    }

    render() {
        const {rechargelist,balance} = this.props;
        return (
            <div className="userwalletPage AppPage">
                <NavBar back={true} title="我的钱包" />
                <div className="head">
                    <span className="tit">余额(元)</span>
                    <span className="myprice">{balance}</span>
                </div>
                <div className="list">
                    <Cells className="tixianlnk">
                        <Cell
                            access
                            onClick={()=>{this.props.dispatch(rechargepay_request({}));}}
                            >
                            <CellHeader>
                                <img src="newimg/13.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                我要充值
                            </CellBody>
                            <CellFooter />
                        </Cell>
                    </Cells>

                    <CellsTitle>账单查询</CellsTitle>

                    <div className="l2">
                        <Cells>{
                          _.map(rechargelist,(record)=>{
                            return (<Cell key={record._id}>
                                <CellBody>
                                    <span className="time">{moment(record.created_at).format("YYYY-MM-DD HH:mm:ss")}</span>
                                    <span className="status">{_.get(record,'fromorder.triptype')}</span>
                                </CellBody>
                                <CellFooter>
                                    <span className="color_warning">{record.feebonus}</span>
                                    <span className="color_warning">{record.feenew}</span>
                                </CellFooter>
                            </Cell>)
                          })
                        }
                        </Cells>
                    </div>

                </div>
            </div>
        )
    }
}
const data =  ({recharge:{rechargelist},userlogin:{balance}}) =>{
    return {rechargelist,balance};
};
export default connect(
    data,
)(Page);
