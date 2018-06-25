import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import { Field } from 'redux-form';
import {FieldTitle,isRequired} from 'admin-on-rest';
const renderDatePicker= (props) => {
  let {input,label,meta,resource,source} = props;
  let onChange = (event, newdate)=>{
    let newvalue = moment(newdate).format("YYYY-MM-DD");
    input.onChange(newvalue);
  }

  const { touched, error } = meta;
  let value = new Date();
  if(!!input.value){
    try{
      value = moment(input.value).toDate();
      if ( isNaN( value.getTime() ) ) {
        value = new Date();
      }
    }
    catch(e){
      console.log(e);
    }

  }
  else{
    input.onChange(moment().format("YYYY-MM-DD"));
  }
  return (<DatePicker
    errorText={touched && error}
    floatingLabelText={
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />
                }
     value={value}
     onChange={onChange}
     okLabel='确定'
     cancelLabel='取消'/>);
}

const DateInputString = (props) => {
  let {source,label} = props;
  return(
    <span>
      <Field name={source} component={renderDatePicker} {...props}/>
    </span>
  )
}


export  {DateInputString};
