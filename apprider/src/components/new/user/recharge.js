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
import StarRatingComponent from 'react-star-rating-component';
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
                    <CellsTitle>您选择提现到:</CellsTitle>
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
                    </Form>

                </div>
                <div className="submitBtn">
                    <botton className="btn Primary">确定</botton>
                </div>
            </div>
        )
    }
}
export default Page;