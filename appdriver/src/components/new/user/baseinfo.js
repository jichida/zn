/*
    个人中心－基本信息
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/baseinfo.css';
import NavBar from '../tools/nav.js';
import StarRatingComponent from 'react-star-rating-component';
const { 
    Cells,
    Cell,
    CellBody,
    CellFooter,
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="baseinfoPage AppPage">
                <NavBar back={true} title="查看个人资料" />
                <div className="list">

                    <Cells>
                        <Cell access className="avatar">
                            <CellBody>
                                头像
                            </CellBody>
                            <CellFooter>
                                <img src="newimg/17.png" />
                            </CellFooter>
                        </Cell>
                        <Cell access>
                            <CellBody>
                                姓名
                            </CellBody>
                            <CellFooter>
                                刘询
                            </CellFooter>
                        </Cell>
                        <Cell access>
                            <CellBody>
                                手机号
                            </CellBody>
                            <CellFooter>
                                180****9999
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                车牌号
                            </CellBody>
                            <CellFooter>
                                苏DE956R
                            </CellFooter>
                        </Cell>
                    </Cells>
                    <div className="f">如需修改，请联系客服<span className="color_warning">400-000－0666</span></div>
                </div>
            </div>
        )
    }
}
export default Page;