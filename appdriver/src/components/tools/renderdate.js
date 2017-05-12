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

class renderDateField extends React.Component{
    construcorr(props) {  
        super(props);
        this.state = {
            isdateopen : false,
        }
    }
    setDateopen =(v)=>{
        this.setState({isdateopen : v});
    }
    
    render(){
        const { input, label, meta: { touched, error } } = this.props;
        if(typeof input.value === 'string'){
            try{
                input.value= new Date(Date.parse(input.value));
            }
            catch(e){
                input.value= new Date();
            }
        }
        let handleClick1 =()=>{
            this.setDateopen(true);
        }
        let handleSelect1=(time)=>{
            input.onChange(time);
            this.setDateopen(false);
        };
        let handleCancel1=()=>{
            this.setDateopen(false);
        }
        return (
            <FormCell>
                <CellHeader>{label}</CellHeader>
                <CellBody>
                    <span onClick={handleClick1}>{moment(input.value).format("YYYY-MM-DD")}
                        <DatePicker
                            value={input.value}
                            isOpen={this.state.isdateopen}
                            onSelect={handleSelect1}
                            onCancel={handleCancel1}
                            dateFormat={['YYYY年', 'MM月', 'DD日']}
                        />
                    </span>
                </CellBody>
            </FormCell>
        )
    }
}


export {renderDateField};
