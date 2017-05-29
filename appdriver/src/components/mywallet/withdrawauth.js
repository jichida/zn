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
import StarRatingComponent from 'react-star-rating-component';
import { Field,Fields,reduxForm,Form} from 'redux-form';
import { connect } from 'react-redux';
import {loginsendauth_request,withdrawcashapplyauth_request} from '../../actions';
const {
    CellHeader,
    CellBody,
    Form:FormUI,
    FormCell,
    Label,
    Input,
    Select
    } = WeUI;

let WithdrawauthForm = (props)=>{
    const {showphonenumber,phonenumber,handleSubmit,dispatch}  = props;
    return (
        <div className="withdrawalsPage AppPage">
            <NavBar back={true} title="提现" />
            <div className="list">
                <div className="messageCodeContent">
                    <span className="tit">请输入<span className="phone color_warning">{showphonenumber}</span>收到的短信验证码</span>
                    <div className="messageCodeInput">
                        <Field name="authcode" label="验证码" placeholder="请输入验证码" type="text" component="input" />
                        <span className="getcode btn Primary" onClick={()=>{dispatch(loginsendauth_request({phonenumber}));}}>获取验证码</span>
                    </div>
                </div>
                <div className="submitBtn">
                    <button className="btn Primary"  onClick={handleSubmit}><span>确定</span></button>
                </div>
            </div>
            
        </div>
    );
}

WithdrawauthForm = reduxForm({
    form: 'withdrawformauth', 
})(WithdrawauthForm);

class Page extends Component {
    onClickWithdraw = (values)=>{
        const withdrawid = this.props.match.params.withdrawid;
        let payload = {
            _id:withdrawid,
            username: this.props.phonenumber,
            authcode:values.authcode
        };
        this.props.dispatch(withdrawcashapplyauth_request(payload));
    }
    render() {
        const {showphonenumber,phonenumber,dispatch} = this.props;
        return (
            <WithdrawauthForm 
                onSubmit={this.onClickWithdraw}
                phonenumber={phonenumber}
                showphonenumber={showphonenumber} 
                dispatch={dispatch}
            />
        );
    }
}
const mapStateToProps = ({userlogin:{username:phonenumber}}) => {
    let showphonenumber = phonenumber.substr(0,3)+"****"+phonenumber.substr(7,4);
    return {showphonenumber,phonenumber};
}
Page = connect(mapStateToProps)(Page);
export default Page;
