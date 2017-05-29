/*
    注册快车司机－基本信息
*/
import React, { Component } from 'react';
import { Field,Fields,reduxForm,Form} from 'redux-form';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/taxi.css';
import validate from './validate';
import StarRatingComponent from 'react-star-rating-component';
const {
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form:FormUI,
    FormCell,
    Label,
    Input,
    Select
    } = WeUI;
import NavBar from '../../tools/nav.js';
import {renderInputField,renderSelField} from '../../tools/renderfield';
import {renderImageupload} from '../../tools/renderimageupload';

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

const datasexlist = [
  {
      value: '男',
      label: '男'
  },
  {
      value: '女',
      label: '女'
  },
];

const datamarriagestatuslist = [
    {
        value: '未婚',
        label: '未婚'
    },
    {
        value: '已婚',
        label: '已婚'
    },
    {
        value: '离异',
        label: '离异'
    }
  ];


class Page extends Component {

    render() {
        const { handleSubmit,previousPage } = this.props;
        return (
            <div className="taxiPage taxiregisterPage AppPage">

                <NavBar back={false} title="注册快车司机"
                  leftnav={[
                    {
                      type:"action",
                      action : previousPage,
                      text:"上一步"
                    }
                  ]}
                 />

                <div className="list">
                    <div className="avatar">
                        <Field name="avatarURL" component={renderImageupload}/>
                    </div>
                    <FormUI className="formStyle1">
                    <Field name="DriverName" label="司机姓名" placeholder="请输入司机姓名" type="text" component={renderInputField}/>
                    <Field name="DriverPhone" label="驾驶员手机号" placeholder="请输入驾驶员手机号" type="text" component={renderInputField} />
                    <Field name="idcard" label="身份证号" placeholder="请输入身份证号" type="text" component={renderInputField} />
                    <Field name="bankname" label="选择银行" data={databanklist} component={renderSelField} />
                    <Field name="bankaccount" label="银行卡号" placeholder="请输入银行卡号" type="text" component={renderInputField} />
                    <Field name="DriverType" label="准驾类型" placeholder="请输入准驾类型" type="text" component={renderInputField} />
                    <Field name="DriverGender" label="性别" data={datasexlist} component={renderSelField} />
                    <Field name="huji" label="户籍" placeholder="户口登记机关名称" type="text" component={renderInputField} />
                    <Field name="DriverAddress" label="户口住址" placeholder="户口住址或长住地址" type="text" component={renderInputField} />
                    <Field name="DriverNation" label="民族" placeholder="请输入民族" type="text" component={renderInputField} />
                    <Field name="DriverMaritalStatus" label="婚姻情况" data={datamarriagestatuslist} component={renderSelField} />
                    <Field name="EmergencyContactPhone" label="紧急情况联系人联系电话" placeholder="请输入联系电话" type="text" component={renderInputField} />
                    <Field name="EmergencyContactAddress" label="紧急联系人通讯地址" placeholder="请输入通讯地址" type="text" component={renderInputField} />
                    <Field name="CertificateN0" label="网约出租车证件编号" placeholder="请输入网约出租车证件编号" type="text" component={renderInputField} />
                    </FormUI>
                </div>
                <div className="submitBtn">
                    <button className="btn Primary"  onClick={handleSubmit}><span>确定</span></button>
                </div>
            </div>

        )
    }
}

export default reduxForm({
  form: 'registerfillwizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(Page)
