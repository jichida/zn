import React, { Component } from 'react';
import WeUI from 'react-weui';

import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/register.css';

import { Field,Fields,reduxForm,Form,formValueSelector} from 'redux-form';
import { connect } from 'react-redux';

import {
  loginsendauth_request,
  register_request,
  login_request
} from '../../actions/index.js';
import {renderInputField,renderAuthField} from '../tools/renderfield';

const {
    FormCell,
    Checkbox,
    CellHeader,
    CellBody,
    Form:FormUI,
    Agreement,
    Input,
    Label,
    CellFooter,
    Button
  } = WeUI;


let RegisterForm = (props)=> {
    console.log(`RegisterForm===>${JSON.stringify(props)}`);


    let {handleSubmit,onClickLogin,onClickReturn,phonenumber} = props;

    let onClickAuth = (e)=> {
        // const name = fields.username.input.value;
        props.dispatch(loginsendauth_request({phonenumber}));
        console.log("发送验证码:" + phonenumber);
    }

    return (<Form>
      <FormUI>
      <Field name="username" type="text" component={renderInputField} label="手机号" placeholder="请输入手机号"/>
      <Field name="authcode" type="text" component={renderAuthField} label="验证码" placeholder="请输入验证码" onClickAuth={onClickAuth}/>
      <Field name="password" type="password" component={renderInputField} label="密码" placeholder="请输入密码"/>
      </FormUI>
            <Agreement>
              &nbsp;&nbsp; <a href="javascript:;">我已经阅读并同意中南出行协议</a>
            </Agreement>
            <div className="submitBtn">
            <botton className="btn Primary" onClick={handleSubmit}>下一步</botton>
            <a className="blue" >已有账号，去登录</a>
            </div>
            </Form>);
};

const selector = formValueSelector('register');
const mapStateToProps = (state) => {
    let phonenumber = selector(state, 'username');
    return {phonenumber};
}


RegisterForm = connect(mapStateToProps)(RegisterForm);

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = '必须填写用户名';
    }
    else {
        let phone = values.username;
        phone = phone.replace(/\s/g, '');
        if (phone.match(/\D/g) || phone.length !== 11 || !phone.match(/^1/)) {
            errors.username = '无效的手机号码';
        }
    }

    if (!values.authcode) {
        errors.authcode = '必须填写验证码';
    }
    else {
        let authcode = values.authcode;
        authcode = authcode.replace(/\s/g, '');
        if (authcode.match(/\D/g) || authcode.length !== 4) {
            errors.authcode = '验证码必须是四位数字';
        }
    }

    if (!values.password) {
        errors.password = '必须填写密码'
    }
    else {
        let psd = values.password;
        if (psd.match(/\s/g)) {
            errors.password = '密码不能含有空格';
        }
        else if (psd.length < 6) {
            errors.password = '密码不能小于六位';
        }
        else if (psd.length > 16) {
            errors.password = '密码太长';
        }
    }

   if (values.invitecode) {
        let invitecode = values.invitecode;
        if (invitecode.match(/\D/g) || invitecode.length !== 8) {
            errors.invitecode = '邀请码必须是八位数字(也可不填)';
        }
    }
    return errors;
}

RegisterForm = reduxForm({
    form: 'register',
    validate,
    initialValues: {
        username: '',
        password: '',
        authcode: '',
    }
})(RegisterForm);


export class Page extends React.Component {

    componentWillMount() {
    }

    onClickReturn =()=>{
        this.props.history.goBack();
    }
    onClickRegister = (values)=> {
        console.dir(values);

        let payload = {
            username: values.username,
            password: values.password,
            authcode: values.authcode,
        }
        //alert(JSON.stringify(formdata));
        // this.props.dispatch(register(payload)).then((result)=> {
        //     this.props.history.replace('/');
        // }).catch((error)=> {
        //     console.log("注册失败:" + JSON.stringify(error));
        // });
        console.log("onClickRegister:" + JSON.stringify(payload));
        this.props.dispatch(register_request(payload));
    }

    onClickLogin = ()=> {
        this.props.history.replace('/login');
    }

    render() {
        return (
            <div className="registerPage AppPage">
                <RegisterForm onSubmit={this.onClickRegister}
                              onClickLogin={this.onClickLogin}
                              onClickReturn={this.onClickReturn}/>
            </div>
        );
    }

}


Page = connect()(Page);
export default Page;
