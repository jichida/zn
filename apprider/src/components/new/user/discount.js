/*
    优惠券
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/discount.css';
import NavBar from '../tools/nav.js';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="discountPage AppPage">
                <NavBar back={true} title="优惠券" />
                <div className="list">
                    <div className="li">
                        <div className="w">
                            <div className="a"></div>
                            <div className="b">
                                <div className="c">
                                    <div className="price color_warning">
                                        <span className="aa">优惠券</span>
                                        <span className="bb">有效期至2017-04-05</span>
                                    </div>
                                    <div className="zhekou color_warning">
                                        <span className="aa">8</span>
                                        <span className="bb">折</span>
                                    </div>
                                </div>
                                <div className="d">仅限南京使用，最高抵扣5元</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Page;