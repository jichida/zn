/*
    个人中心-我的钱包
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/userwallet.css';
import NavBar from '../tools/nav.js';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    CellsTitle
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="userwalletPage AppPage">
                <NavBar back={true} title="我的钱包" />
                <div className="head">
                    <img src="newimg/10.png" />
                    <div>
                        <span className="tit">余额(元)</span>
                        <span className="myprice">680</span>
                    </div>
                </div>
                <div className="list">
                    <Cells className="tixianlnk">
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/13.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                我要充值
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/11.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                我要提现
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
export default Page;