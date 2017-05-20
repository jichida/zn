/*
    旅游大巴汽车列表表单
*/
import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-mobile-datepicker';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import moment from 'moment';
import objectPath from 'object-path';
import {
    ui_lvyoudabasetdateshow1,
    ui_lvyoudabasetdateshow2,
    orderconfirm_settourbus
    } from '../../actions';
import config from '../../config.js';
import { Button } from 'amazeui-touch';

const Tourbusco = (props) => {
    const {businfo,onClickBusAdd,onClickBusDec,curnumber,onChangeBusinput} = props;
    return (
        <div className="col">
            <div className="xzcx_img">
                <img src={businfo.icon} alt="img"/>
            </div>
            <div>{businfo.name}
                <p className="margin-top-0">
                    <small>({businfo.seatnumber})座位</small>
                </p>
            <div className="mui-numbox">
                <button 
                    key={'bus0' + businfo._id} 
                    onClick={onClickBusDec} 
                    className="mui-btn mui-btn-numbox-minus"
                    type="button"
                    >-
              </button>
              <input className="mui-input-numbox" type="number" onChange={onChangeBusinput} value={curnumber}/>
              <button key={'bus1' + businfo._id} onClick={onClickBusAdd} className="mui-btn mui-btn-numbox-plus"
                      type="button">+
              </button>
            </div>
          </div>
        </div>
    );

};

PageForm = reduxForm({
    form: 'tourbus',
    initialValues:{
        rentusername:'',
    }
})(PageForm);


export default TourbusForm;