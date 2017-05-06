/*
    个人中心-选择支付方式
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/addresscommon.css';
import NavBar from '../tools/nav.js';
const {
    FormCell,
    Form,
    CellBody,
    CellFooter,
    CellHeader,
    CellsTitle,
    Radio
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="userrechargePage AppPage">
                <NavBar back={true} title="支付方式" />
                <div className="list">
                    <CellsTitle>请选择支付方式:</CellsTitle>
                    <Form radio>
                        <FormCell radio>
                            <CellHeader>
                                <img src="newimg/14.png" />
                            </CellHeader>
                            <CellBody>微信</CellBody>
                            <CellFooter>
                                <Radio name="radio1" value="1" defaultChecked/>
                            </CellFooter>
                        </FormCell>
                        <FormCell radio>
                            <CellHeader>
                                <img src="newimg/15.png" />
                            </CellHeader>
                            <CellBody>支付宝</CellBody>
                            <CellFooter>
                                <Radio name="radio1" value="2"/>
                            </CellFooter>
                        </FormCell>
                        <FormCell radio>
                            <CellHeader>
                                <img src="newimg/16.png" />
                            </CellHeader>
                            <CellBody>银行卡</CellBody>
                            <CellFooter>
                                <Radio name="radio1" value="2"/>
                            </CellFooter>
                        </FormCell>
                        <FormCell radio>
                            <CellHeader>
                                <img src="newimg/22.png" />
                            </CellHeader>
                            <CellBody>余额支付</CellBody>
                            <CellFooter>
                                <Radio name="radio1" value="2"/>
                            </CellFooter>
                        </FormCell>
                    </Form>
                    <div className="submitBtn">
                        <botton className="btn Primary">确定</botton>
                    </div>
                </div>
            </div>
        )
    }

}
export default Page;