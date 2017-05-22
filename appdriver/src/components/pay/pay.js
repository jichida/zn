/*
    支付
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import NavBar from '../tools/nav.js';
import '../../../public/newcss/pay.css';
import Selpay from './selpay.js';
const { 
    Cell,
    CellBody,
    CellFooter,
    Cells
    } = WeUI;

class Page extends Component {
    render() {
        const {approvalstatus,approvalrejectseason,history} = this.props;
        return (
            <div className="payPage AppPage">
                <NavBar back={true} title="支付订单" />
                <div className="orderinfo">
                    <div className="avatarcon">
                        <img src="newimg/17.png" className="avatarimg" />
                        <span>赵师傅</span>
                    </div>
                    <div className="info">
                        <div>订单类型：<span className="color_warning">代驾</span></div>
                        <div>里程数: <span className="color_warning">120KM</span></div>
                        <div>订单价格: <span className="color_warning">120元</span></div>
                    </div>
                </div>

                <div className="list">

                    <Cells>
                        <Cell access>
                            <CellBody>
                                优惠券
                            </CellBody>
                            <CellFooter>
                                <span>3张</span>
                            </CellFooter>
                        </Cell>
                        <Cell access>
                            <CellBody>
                                优惠券
                            </CellBody>
                            <CellFooter>
                                <span className="color_error">-3元</span>
                            </CellFooter>
                        </Cell>
                    </Cells>
                    <Selpay />
                </div>
                <div className="paybtn"> 
                    <span>
                        还需支付：<span>100元</span>
                    </span>
                    <span className="btn Primary">
                        确定支付
                    </span>
                </div>
            </div>
        )
    }

}

const data = ({}) => {
  return {}
}
Page = connect(data)(Page);
export default Page;




