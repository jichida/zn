/*
    个人中心－提现
    withdrawals
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/userrecharge.css';
import NavBar from '../tools/nav.js';
import Selpay from './selpay';

const {
    CellHeader,
    CellBody,
    Cell,
    Form,
    Radio,
    FormCell,
    Label,
    Input,
    Select,
    CellsTitle,
    CellFooter
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="userrechargePage AppPage">
                <NavBar back={true} title="充值" />
                <div className="list">
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>金额</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入提现金额"/>
                            </CellBody>
                        </FormCell>
                    </Form>
                    <Selpay />
                    <div className="submitBtn">
                        <botton className="btn Primary">确定</botton>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default Page;