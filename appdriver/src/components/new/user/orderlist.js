/*
    个人中心-订单详情
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/userorderlist.css';
import NavBar from '../tools/nav.js';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="userorderlistPage AppPage">
                <NavBar back={true} title="我的订单" />
                <div className="list">
                    <Cells>
                        <Cell access>
                            
                            <CellBody>
                                <div className="tt">
                                    <div className="ttinfo">
                                        <span className="i">预约</span>
                                        <span className="time">2017-01-22 10:00</span>
                                        <span className="type">代驾</span>
                                    </div>
                                    <span className="status color_warning">待支付</span>
                                </div>
                                <div className="li a">我的行程</div>
                                <div className="li b">我的行程</div>
                            </CellBody>
                            <CellFooter />
                        </Cell>
                    </Cells>
                </div>
            </div>
        )
    }
}
export default Page;