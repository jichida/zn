/*
    个人中心－提现
    withdrawals
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userwithdrawals.css';
import NavBar from '../tools/nav.js';
import { Field,reduxForm,Form,formValueSelector} from 'redux-form';
import { connect } from 'react-redux';
import {withdrawcashapplyaddone_request} from '../../actions';
const {
    Form:FormUI,
    } = WeUI;
import {
    WeuiSelectValidation,
    WeuiInputValidation,
    required
  }  from "../tools/formvalidation";

const databanklist = [
    {
        value: "建设银行",
        label: '建设银行'
    },
    {
        value: "中国银行",
        label: '中国银行'
    }
];

let WithdrawForm = (props)=>{
    const { balance,handleSubmit,clicksubmit }  = props;
    return (
        <Form
            className="withdrawalsPage AppPage"
            onSubmit={handleSubmit(clicksubmit)}
        >
            <NavBar back={true} title="提现" />
            <div className="list">
                <FormUI>
                    <Field
                        name="bankname"
                        InputTit="选择银行"
                        data={databanklist}
                        component={WeuiSelectValidation}
                        Option={databanklist}
                        />
                    <Field
                        name="bankaccount"
                        InputTit="银行卡号"
                        placeholder="请输入银行卡号"
                        type="text"
                        component={WeuiInputValidation}
                        validate={[ required ]}
                        />
                    <Field
                        name="cashmoney"
                        InputTit="提现金额"
                        placeholder="请输入提现金额"
                        type="number"
                        component={WeuiInputValidation}
                        validate={[ required ]}
                        />
                </FormUI>

                <div className="promptcontent">
                    你好，本次可提现金额: <span className="color_warning">{balance}</span>元
                </div>
                <div className="submitBtn">
                    <button className="btn Primary"><span>确定</span></button>
                </div>
            </div>

        </Form>
    );
}

WithdrawForm = reduxForm({
    form: 'withdrawform',
    initialValues:{
        bankname : "中国银行",
    }
})(WithdrawForm);
const selector = formValueSelector('withdrawform');
WithdrawForm = connect(({state}) => {
    const bankname = selector(state, 'bankname');
    return {
        bankname
    };
})(WithdrawForm);


class Page extends Component {
    onClickWithdraw = (values)=>{
        values.cashmoney = parseFloat(values.cashmoney);
        this.props.dispatch(withdrawcashapplyaddone_request(values));
    }
    render() {
        return (<WithdrawForm clicksubmit={this.onClickWithdraw} balance={this.props.balance}/>);
    }
}
const mapStateToProps = ({userlogin:{balance}}) => {
    return {balance};
}
Page = connect(mapStateToProps)(Page);

export default Page;
