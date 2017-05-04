/*
    个人中心－提现
    withdrawals
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/userwithdrawals.css';
import NavBar from '../tools/nav.js';
import StarRatingComponent from 'react-star-rating-component';
const {
    CellHeader,
    CellBody,
    Form,
    FormCell,
    Label,
    Input,
    Select
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="withdrawalsPage AppPage">
                <NavBar back={true} title="提现" />
                <div className="list">

                    <Form>
                        <FormCell select selectPos="after">
                            <CellHeader>
                                <Label>银行卡</Label>
                            </CellHeader>
                            <CellBody>
                                <Select data={[
                                    {
                                        value: 1,
                                        label: 'China'
                                    },
                                    {
                                        value: 2,
                                        label: 'United States'
                                    },
                                    {
                                        value: 3,
                                        label: 'Germany'
                                    }
                                ]} />
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>卡号</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="请输入卡号"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>金额</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="请输入提现金额"/>
                            </CellBody>
                        </FormCell>
                    </Form>

                    <div className="promptcontent">
                        你好，本次可提现金额: <span className="color_warning">680</span>元
                    </div>

                </div>
                <div className="submitBtn">
                    <botton className="btn Primary">确定</botton>
                </div>
            </div>
        )
    }
}
export default Page;