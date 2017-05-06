/*
    个人中心-紧急联系人列表
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/urgentlist.css';
import NavBar from '../tools/nav.js';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellsTitle
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="urgentlistPage AppPage">
                <NavBar back={true} title="紧急联系人" />
                <div className="head">
                    为了保证您的行程安全<br/>
                    紧急联系人将用于紧急救助功能
                </div>
                <div className="list">
                    <Cells className="tixianlnk">
                        <Cell>
                            <CellBody>
                                关羽
                            </CellBody>
                            <CellFooter>
                                13888888888
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                张飞
                            </CellBody>
                            <CellFooter>
                                13866666666
                            </CellFooter>
                        </Cell>
                        <Cell access>
                            <CellBody>
                                添加紧急联系人
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        
                    </Cells>
                    <CellsTitle>最多添加5位联系人</CellsTitle>
                </div>
            </div>
        )
    }
}
export default Page;