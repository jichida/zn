/*
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

class Page extends Component {

    componentWillMount () {
        this.props.dispatch(getrechargerecords_request({}));
    }

    render() {
        const {rechargerecordlist,balance} = this.props;
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
                        <Cells>
                            <Cell>
                                <CellBody>
                                    <span className="time">2016-11-12</span>
                                    <span className="status">正在处理中...</span>
                                </CellBody>
                                <CellFooter>
                                    <span className="color_warning">-10</span>
                                </CellFooter>
                            </Cell>
                            <Cell>
                                <CellBody>
                                    <span className="time">2016-11-12</span>
                                    <span className="status">正在处理中...</span>
                                </CellBody>
                                <CellFooter>
                                    <span className="color_warning">-10</span>
                                </CellFooter>
                            </Cell>
                        </Cells>
                    </div>

                </div>
            </div>
        )
    }
}
const data =  ({withdraw,userlogin:{balance}}) =>{
    return {...withdraw,balance};
};
export default connect(
    data,
)(Page);
