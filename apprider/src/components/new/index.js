/*
	首页
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
                <NavBar back={true} title="注册" />
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
                        <FormCell select selectPos="after">
                            <CellHeader>
                                <Label>性别</Label>
                            </CellHeader>
                            <CellBody>
                                <Select data={[
                                    {
                                        value: 0,
                                        label: '请选择'
                                    },
                                    {
                                        value: 1,
                                        label: '男'
                                    },
                                    {
                                        value: 2,
                                        label: '女'
                                    }
                                ]} />
                            </CellBody>
                        </FormCell>
                        <FormCell select selectPos="after">
                            <CellHeader>
                                <Label>户籍</Label>
                            </CellHeader>
                            <CellBody>
                                <Select data={[
                                    {
                                        value: 0,
                                        label: '请选择'
                                    },
                                    {
                                        value: 1,
                                        label: '男'
                                    },
                                    {
                                        value: 2,
                                        label: '女'
                                    }
                                ]} />
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>住址</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入住址"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>民族</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入民族"/>
                            </CellBody>
                        </FormCell>
                        <FormCell select selectPos="after">
                            <CellHeader>
                                <Label>婚姻情况</Label>
                            </CellHeader>
                            <CellBody>
                                <Select data={[
                                    {
                                        value: 0,
                                        label: '请选择'
                                    },
                                    {
                                        value: 1,
                                        label: '已婚'
                                    },
                                    {
                                        value: 2,
                                        label: '未婚'
                                    }
                                ]} />
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>联系电话</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入联系电话"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>通讯地址</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入通讯地址"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>网约出租车证件编号</CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入"/>
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