import React, { Component } from 'react';
import { Field, reduxForm, Form, formValueSelector  } from 'redux-form';
import { connect } from 'react-redux';
import {loginsendauth_request,loginwithauth_request} from '../../actions';
import NavBar from '../tools/nav.js';
import '../../../public/newcss/login.css';
import { withRouter } from 'react-router-dom';
import {
    required,
    phone,
    InputValidation,
    length4
    } from "../tools/formvalidation"

export class PageForm extends Component {
    onClickSendAuth =()=>{
        this.props.dispatch(loginsendauth_request({phonenumber:this.props.phonenumber}));
    }
    render(){
        const { handleSubmit,onClickLogin,pristine,phonenumber,submitting } = this.props;

        return (
            <Form
                className="loginForm formStyle1"
                onSubmit={handleSubmit(onClickLogin)}
                >

                <div className="li" >
                    <span className="icon">
                        <img src="newimg/p25.png" />
                    </span>
                    <Field
                        name="phonenumber"
                        id="phonenumber"
                        placeholder="请输入您的账号"
                        type="text"
                        component={ InputValidation }
                        validate={[ required, phone ]}
                    />
                </div>
                <div className="li">
                    <span className="icon">
                        <img src="newimg/p26.png" />
                    </span>
                    <Field
                        name="authcode"
                        id="authcode"
                        placeholder="请输入验证码"
                        type="text"
                        component={ InputValidation }
                        validate={[ required,length4 ]}
                    />
                    <div className="getyanzhen" onClick={this.onClickSendAuth}>获取验证码</div>
                </div>

                <div className="submitBtn">
                    <span
                        className="btn Primary"
                        disabled={pristine || submitting}
                        onClick={handleSubmit(onClickLogin)}
                        >
                        登录
                    </span>
                  </div>
            </Form>
        )
    }
}

PageForm = reduxForm({
    form: 'LoginPageForm'
})(PageForm);

const inputconnect = formValueSelector('LoginPageForm');
PageForm = connect(
    state => {
        const phonenumber = inputconnect(state, 'phonenumber');
        return {
            phonenumber
        }
    }
)(PageForm)
PageForm = withRouter(PageForm);

export class Page extends Component {
    componentWillReceiveProps (nextProps) {
        console.log(nextProps);
        if(nextProps.loginsuccess && !this.props.loginsuccess){
            console.log("------->" + JSON.stringify(this.props.location));
            //search:?next=/devicelist
            var fdStart = this.props.location.search.indexOf("?next=");
            if(fdStart === 0){
                const redirectRoute = this.props.location.search.substring(6);
                this.props.history.replace(redirectRoute);
            }
            else{
                this.props.history.goBack();
            }
            return;
        }
    }
    onClickReturn =()=>{
        this.props.history.goBack();
    }
    onClickLogin = (values)=>{
        let payload = {
            phonenumber:values.phonenumber,
            authcode:values.authcode,
        };
        this.props.dispatch(loginwithauth_request(payload));
    }
    render(){
        return (
            <div className="loginPage AppPage">
                <NavBar back={true} title="快速登录" />
                <div className="content">
                    <div className="logo">
                        <img src="newimg/p24.png" />
                    </div>
                    <PageForm onClickLogin={this.onClickLogin}/>
                </div>
            </div>
        )
    }
}

const data = ({userlogin}) => { return userlogin; }
Page = connect(data)(Page);

export default Page;
