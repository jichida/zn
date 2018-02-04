import React, { Component } from 'react';
// import { Input, List, Radio, Button, Icon, Image, Checkbox,Label} from 'semantic-ui-react';
// import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { Field, Fields, reduxForm, Form, formValueSelector  } from 'redux-form';
import { connect } from 'react-redux';
import NavBar from '../tools/nav.js';
import {loginsendauth_request} from '../../actions/index.js';
import {oauthbinduser} from '../../actions/sagacallback.js';
import Sendauth from '../tools/sendauth.js';
import {
    required,
    phone,
    InputValidation,
    length4
    } from "../tools/formvalidation"

/**
export class PageForm extends Component {

    onClickAuth = (callback)=> {
        const phonenumber = this.props.phonenumber;
        const phone =  !!phonenumber && !(phonenumber.match(/\D/g)||phonenumber.length !== 11||!phonenumber.match(/^1/));
        if(phone){
            this.props.dispatch(loginsendauth_request({
                phonenumber:this.props.phonenumber,
                reason:'login'
            }));
        }
        callback(phone);
    }

    render(){
        const { handleSubmit,onClickLogin,pristine,submitting } = this.props;

        return (
            <Form
                className="loginForm formStyle1"
                onSubmit={handleSubmit(onClickLogin)}
                >

                <div className="li" >
                    <span className="icon">
                        <img src="newimg/p25.png" alt=''/>
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
                <div className="li getyanzhenli">
                    <span className="icon">
                        <img src="newimg/p26.png"  alt=''/>
                    </span>
                    <Field
                        name="authcode"
                        id="authcode"
                        placeholder="请输入验证码"
                        type="password"
                        component={ InputValidation }
                        validate={[ required,length4 ]}
                    />


                    <Sendauth primary action={this.onClickAuth} className="getyanzhen" />
                </div>

                <div className="submitBtn">
                    <span
                        className="btn Primary"
                        disabled={pristine || submitting}
                        onClick={handleSubmit(onClickLogin)}
                        >
                        确认登录
                    </span>
                  </div>
            </Form>
        )
    }
}

PageForm = reduxForm({ form: 'LoginPageForm' })(PageForm);
**/


let BinduserForm = (props)=> {

    let {handleSubmit,onClickBinduser,onClickLogin,onClickReturn, pristine, submitting} = props;

    let onClickAuth = (callback)=> {
        const name = props.username;
        const phone =  !!name && !(name.match(/\D/g)||name.length !== 11||!name.match(/^1/));
        console.log(phone);
        if(phone){
            props.dispatch(loginsendauth_request({phonenumber: name,reason:'binduser'}));
        }
        callback(phone);
    }
    return (
        <Form
            className="loginForm formStyle1"
            onSubmit={handleSubmit(onClickBinduser)}
            >

            <div className="li" >
                <span className="icon">
                    <img src="newimg/p25.png" alt=''/>
                </span>
                <Field
                    name="username"
                    id="username"
                    placeholder="请输入手机号"
                    type="text"
                    component={ InputValidation }
                    validate={[ required, phone ]}
                />
            </div>
            <div className="li getyanzhenli">
                <span className="icon">
                    <img src="newimg/p26.png"  alt=''/>
                </span>
                <Field
                    name="authcode"
                    id="authcode"
                    placeholder="请输入验证码"
                    type="password"
                    component={ InputValidation }
                    validate={[ required,length4 ]}
                />


                <Sendauth primary action={onClickAuth} className="getyanzhen" />
            </div>

            <div className="submitBtn">
                <span
                    className="btn Primary"
                    disabled={pristine || submitting}
                    onClick={handleSubmit(onClickBinduser)}
                    >
                    绑定
                </span>
              </div>
        </Form>
    );
};


// const validate = values => {
//     const errors = {}
//     if (!values.username) {
//         errors.username = '必填项';
//     }
//     else {
//         let phone = values.username;
//         phone = phone.replace(/\s/g, '');
//         if (phone.match(/\D/g) || phone.length !== 11 || !phone.match(/^1/)) {
//             errors.username = '无效手机号';
//         }
//     }

//     if (!values.authcode) {
//         errors.authcode = '必填项';
//     }
//     else {
//         let authcode = values.authcode;
//         authcode = authcode.replace(/\s/g, '');
//         if (authcode.match(/\D/g) || authcode.length !== 4) {
//             errors.authcode = '四位数字';
//         }
//     }

//     return errors;
// }

BinduserForm = reduxForm({ form: 'binduser' })(BinduserForm);
const inputconnect = formValueSelector('binduser');
BinduserForm = connect(
    state => {
        const username = inputconnect(state, 'username');
        return {
            username
        }
    }
)(BinduserForm)
// BinduserForm = withRouter(PagBinduserFormeForm);

export class Page extends React.Component {

    onClickBinduser = (values)=> {
        let payload = {
            bindtype:this.props.bindtype,
            openid:this.props.openid,
            username: values.username,
            authcode: values.authcode,
        }
        //alert(JSON.stringify(formdata));
        this.props.dispatch(oauthbinduser(payload)).then((result)=> {
            this.props.history.replace('/');
        }).catch((error)=> {
            console.log("注册失败:" + JSON.stringify(error));
        });
    }
    render() {
        return (
            <div className="loginPage AppPage">
                <NavBar back={true} title="绑定账号" />
                <BinduserForm onClickBinduser={this.onClickBinduser} />
            </div>
        );
    }

}

const mapStateToProps = ({userlogin}) => {
    return {...userlogin};
}
Page = connect(mapStateToProps)(Page);
export default Page;
