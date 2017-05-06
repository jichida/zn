/*
	集团信息－联系方式
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/phonelist.css';
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
            <div className="phonelistPage AppPage">
                <NavBar back={true} title="集团信息" />
                <div className="list">
                    <Cells>
                        <Cell access>
                            <CellBody>
                                上海集团
                            </CellBody>
                            <CellFooter>
                                021-88888888
                            </CellFooter>
                        </Cell>
                        <Cell access>
                            <CellBody>
                                上海集团
                            </CellBody>
                            <CellFooter>
                                021-88888888
                            </CellFooter>
                        </Cell>
                    </Cells>
                </div>
            </div>
        )
    }
}
export default Page;