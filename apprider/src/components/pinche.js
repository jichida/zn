import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
} from 'amazeui-touch';
//import 'react-mobile-datepicker/lib/index.css';
import DatePicker from 'react-mobile-datepicker';
import config from '../config.js';
import {ui_pinchesetdateshow,ui_clickpinchetypebtn,
    getbuscarpoolcitylist_request,getbuscarpool_request,
    orderconfirm_setpinche} from '../actions';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import moment from 'moment';
import objectPath from 'object-path';
/*
{
begincityselid:xxx,
endcityselid:xxx,
searchdatesel:xxx
}
*/

let renderPincheQueryForm = (fields)=>{
  const {isquerydateshow,
    citylist,dispatch} = fields;

  let begincitylistco = [];
  let endcitylistco = [];
  citylist.forEach((cityname,index)=>{
    begincitylistco.push(
      <option key={"begincity_"+index } value={cityname}>
      {cityname}</option>);
    endcitylistco.push(
      <option key={"endcity_"+index } value={cityname} >
        {cityname}</option>);
  });

  let yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  let handleSelect=(time)=> {
    dispatch(ui_pinchesetdateshow(false));
    fields.searchdatesel.input.onChange(time);
  }
  let handleCancel=()=>{
    dispatch(ui_pinchesetdateshow(false));
  }
  let handleShow=()=>{
    dispatch(ui_pinchesetdateshow(true));
  }
  let changeHandler=(keyname,event)=>{
    fields[keyname].input.onChange(event.target.value);
  }


    let begincityselid = fields.begincityselid.input.value;
    let endcityselid = fields.endcityselid.input.value;
    if(begincityselid === ''){
        begincityselid=citylist.length>0?citylist[0]:'';
        if(begincityselid !== ''){
            window.setTimeout(()=>{
                fields.begincityselid.input.onChange(begincityselid);
            },0);

        }
    }
    if(endcityselid === ''){
        endcityselid=citylist.length>1?citylist[1]:begincityselid;
        if(endcityselid !== ''){
            window.setTimeout(()=>{
                fields.endcityselid.input.onChange(endcityselid);
            },0);

        }
    }
    // let model = objectPath(form);
    // begincityselid = model.get("pinche.values.begincityselid",begincityselid);
    // endcityselid= model.get("pinche.values.endcityselid",endcityselid);

  return (<ul>
      <li className="item item-input padding-0 ">
        <div className="item-main">
        <label className="field-container"><span className="field-label cfd_icon"> 起始地 </span>
            <select className="borderless pl_pr margin-0 text-right"
            value={begincityselid}  onChange={(e)=>{changeHandler('begincityselid',e);}}>
            {begincitylistco}
            </select>
         </label>
        </div>
        </li>
        <li className="item item-input padding-0 ">
          <div className="item-main">
            <label className="field-container"><span className="field-label zd_icon">目的地</span>

              <select className="borderless pl_pr margin-0 text-right"
                value={endcityselid}  onChange={(e)=>{changeHandler('endcityselid',e);}}>
                {endcitylistco}
              </select>
            </label>
          </div>
        </li>
      <li  className="item item-input padding-0">
      <div className="item-main" onClick={handleShow}>
        <label className="field-container"><span className="field-label time_icon">出发日期</span>
          <span className="p10">{moment(fields.searchdatesel.input.value).format('YYYY年MM月DD日')}
        <DatePicker
          value={fields.isquerydateshow.value}
          isOpen={isquerydateshow}
          onSelect={handleSelect}
          onCancel={handleCancel}
          min={yesterdayDate}
          dateFormat={['YYYY年', 'MM月', 'DD日']}
          /></span>
           </label>
      </div>
    </li>
  </ul>);

}

const mapStateToProps1 = ({pinche,appui}) => {
    return {...pinche,...appui.pinche};
}

renderPincheQueryForm = connect(mapStateToProps1)(renderPincheQueryForm);

