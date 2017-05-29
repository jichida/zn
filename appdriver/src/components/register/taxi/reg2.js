/*
    注册司机－车辆信息
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
    CellsTitle,
    Form:FormUI,
    FormCell,
    Label,
    Input,
    Select
    } = WeUI;
import {renderInputField,renderSelField} from '../../tools/renderfield';

class Page extends Component {

    render() {
        const { handleSubmit,previousPage } = this.props;
        return (
            <div className="taxiPage AppPage">
                <NavBar back={false} title="车辆信息"
                  leftnav={[
                    {
                      type:"action",
                      action : previousPage,
                      text:"上一步"
                    }
                  ]}
                 />
                <div className="list">
                    <FormUI className="formStyle1">
                        <CellsTitle>请认真填写车辆基本信息</CellsTitle>
                        <Field name="OwnerName" label="所属公司" placeholder="请输入公司名" type="text" component={renderInputField}/>
                        <Field name="VehicleNo" label="车牌号" placeholder="请输入车牌号" type="text" component={renderInputField}/>
                        <Field name="Seats" label="核定载客位" placeholder="请核定载客位" type="text" component={renderInputField}/>
                        <Field name="CheckState" label="年度审核状态" placeholder="年度审核状态" type="text" component={renderInputField}/>
                        <Field name="Certificate" label="网络预约出租车运输证号" placeholder="网络预约出租车运输证号" type="text" component={renderInputField}/>
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
