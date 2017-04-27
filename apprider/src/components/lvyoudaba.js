import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-mobile-datepicker';
import config from '../config.js';
import {
  Button
} from 'amazeui-touch';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import moment from 'moment';
import {ui_lvyoudabasetdateshow1,ui_lvyoudabasetdateshow2,orderconfirm_settourbus} from '../actions';
import objectPath from 'object-path';


const Tourbusco = (props) => {
  const {businfo,onClickBusAdd,onClickBusDec,curnumber,onChangeBusinput} = props;
  console.log("Tourbusco render:----->" + curnumber);
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
              <button key={'bus0' + businfo._id} onClick={onClickBusDec} className="mui-btn mui-btn-numbox-minus"
                      type="button">-
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

let renderTourbusForm = (props)=>{
  //'rentusername', 'busnumberobj', 'startdate', 'enddate', 'orderdetail', 'orderprice'
  const {buslist,isstartdateopen,isenddateopen,
    rentusername,busnumberobj,
    startdate,enddate,orderdetail,orderprice,frontmoney,
    paytourbus,
    dispatch} = props;

    let busnumberobjv = {...busnumberobj.input.value};
    buslist.forEach((businfo)=>{
        if(!busnumberobjv.hasOwnProperty(businfo._id)){
            busnumberobjv[businfo._id] = 0;
        }
    });
    let gettotalprice = ()=>{
      let totalprice = 0;
      let days = enddate.input.value.getDate() - startdate.input.value.getDate() + 1;
      buslist.forEach((businfo)=>{
        totalprice += (busnumberobjv[businfo._id]*businfo.priceperday*days);
      });
      return totalprice;
    }
    let onClickBusAdd=(businfo)=>{
      busnumberobjv[businfo._id] = busnumberobjv[businfo._id] +1;
      let price = gettotalprice();
      busnumberobj.input.onChange({...busnumberobjv});
      orderprice.input.onChange(price);
               
      let frontmoneyf = (price*paytourbus/100).toFixed(2);
      frontmoneyf = parseFloat(frontmoneyf);
      frontmoney.input.onChange(frontmoneyf);
    }
    let onClickBusDec=(businfo)=>{
      if(busnumberobjv[businfo._id] > 0){
        busnumberobjv[businfo._id] = busnumberobjv[businfo._id] - 1;
        let price = gettotalprice();
        busnumberobj.input.onChange({...busnumberobjv});
        orderprice.input.onChange(price);
      
        let frontmoneyf = (price*paytourbus/100).toFixed(2);
        frontmoneyf = parseFloat(frontmoneyf);
        frontmoney.input.onChange(frontmoneyf);
      }
    }
    let onChangeBusinput=(businfo,e)=>{
      let value = e.target.value;
      try{
        value = parseInt(value,10);
        if(value >= 0){
          busnumberobjv[businfo._id] = value;
          let price = gettotalprice();
          busnumberobj.input.onChange({...busnumberobjv});
          orderprice.input.onChange(price);

          let frontmoneyf = (price*paytourbus/100).toFixed(2);
          frontmoneyf = parseFloat(frontmoneyf);
          frontmoney.input.onChange(frontmoneyf);
        }
      }
      catch(e){

      }
    }
    let buslistco = [];
    buslist.forEach((businfo)=>{
      buslistco.push(<Tourbusco key={businfo._id}
        businfo={businfo} onClickBusAdd={()=>onClickBusAdd(businfo)}
      onClickBusDec={()=>onClickBusDec(businfo)}
      curnumber={busnumberobjv[businfo._id]}
      onChangeBusinput={(e)=>onChangeBusinput(businfo,e)} />);
    });


    let yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    let minEndDate = new Date();
    minEndDate.setDate(startdate.input.value.getDate() - 1);

    let handleClick1 =()=>{
      dispatch(ui_lvyoudabasetdateshow1(true));
    };
    let handleClick2 =()=>{
      dispatch(ui_lvyoudabasetdateshow2(true));
    };
    let handleSelect1=(time)=>{
      startdate.input.onChange(time);
      dispatch(ui_lvyoudabasetdateshow1(false));
    };
    let handleCancel1=()=>{
      dispatch(ui_lvyoudabasetdateshow1(false));
    }
    let handleSelect2=(time)=>{
      enddate.input.onChange(time);
      dispatch(ui_lvyoudabasetdateshow2(false));
    };
    let handleCancel2=()=>{
      dispatch(ui_lvyoudabasetdateshow2(false));
    }
    return (
          <div style={{marginTop: '1.5em'}}>
            <div className="group group-no-padded margin-0">
              <div className="group-body">
                <ul className="list">
                  <li className="item item-input">
                    <div className="item-main">
                      <label className="field-container"><span className="field-label">租车人</span>
                        <input type="text" icon="person" placeholder="请输入您的姓名" className="field"
                            {...rentusername.input} />
                      </label>
                    </div>
                  </li>
                  <li className="item item-input" onClick={handleClick1}>
                    <div className="item-main">
                      <label className="field-container"><span className="field-label">用车时间</span>
                        <span>{moment(startdate.input.value).format("YYYY-MM-DD")}
                          <DatePicker
                              value={startdate.input.value}
                              isOpen={isstartdateopen}
                              onSelect={handleSelect1}
                              onCancel={handleCancel1}
                              min={yesterdayDate}
                              dateFormat={['YYYY年', 'MM月', 'DD日']}
                          /></span>
                      </label>
                    </div>
                  </li>
                  <li className="item item-input" onClick={handleClick2}>
                    <div className="item-main">
                      <label className="field-container"><span className="field-label">还车时间</span>
                        <span>{moment(enddate.input.value).format("YYYY-MM-DD")}
                          <DatePicker
                              value={enddate.input.value}
                              isOpen={isenddateopen}
                              onSelect={handleSelect2}
                              onCancel={handleCancel2}
                              dateFormat={['YYYY年', 'MM月', 'DD日']}
                              min={minEndDate}
                          /></span>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="group group-no-padded margin-top-0 background">
              <div className="group-body background">
                <div className="g text-center padding xzcx">

                  {buslistco}

                </div>
              </div>
            </div>
          </div>
    );
};
const mapStateToProps1 = ({appui,lvyoudaba,app:{paytourbus}}) => {
  return {...lvyoudaba,...appui.lvyoudaba,paytourbus};
}
renderTourbusForm = connect(mapStateToProps1)(renderTourbusForm);

let TourbusForm = (props)=>{
  let onClickOK =(values)=>{
    props.dispatch(orderconfirm_settourbus(values));
    props.history.push('/orderconfirm/tourbus');
    console.log("ok:" + JSON.stringify(values));
  }
  let {handleSubmit,totalprice,paytourbus} = props;
  let frontmoney = (totalprice*paytourbus/100).toFixed(2);
  return (
      <Form onSubmit={handleSubmit(onClickOK)}>
          <div>
            <div style={{marginTop: '1.5em'}}>
            <Fields names={['rentusername', 'busnumberobj', 'startdate', 'enddate', 'orderdetail', 'orderprice','frontmoney']}
                    component={renderTourbusForm}/>
            <div className="item item-input">
              <div className="item-main">
                <p>需支付{paytourbus}%费用<span className="text-primary">{frontmoney}</span></p>
              </div>
            </div>
            <div className="padding">
              <Button amStyle="primary" block>
                确认
              </Button>
            </div>

            </div>
          </div>
      </Form>
  );
};
const mapStateToProps2 = ({form,app:{paytourbus}}) => {
  let model = objectPath(form);
  let totalprice = model.get("tourbus.values.orderprice",0);
  return {totalprice,paytourbus};
}
TourbusForm = connect(mapStateToProps2)(TourbusForm);

const validate = values => {
  const errors = {}
  if (values.orderprice === 0.0) {
    errors.orderprice = '请选择旅游大巴数量';
  }
  return errors;
}
TourbusForm = reduxForm({
  form: 'tourbus',
  validate,
  initialValues:{
    rentusername:'',
    busnumberobj:{},
    startdate:new Date(),
    enddate:new Date(),
    orderdetail:'',
    orderprice:0,
    frontmoney:0
  }
})(TourbusForm);


export default TourbusForm;