let renderPincheTypeField = (field)=>{
  let {dispatch,input:{value,onChange}} = field;
  let tabtitle = ['专线拼车','人气团拼'];
  let onClickTabbtn =(newvalue)=>{
    onChange(tabtitle[newvalue]);
    dispatch(ui_clickpinchetypebtn(newvalue));
  }
  let btn0,btn1;
  if(value === 0){
    btn0 = <button className="btn btn-sm btn-primary btn-hollow radius_l active">{tabtitle[0]}</button>;
  }
  else{
    btn0 = <button onClick={()=>{onClickTabbtn(0);}} className="btn btn-sm btn-primary btn-hollow radius_l">{tabtitle[0]}</button>;
  }

  if(value === 1){
    btn1 = <button className="btn btn-sm btn-primary btn-hollow radius_r active">{tabtitle[1]}</button>;
  }
  else{
    btn1 = <button onClick={()=>{onClickTabbtn(1);}}  className="btn btn-sm btn-primary btn-hollow radius_r">{tabtitle[1]}</button>;
  }
  return (
      <div className="group margin-0">
        <div className="group-body background">
          <div className="tabs-nav btn-group btn-group-justify">
            {btn0}
            {btn1}
          </div>
        </div>
      </div>
  );
}
renderPincheTypeField = connect()(renderPincheTypeField);

let PincheQueryForm = (props)=>{
  let {handleSubmit,onClickQuery} = props;
  return (<Form onSubmit={handleSubmit(onClickQuery)}>
        <Field name='pinchetype' component={renderPincheTypeField}/>
        <div className="index_ul">
            <div className="relative">
            <span className="icon icon-wf index_poastion"></span>
            </div>
            <Fields names={[ 'begincityselid', 'endcityselid', 'searchdatesel']} component={renderPincheQueryForm}/>

           <button className="btn btn-primary btn-block margin-bottom-0 margin-top">查询</button>

        </div>
        </Form>);
};


const validate = values => {
    const errors = {}
    if (!values.begincityselid || values.begincityselid === '') {
        errors.begincityselid = '必须选择出发城市';
    }
    if (!values.endcityselid || values.endcityselid === '') {
        errors.endcityselid = '必须选择目的城市';
    }
    return errors;
}

PincheQueryForm = reduxForm({
    form: 'pinche',
    validate,
    initialValues:{
        begincityselid: '',
        endcityselid: '',
        searchdatesel: new Date(),
        pinchetype: 0
    }
})(PincheQueryForm);

 class Pinche extends React.Component {

  componentWillMount () {
    this.props.dispatch(getbuscarpoolcitylist_request());
    //this.onClickQuery();
  }
  onClickQuery(values){//少出发日期
      let tabtitle = ['专线','人气团拼'];
      let querydata = {
          startcity:values.begincityselid,
          endcity:values.endcityselid,
          pinchetype:tabtitle[values.pinchetype],
          startdate:values.searchdatesel
      };
      this.props.dispatch(getbuscarpool_request(querydata));
  }
  onClickPage(name,routeobj){
      //-------------------------
      this.props.dispatch(orderconfirm_setpinche(routeobj));
      this.props.history.push(name);
  }
     // shouldComponentUpdate(nextProps){
     //     if(nextProps.begincityselid === '' || nextProps.endcityselid === ''){
     //         console.log("初始化还不需要更新呢!!!");
     //         return false;
     //     }
     //     console.log("需要更新呢!!!");
     //     console.log("nextProps:" + JSON.stringify(nextProps));
     //     console.log("thisProps:" + JSON.stringify(this.props));
     //     return true;
     // }
  render() {
      console.log("render Pinche again!!!");
    let resultrouteco = [];
    let index =0;
    let tabtitle = ['专线','人气团拼'];
    this.props.resultroute.forEach((routeobj)=>{
        index++;
        if(tabtitle[this.props.pinchetypetabbtn] === routeobj.pinchetype ){
        resultrouteco.push(
        <li className="item item-linked" key={index}><a>
          <div>{routeobj.startcity}——{routeobj.endcity}
            <p className="text-warning margin-top-0">剩余{routeobj.seatnumber-routeobj.takennumber}座</p>
          </div>
          <div>{routeobj.starttime}</div>
          <div>
            <button onClick={this.onClickPage.bind(this,'/orderconfirm/pinche',routeobj)} className="btn btn-primary radius5">出行</button>
          </div>
          </a> </li>);
        }
      });



    return (<Container scrollable={true} fill={false}>
                <PincheQueryForm onClickQuery={this.onClickQuery.bind(this)}/>
                <div className="group group-no-padded">
                  <div className="group-body">
                    <ul className="list">
                      {resultrouteco}
                    </ul>
                  </div>
                </div>
        </Container>);
  }
}

const mapStateToProps = ({pinche,appui}) => {

    return {...pinche,...appui.pinche};
}
export default connect(
  mapStateToProps,
)(Pinche);
