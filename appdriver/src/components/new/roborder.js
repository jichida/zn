/*
    抢单
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/outcar.css';
import NavBar from './tools/nav.js';
import StarRatingComponent from 'react-star-rating-component';
const { 
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="outcarPage AppPage">
                <NavBar back={true} title="中南出行" />
                <div className="mapcontent">
                    <div className="baidumap">
                        <img src="newimg/11.png" style={{width:"100%"}} />
                    </div>
                </div>



                <div className="mapcontent">
                    <div className="baidumap">
                        <img src="newimg/11.png" style={{width:"100%"}} />
                    </div>
                    <div className="outcarControl">
                        <div className="list hide">
                            <Cells>
                                <Cell href="javascript:;" access>
                                    <CellBody>
                                        <div className="tt">
                                            <span className="i">预约</span>
                                            <span>2017-01-22 10:00</span>
                                        </div>
                                        <div className="li a">我的行程</div>
                                        <div className="li b">我的行程</div>
                                    </CellBody>
                                    <CellFooter />
                                </Cell>
                            </Cells>
                        </div>
                        <div className="lnk">展开</div>
                        <div className="bbtn">
                            <span>全部</span>
                            <span>收车</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Page;