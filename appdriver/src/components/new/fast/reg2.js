/*
    注册司机－车辆信息
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
    Select,
    CellsTitle
    } = WeUI;

class Page extends Component {

    render() {
        return (
            <div className="taxiPage AppPage">
                <NavBar back={true} title="车辆信息" />
                <div className="list">

                    <Form className="formStyle1">
                        <CellsTitle>请认真填写车辆基本信息</CellsTitle>
                        <FormCell>
                            
                            <CellHeader>
                                <Label>所属公司</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入司机姓名"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>所在城市</Label>
                            </CellHeader>
                            <CellBody className="selCityBody">
                                <span className="selCity">请选择</span>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>车牌号</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入车牌号"/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>核定载客位</Label>
                            </CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入"/>
                            </CellBody>
                        </FormCell>
                        <FormCell select selectPos="after">
                            <CellHeader>
                                <Label>年度审核状态</Label>
                            </CellHeader>
                            <CellBody>
                                <Select data={[
                                    {
                                        value: 0,
                                        label: '请选择'
                                    },
                                    {
                                        value: 1,
                                        label: '已审核'
                                    },
                                    {
                                        value: 2,
                                        label: '未审核'
                                    }
                                ]} />
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>网络预约出租车运输证号</CellHeader>
                            <CellBody>
                                <Input type="text" placeholder="请输入"/>
                            </CellBody>
                        </FormCell>
                    </Form>
                </div>
                <div className="submitBtn">
                    <botton className="btn Primary">下一步</botton>
                </div>
            </div>
        )
    }
}
export default Page;