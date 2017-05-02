import React, { Component, PropTypes } from 'react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import {
  Container,
  View,
  Button,
  Notification,
  NavBar
} from 'amazeui-touch';
import {Label} from 'semantic-ui-react';
import {loginsendauth_request} from '../actions';

let renderLoginForm = (fields)=>{
    let onClickSendAuth =()=>{
        fields.dispatch(loginsendauth_request({phonenumber:fields.phonenumber.input.value}));
    }
    return (
              <ul className="list background padding">
                <li className="item item-input radius5 mb15">
                  <div className="item-media"><span className="icon icon-sjh"></span></div>
                  <div className="item-main">
                    <label className="field-container">
                      <input type="text" icon="person" placeholder="请输入您的手机号" className="field"
                      {...fields.phonenumber.input} />
                    </label>
                    {fields.phonenumber.meta.touched && fields.phonenumber.meta.error &&
                        <Label basic color='red' pointing>{fields.phonenumber.meta.error}</Label>}
                  </div>
                </li>
                <li className="item item-input radius5 mb15">
                  <div className="item-media"><span className="icon icon-yzm"></span></div>
                  <div className="item-main">
                    <label className="field-container">
                      <input type="password" icon="info" placeholder="请输入验证码" className="field"
                      {...fields.authcode.input} />
                    </label>
                    {fields.authcode.meta.touched && fields.authcode.meta.error &&
                        <Label basic color='red' pointing>{fields.authcode.meta.error}</Label>}
                    <a className="border_left padding-left" onClick={onClickSendAuth}>获取验证码</a>
                  </div>
                </li>
              </ul>
            );

}

renderLoginForm = connect()(renderLoginForm);

let LoginForm = (props)=>{
  let {handleSubmit,onClickLogin} = props;
  return (<Form onSubmit={handleSubmit(onClickLogin)}>
        <img src="newimg/1.png" alt='logo'/>
        <div className="group">
          <div className="group-body background">
            <Fields names={[ 'phonenumber', 'authcode',]} component={renderLoginForm}/>
          <div className="padding"><Button amStyle="primary" block>确认登录</Button></div>
          </div>
        </div>
  </Form>);
};

const validate = values => {
  const errors = {}
  if (!values.phonenumber) {
    errors.phonenumber = '必须填写手机号码';
  }
  else{
    let phone = values.phonenumber;
    phone = phone.replace(/\s/g,'');
		if(phone.match(/\D/g)||phone.length!==11||!phone.match(/^1/))
		{
      errors.phonenumber = '无效的手机号码';
    }
  }


    if (!values.authcode) {
      errors.authcode = '必须填写验证码';
    }
    else{
      let authcode = values.authcode;
      authcode = authcode.replace(/\s/g,'');
  		if(authcode.match(/\D/g)||authcode.length!==4)
  		{
        errors.authcode = '验证码必须是四位数字';
      }
    }

  return errors;
}

LoginForm = reduxForm({
  form: 'login',
  validate,
  initialValues:{
    phonenumber:'',
    authcode:'',
  }
})(LoginForm);


import {loginwithauth_request} from '../actions/index.js';
export class Page extends React.Component {

  componentWillMount () {
  }

  onClickLogin = (values)=>{
    console.dir(values);
    let payload = {
        phonenumber:values.phonenumber,
        authcode:values.authcode,
    };
    this.props.dispatch(loginwithauth_request(payload));
  }

  componentWillReceiveProps (nextProps) {
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
  render() {
     const itemLeft = {
        title: '返回'
      };
      const dataLeft = {
        title: '快速登录',
        leftNav: [{...itemLeft, icon: 'left-nav'}],
        onAction: this.onClickReturn
      };
    return (
        <View className="login_bg">
        <NavBar {...dataLeft} className="white background"/>
        <Container>
        <LoginForm onClickLogin={this.onClickLogin}/>
        </Container>
        </View>
    );
  }

}

const mapStateToProps = ({userlogin}) => {
  return userlogin;
}
Page = connect(mapStateToProps)(Page);
export default Page;
