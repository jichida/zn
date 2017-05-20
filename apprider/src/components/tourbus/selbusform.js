import React from 'react';
import { connect } from 'react-redux';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import validate from './validate';
import _ from 'lodash';

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


let renderTourbusForm = (props)=>{
  //'rentusername', 'busnumberobj', 'startdate', 'enddate', 'orderdetail', 'orderprice'
  const {buslist,busnumberobj,orderprice} = props;
    let busnumberobjv = {...busnumberobj.input.value};
    _.map(buslist,(businfo)=>{
        if(!busnumberobjv.hasOwnProperty(businfo._id)){
            busnumberobjv[businfo._id] = 0;
        }
    });
    let changeprice = ()=>{
      let totalprice = 0;
      let days = 1;
      _.map(buslist,(businfo)=>{
        totalprice += (busnumberobjv[businfo._id]*businfo.priceperday*days);
      });
      busnumberobj.input.onChange({...busnumberobjv});
      orderprice.input.onChange(totalprice);
    }
    let onClickBusAdd=(businfo)=>{
      busnumberobjv[businfo._id] = busnumberobjv[businfo._id] +1;
      changeprice();
    }
    let onClickBusDec=(businfo)=>{
      if(busnumberobjv[businfo._id] > 0){
        busnumberobjv[businfo._id] = busnumberobjv[businfo._id] - 1;
        changeprice();;
      }
    }
    let onChangeBusinput=(businfo,e)=>{
      let value = e.target.value;
      try{
        value = parseInt(value,10);
        if(value >= 0){
          busnumberobjv[businfo._id] = value;
          changeprice();
        }
      }
      catch(e){

      }
    }

    return (
                <div className="g text-center padding xzcx">
                  {
                    _.map(buslist,(businfo)=>{
                      return (<Tourbusco key={businfo._id}
                          businfo={businfo}
                          onClickBusAdd={()=>onClickBusAdd(businfo)}
                          onClickBusDec={()=>onClickBusDec(businfo)}
                          curnumber={busnumberobjv[businfo._id]}
                          onChangeBusinput={(e)=>onChangeBusinput(businfo,e)}
                      />)
                    })
                  }

                </div>

    );
};

const mapStateToProps1 = ({lvyoudaba:{buslist}}) => {
  return {buslist};
}
renderTourbusForm = connect(mapStateToProps1)(renderTourbusForm);


const renderOrderpriceField = (field) => (
  <div className="item item-input">
    <div className="item-main">
      <p>需支付{field.input.value}/天
      <span className="text-primary" onClick={field.onClickOK}>下一步</span>
      </p>
    </div>
  </div>
  )

let TourbusForm = (props)=>{
  const {history} = props;

  let onClickOK =()=>{
    console.log("onClickOK");
    history.push('/tourbusfillform');
  }
  return (
      <Form >
          <div>
            <div style={{marginTop: '1.5em'}}>
            <Fields names={['busnumberobj','orderprice']} component={renderTourbusForm}/>
            <Field name="orderprice" component={renderOrderpriceField} onClickOK={onClickOK}/>
            </div>
          </div>
      </Form>
  );
};

TourbusForm = connect()(TourbusForm);

export default reduxForm({
  form: 'tourbus',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate,
  initialValues:{
    busnumberobj:{},
    orderprice:0,
  }
})(TourbusForm)
