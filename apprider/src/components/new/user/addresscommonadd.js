/*
    选择地址
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/addresscommonadd.css';
import NavBar from '../tools/nav.js';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    CellsTitle,
    Form,
    FormCell,
    Label,
    Input
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="addresscommonaddPage AppPage">
                <NavBar back={true} title="选择地址" />
                <div className="head">
                     <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>乌鲁木齐</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="输入地址关键字"/>
                                <span className="color_warning">取消</span>
                            </CellBody>
                        </FormCell>
                    </Form>
                </div>
                <div className="list">
                    <Cells>
                        <Cell access>
                            <CellBody>
                                <span className="a">现代森林小镇</span>
                                <span className="b">光谷大道/金融巷三路(路口)南</span>
                            </CellBody>
                        </Cell>
                        
                    </Cells>
                    
                </div>
            </div>
        )
    }
}
export default Page;