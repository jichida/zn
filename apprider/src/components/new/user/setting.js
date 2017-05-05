/*
    设置
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/setting.css';
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
            <div className="settingPage AppPage">
                <NavBar back={true} title="设置" />
                <div className="list">
                    <Cells>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/2.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                紧急联系人
                            </CellBody>
                            <CellFooter />
                        </Cell>
                    </Cells>
                    <Cells>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/3.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                用户指南
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/4.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                计费规则
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/5.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                法律条款
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>
                </div>
                <div className="btn">退出</div>
            </div>
        )
    }
}
export default Page;