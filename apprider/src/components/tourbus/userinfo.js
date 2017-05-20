/*
    旅游大巴填写用户信息
*/
import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-mobile-datepicker';
import { Field,Fields,reduxForm,Form,getFormValues  } from 'redux-form';
import moment from 'moment';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import "./tourbusUserinfo.css";
import NavBar from '../tools/nav.js';
import {
    required,
    InputValidation,
    WeuiInputValidation,
    WeuiSelectValidation,
    DatePickerInput
    } from "../tools/formvalidation"
const {
    FormCell,
    Checkbox,
    Form:FormUI,
    Select,
    Panel,
    PanelBody,
    MediaBox,
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Input,
    Label,
    CellsTitle
    } = WeUI;
import _ from 'lodash';
import {
    orderconfirm_settourbus
    } from '../../actions';

const PageForm = (props) => {

   	const {handleSubmit,onClickOK} = props;
    return (
	    <Form
            onSubmit={handleSubmit(onClickOK)}
            >

            <FormUI>

            	<Field
                    name="zucheren"
                    id="zucheren"
                    placeholder="请输入真实姓名"
                    type="text"
                    component={ WeuiInputValidation }
                    validate={[ required ]}
                    InputTit="租车人"
                />
                <Field
                    name="zuchephone"
                    id="zuchephone"
                    placeholder="请输入您的联系方式"
                    type="text"
                    component={ WeuiInputValidation }
                    validate={[ required ]}
                    InputTit="租车电话"
                />
                <FormCell className="seltime">
                    <CellHeader>
                        <Label>出行时间</Label>
                    </CellHeader>
                    <CellBody>
                        <Field
							name="startdate"
							id="startdata"
							component={ DatePickerInput }
						/>
                    </CellBody>
                </FormCell>
                <FormCell className="seltime">
                    <CellHeader>
                        <Label>还车时间</Label>
                    </CellHeader>
                    <CellBody>
                        <Field
							name="enddate"
							id="enddata"
							component={ DatePickerInput }
						/>
                    </CellBody>
                </FormCell>
	            <Cell>
	                <CellBody>
	                    <span className="tit">支付金额</span>
	                    <span className="color_warning">¥ 800</span>
	                </CellBody>
	            </Cell>
	            <CellsTitle className="pricenum">
	            	<img src="newimg/39.png" />
	            	<span>购买说明: 您购买的是不含过路费的，如有疑问请联系客服</span>
	            </CellsTitle>
	            <div className="submitBtn">
	                <button className="btn Primary">确定</button>
	            </div>
            </FormUI>

		</Form>
    );
};

PageForm = reduxForm({
    form: 'tourbus',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    initialValues:{
      rentusername:'',
      startdate:new Date(),
      enddate:new Date(),
    }
})(PageForm);


const Page = (props) => {
    let onClickOK =(values)=>{
      console.log("ok:" + JSON.stringify(values));
      props.dispatch(orderconfirm_settourbus(values));
      props.history.push('/orderconfirm/tourbus');
    }
    const {buslistsel,totalnumber} = props;
    return (
        <div className="tourbusUserinfoPage">
        	<NavBar title='填写订单' back={true} />
        	<div className="carlist">
        		<div className="li">
              {
                _.map(buslistsel,(businfosel)=>{
                  return (<span key={businfosel._id}><img src={businfosel.icon} /><i>{businfosel.num}</i></span>);
                })
              }
        		</div>
        		<span className="carlistlnk">共{totalnumber}辆</span>
        	</div>
        	<PageForm onClickOK={onClickOK}/>
        </div>
    );
};

const mapStateToProps = (state) => {
  const {lvyoudaba:{buslist}} = state;
  let {busnumberobj} = getFormValues('tourbus')(state);

  let buslistsel = [];
  let totalnumber = 0;
  _.map(buslist,(businfo)=>{
      if(busnumberobj.hasOwnProperty(businfo._id)){
          totalnumber += busnumberobj[businfo._id];
          buslistsel.push({
            _id:businfo._id,
            icon:businfo.icon,
            num:busnumberobj[businfo._id]
          });
      }
  });
  console.log(`values:===>${JSON.stringify(buslistsel)}`);
  return {buslistsel,totalnumber};
}
Page = connect(mapStateToProps)(Page);


export default Page;
