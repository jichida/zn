import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {ui_registerfillwizard} from '../../actions';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/register.css';
const {
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
    } = WeUI;

import FastRegPage1 from './fast/reg1.js';
import FastRegPage2 from './fast/reg2.js';
import FastRegPage3 from './fast/reg3.js';
import ReplaceRegPage1 from './replace/reg1.js';
import ReplaceRegPage2 from './replace/reg2.js';
import TaxiRegPage1 from './taxi/reg1.js';
import TaxiRegPage2 from './taxi/reg2.js';
import TaxiRegPage3 from './taxi/reg3.js';

import {fillrealnameprofile_request} from '../../actions';

class RegisterFillWizardForm extends Component {
  constructor(props) {
    super(props)
  }

  nextPage = ()=> {
    this.props.dispatch(ui_registerfillwizard({
      curpage:this.props.curpage+1
    }));
  }

  previousPage = ()=> {
    this.props.dispatch(ui_registerfillwizard({
      curpage:this.props.curpage-1
    }));
  }

  setcurPage =(registertype)=>{
    this.props.dispatch(ui_registerfillwizard({
      registertype,
      curpage:1
    }));
  }

  onSubmit =(values)=>{
    const { registertype } = this.props;
    console.log(`FINALL===========>values:${JSON.stringify(values)}`);
    alert(`注册类型:${registertype},数据:${JSON.stringify(values)}`);
    const {idcard,bankname,avatar,bankaccount,CarmanPhotoldURL,PhotoldURL,...Platform_baseInfoDriver} = values;
    let data = {
      registertype,
      idcard,
      bankname,
      bankaccount,
      CarmanPhotoldURL,
      PhotoldURL,
      profile:{
        avatar
      },
      Platform_baseInfoDriver
    };
    this.props.dispatch(fillrealnameprofile_request({data}));
  };

  renderpage0 =()=> {
        return (
    		<div className="registerPage register1Page AppPage">
				<Cells>
		            <Cell access onClick={()=>this.setcurPage('快车')}>
		                <CellHeader>
		                    <img src="newimg/1.png" />
		                </CellHeader>
		                <CellBody>
		                    <div className="tit">我要成为快车司机</div>
		                    <div className="con">做点兼职赚点钱...</div>
		                </CellBody>
		                <CellFooter />
		            </Cell>
		            <Cell access onClick={()=>this.setcurPage('出租车')}>
		                <CellHeader>
		                    <img src="newimg/2.png" />
		                </CellHeader>
		                <CellBody>
		                    <div className="tit">我要成为出租车司机</div>
		                    <div className="con">做点兼职赚点钱...</div>
		                </CellBody>
		                <CellFooter />
		            </Cell>
		          <Cell access onClick={()=>this.setcurPage('代驾')}>
		                <CellHeader>
		                    <img src="newimg/3.png" />
		                </CellHeader>
		                <CellBody>
		                    <div className="tit">我要成为代驾司机</div>
		                    <div className="con">做点兼职赚点钱...</div>
		                </CellBody>
		                <CellFooter />
		            </Cell>
		        </Cells>
    		</div>
    	)
    }

  render() {
    const { registertype,curpage } = this.props;
    if(curpage === 0){
      return this.renderpage0();
    }

    if(registertype === '快车'){
      if(curpage === 1){
        return (<FastRegPage1  previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
      }
      if(curpage === 2){
        return (<FastRegPage2  previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
      }
      if(curpage === 3){
        return (<FastRegPage3  previousPage={this.previousPage}  onSubmit={this.onSubmit}/>);
      }
    }
    if(registertype === '出租车'){
      if(curpage === 1){
        return (<TaxiRegPage1 previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
      }
      if(curpage === 2){
        return (<TaxiRegPage2  previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
      }
      if(curpage === 3){
        return (<TaxiRegPage3  previousPage={this.previousPage}  onSubmit={this.onSubmit}/>);
      }
    }
    if(registertype === '代驾'){
      if(curpage === 1){
        return (<ReplaceRegPage1 previousPage={this.previousPage}  onSubmit={this.nextPage}/>);
      }
      if(curpage === 2){
        return (<ReplaceRegPage2  previousPage={this.previousPage}  onSubmit={this.onSubmit}/>);
      }
    }

    return (<div>{registertype}{curpage}</div>);
  }
}

const mapStateToProps = ({registerfillwizard}) => {
    return {...registerfillwizard};
}
RegisterFillWizardForm = connect(mapStateToProps)(RegisterFillWizardForm);
export default RegisterFillWizardForm;
