﻿/*
    个人中心-我的钱包
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userwallet.css';
import NavBar from '../tools/nav.js';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    CellsTitle
    } = WeUI;
import _ from 'lodash';
import {
  getrechargerecords_request,
  rechargepay_request
} from '../../actions';
import Item from './rechargerecorditem';

class Page extends Component {
  constructor(props) {
      super(props);
   }
   componentWillMount () {
     this.props.dispatch(getrechargerecords_request({}));
   }

    render() {
        const {rechargerecordlist,balance} = this.props;
        let rechargerecordco = [];
            _.map(rechargerecordlist,(item,index)=>{
        rechargerecordco.push(<Item rechargerecord={item}  key={index} />)
    });

        return (
            <div className="userwalletPage AppPage">
                <NavBar back={true} title="我的钱包" />
                <div className="head">
                    <img src="newimg/10.png" />
                    <div>
                        <span className="tit">余额(元)</span>
                        <span className="myprice">{balance}</span>
                    </div>
                </div>
                <div className="list">
                    <Cells className="tixianlnk">
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/21.png" alt=""/>
                            </CellHeader>
                            <CellBody onClick={()=>{this.props.dispatch(rechargepay_request({}));}}>
                                我要充值
                            </CellBody>
                            <CellFooter />
                        </Cell>
                    </Cells>

                    <CellsTitle>账单查询</CellsTitle>

                    <div className="l2">
                        <Cells>
                          {rechargerecordco}
                        </Cells>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps =  ({withdraw,userlogin:{balance}}) =>{
    return {...withdraw,balance};
};

export default connect(
    mapStateToProps,
)(Page);
