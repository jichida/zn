/*
    注册代驾司机－基本信息
*/
import React, { Component } from 'react';
import { Field,Fields,reduxForm,Form} from 'redux-form';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/taxi.css';
import NavBar from '../../tools/nav.js';
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
import {renderInputField,renderSelField} from '../../tools/renderfield';
import {renderImageupload} from '../../tools/renderimageupload';
import {renderDateField} from '../../tools/renderdate';
import {ui_isdateopen} from '../../../actions';

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
    setDateopen =(show)=>{
      this.props.dispatch(ui_isdateopen(show));
    }
    render() {
        const { handleSubmit,previousPage,isdateopen,dispatch } = this.props;
        return (
            <div className="taxiPage AppPage">

                <NavBar back={true} title="注册代驾" />

                <div className="list">
                    <div className="avatar">
                        <Field name="avatar" component={renderImageupload}/>
                    </div>
                    <FormUI className="formStyle1">
                        <Field name="DriverName" label="司机姓名" placeholder="请输入司机姓名" type="text" component={renderInputField}/>
                        <Field name="idcard" label="身份证号" placeholder="请输入身份证号" type="text" component={renderInputField} />
                        <Field name="bankname" label="选择银行" data={databanklist} component={renderSelField} />
                        <Field name="bankaccount" label="银行卡号" placeholder="请输入银行卡号" type="text" component={renderInputField} />
                        <Field name="DriverType" label="准驾类型" placeholder="请输入准驾类型" type="text" component={renderInputField} />
                        <Field name="DriverType" label="初次领驾照日期" setDateopen={this.setDateopen} isdateopen={isdateopen} component={renderDateField} />
                    </FormUI>
                </div>
                <div className="submitBtn">
                    <botton className="btn Primary"  onClick={previousPage}>上一步</botton>
                    <botton className="btn Primary"  onClick={handleSubmit}>确定</botton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({appui:{isdateopen}}) => {
    return {isdateopen};
}


Page = connect(mapStateToProps)(Page);

export default reduxForm({
  form: 'registerfillwizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(Page)
