import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import { Field,FieldArray } from 'redux-form';
import {FieldTitle,isRequired} from 'admin-on-rest';

const renderTimePicker= (props) => {
  let {input,label,meta,resource,source} = props;
  const { touched, error } = meta;
  let onChange = (event, newdate)=>{
    let newvalue = moment(newdate).format("HH:mm");
    input.onChange(newvalue);
  }
  // if( Object.prototype.toString.call( input.value ) !== '[object Array]' ) {
  //     input.value = [];
  // }
  let value = new Date();

  if(input.value){
    let szvalue = input.value.split(":");
    if(szvalue.length === 2){
      let h = parseInt(szvalue[0],10);
      let m = parseInt(szvalue[1],10);
      value.setHours(h,m,0,0);
    }
  }
  return (<TimePicker errorText={touched && error}
  floatingLabelText={
                  <FieldTitle
                      label={label}
                      source={source}
                      resource={resource}
                      isRequired={isRequired}
                  />
              }
  value={value} onChange={onChange} okLabel='确定' cancelLabel='取消'/>);
}

const TimePickerInput = (props) => {
  let {source,label} = props;
  return(
    <span>
      <Field name={source} component={renderTimePicker} {...props}/>
    </span>
)
}


export  {TimePickerInput};
