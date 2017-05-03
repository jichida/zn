/*
    注册代驾司机－基本信息
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/taxi.css';
import NavBar from '../tools/nav.js';
import StarRatingComponent from 'react-star-rating-component';
const { 
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Label,
    Input,
    Select
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="taxiPage AppPage">
                <NavBar back={true} title="注册代驾" />
                <div className="list">
                    <div className="avatar">
                        <img src="newimg/4.png" />
                        <span>上传头像</span>
                    </div>
                    <Form className="formStyle1">
                        <FormCell>
                            <CellHeader>
                                <Label>司机姓名</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="请输入司机姓名"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>身份证号</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="请输入身份证号"/>
                            </CellBody>
                        </FormCell>
                        <FormCell select selectPos="after">
                            <CellHeader>
                                <Label>银行卡</Label>
                            </CellHeader>
                            <CellBody>
                                <Select data={[
                                    {
                                        value: 0,
                                        label: '请选择'
                                    },
                                    {
                                        value: 1,
                                        label: '建设银行'
                                    },
                                    {
                                        value: 2,
                                        label: '中国银行'
                                    }
                                ]} />
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>卡号</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="请输入银行卡卡号"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>驾照准驾类型</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="tel" placeholder="请输入准驾类型"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>初次领驾照日期</CellHeader>
                            <CellBody>
                                <Input type="date" defaultValue="" onChange={()=>{}}/>
                            </CellBody>
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