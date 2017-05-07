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
const {
    CellHeader,
    CellBody,
    Form:FormUI,
    FormCell,
    Label,
    Input,
    Select
    } = WeUI;
import { Field,Fields,reduxForm,Form} from 'redux-form';
import { connect } from 'react-redux';
import {renderInputField,renderSelField} from '../tools/renderfield';
import {withdrawcashapplyaddone_request} from '../../actions';

const databanklist = [
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
];

let WithdrawForm = (props)=>{
  const {balance,handleSubmit}  = props;
  return (
      <div className="withdrawalsPage AppPage">
          <NavBar back={true} title="提现" />
          <div className="list">

              <FormUI>
              <Field name="bankname" label="选择银行" data={databanklist} component={renderSelField} />
              <Field name="bankaccount" label="银行卡号" placeholder="请输入银行卡号" type="text" component={renderInputField} />
              <Field name="cashmoney" label="提现金额" placeholder="请输入提现金额" type="text" component={renderInputField} />
              </FormUI>

              <div className="promptcontent">
                  你好，本次可提现金额: <span className="color_warning">{balance}</span>元
              </div>

          </div>
          <div className="submitBtn">
              <botton className="btn Primary"  onClick={handleSubmit}>确定</botton>
          </div>
      </div>
  );
}

WithdrawForm = reduxForm({
  form: 'withdrawform',                 // <------ same form name
})(WithdrawForm);


class Page extends Component {
  onClickWithdraw = (values)=>{
    console.dir(values);

    this.props.dispatch(withdrawcashapplyaddone_request(values));
  }

    render() {
      return (<WithdrawForm onSubmit={this.onClickWithdraw} balance={this.props.balance}/>);
    }
}
const mapStateToProps = ({userlogin:{balance}}) => {
  return {balance};
}
Page = connect(mapStateToProps)(Page);

export default Page;
