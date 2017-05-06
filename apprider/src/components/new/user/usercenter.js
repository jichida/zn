/*
    个人中心-个人中心
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/usercenter.css';
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
            <div className="usercenterPage AppPage">
                <div className="head">
                    <img src="newimg/17.png" />
                    <span className="name">王晓丽</span>
                    <span className="li">账户余额 ¥60</span>
                    <span className="li">优惠券 3张</span>
                </div>
                <div className="list">
                    <Cells>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/26.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                我的订单
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/27.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                常用地址
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/28.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                我的钱包
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/29.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                我的优惠券
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/30.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                联系客服
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/31.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                系统设置
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/32.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                <span className="tit">集团信息</span>
                                <span className="cont">这里可以投诉</span>
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>

                </div>
            </div>
        )
    }
}
export default Page;