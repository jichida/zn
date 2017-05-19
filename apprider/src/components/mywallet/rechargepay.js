/*
    个人中心－提现
    withdrawals
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userrecharge.css';
import NavBar from '../tools/nav.js';
import Selpay from './selpay';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import {
    WeuiInputValidation,
    required
    } from "../tools/formvalidation.js";
const {
    CellHeader,
    CellBody,
    Cell,
    Form:FormUI,
    Radio,
    FormCell,
    Label,
    Input,
    Select,
    CellsTitle,
    CellFooter
    } = WeUI;

class PageForm extends Component{
    render(){
        const { submitfn,handleSubmit } = this.props;
        return (
            <Form
                onSubmit={handleSubmit(submitfn)}
                >
                <FormUI className="formStyle1">
                    <Field
                        name="moneyperiod"
                        id="moneyperiod"
                        placeholder="请输入冲值金额"
                        type="number"
                        component={ WeuiInputValidation }
                        validate={[ required ]}
                        InputTit="金额"
                        Company="元"
                    />
                    <Selpay />
                    <div className="submitBtn">
                        <button className="btn Primary">确定</button>
                    </div>
                </FormUI>
            </Form>
        )
    }
}
PageForm = reduxForm({
    form: 'pageform'
})(PageForm);


class Page extends Component {

    //支付订单
    pagesubmit=(value)=>{
        console.log("qweqweqhqoeirhqoeri");
        console.log(value);
    }

    render() {
        const {orderinfo,balance} = this.props;
        return (
            <div className="userrechargePage AppPage">
                <NavBar back={true} title="充值" />
                <div className="list">
                    <PageForm submitfn={this.pagesubmit} />
                </div>
            </div>
        )
    }
}

const data =  ({myorders,userlogin:{balance}}, props) =>{
    let triporderid = props.match.params.triporderid;
    let orderinfo = myorders.triporders[triporderid];
    return {balance,orderinfo};
};

export default connect(data)(Page);