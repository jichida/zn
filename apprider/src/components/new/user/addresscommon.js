/*
    个人中心-常用地址
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/addresscommon.css';
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
            <div className="addresscommonPage AppPage">
                <NavBar back={true} title="常用地址" />
                <div className="list">
                    <Cells>  
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/8.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                家
                            </CellBody>
                            <CellFooter>
                                设置家的地址
                            </CellFooter>
                        </Cell>
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/9.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                公司
                            </CellBody>
                            <CellFooter>
                                设置公司地址
                            </CellFooter>
                        </Cell>
                    </Cells>
                    
                </div>
            </div>
        )
    }

}
export default Page;