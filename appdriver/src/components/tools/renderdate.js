import React from 'react'
import WeUI from 'react-weui';
import DatePicker from 'react-mobile-datepicker';
const {
    FormCell,
    CellHeader,
    CellBody,
    CellFooter,
    Button,
    Input,
    Label,
    Select
  } = WeUI;

  import moment from 'moment';

const renderDateField = (props) => {
  const { input,isdateopen,setDateopen, label, meta: { touched, error } } = props;
  let handleClick1 =()=>{
    setDateopen(true);
  };
  let handleSelect1=(time)=>{
    input.onChange(time);
    setDateopen(false);
  };
  let handleCancel1=()=>{
    setDateopen(false);
  }

  if(typeof input.value === 'string'){
    try{
      input.value= new Date(Date.parse(input.value));
    }
    catch(e){
      input.value= new Date();
    }
  }
  return (
    <FormCell>
        <CellHeader>{label}</CellHeader>
        <CellBody>
        <span onClick={handleClick1}>{moment(input.value).format("YYYY-MM-DD")}
                  <DatePicker
                      value={input.value}
                      isOpen={isdateopen}
                      onSelect={handleSelect1}
                      onCancel={handleCancel1}
                      dateFormat={['YYYY年', 'MM月', 'DD日']}
                  /></span>
            {touched && error &&
            <Label basic color='red' pointing>{error}</Label>}
        </CellBody>
    </FormCell>
  );
}


export {renderDateField};
