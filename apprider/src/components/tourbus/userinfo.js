/*
    旅游大巴填写用户信息
*/
import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-mobile-datepicker';
import { Field,Fields,reduxForm,Form  } from 'redux-form';
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

const PageForm = (props) => {
   	
   	const {handleSubmit} = props;
    return (
	    <Form
            onSubmit={handleSubmit}
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
    initialValues:{
        
    }
})(PageForm);


const Page = (props) => {

    return (
        <div className="tourbusUserinfoPage">
        	<NavBar title='填写订单' back={true} />
        	<div className="carlist">
        		<div className="li">

        			<span><img src="newimg/38.png" /><i>2</i></span>
        			<span><img src="newimg/38.png" /><i>2</i></span>
        			<span><img src="newimg/38.png" /><i>2</i></span>
        		</div>
        		<span className="carlistlnk">共12辆</span>
        	</div>
        	<PageForm />
        </div>
    );
};

export default Page;
