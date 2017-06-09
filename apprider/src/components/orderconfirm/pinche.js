import React from 'react';
import moment from 'moment';
import {
  orderconfirm_selpinchestation,
  orderconfirm_setpincheseatnumber
} from '../../actions';
import "../../../public/newcss/pinche.css";
import _ from "lodash";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const {
    CellBody,
    CellHeader,
    Form,
    FormCell,
    Label,
    Select
    } = WeUI;

const OrderToPayDetail = (props) => {
    let changeHandler =(keyname,event)=>{
        let value = event.target.value;
        if(keyname === 'orderseatnumber'){
          value = parseInt(value,10);
          props.dispatch(orderconfirm_setpincheseatnumber(value));
        }
        else{
          let obj = {};
          obj[keyname] = value;
          props.dispatch(orderconfirm_selpinchestation(obj));
        }
    }
    let startdate = new Date();
    if(props.hasOwnProperty('startdate')){
        startdate = props.startdate;
    }
    if (typeof startdate === 'string') {
        startdate = new Date(Date.parse(startdate));
    }
    let startdatestring = moment(startdate).format("MM月DD日");
    let newstartstations = _.map(props.startstations, (startstation,index)=>{
        return {value:startstation ,label:startstation }
    });
    let newendstations = _.map(props.endstations, (endstation,index)=>{
        return {value:endstation ,label:endstation }
    });
    //<------------
    const {carpoolstationtime,groupnumber,seatnumbertotal,starttime} = props;
    let timedetail = [];
    _.map(carpoolstationtime,(starttime,stationname)=>{
      timedetail.push({starttime,stationname});
    });
    timedetail = _.sortBy(timedetail, ['starttime']);

    let takennumbersz = [];
    for(let i = 0;i < groupnumber - seatnumbertotal ; i++ ){
      takennumbersz.push({value:i+1 ,label:`${i+1}人` });
    }
    return (
        <div className="orderconfirmPinchePage">
            <div className="head">
                <div className="time">{startdatestring}</div>
                <div className="city">
                    <span>{props.startcity}</span>
                    <span className="line"></span>
                    <span>{props.endcity}</span>
                </div>
                <div className="time">{starttime}</div>
                <div className="lastnum">{groupnumber}人成团</div>
            </div>
            <div className="pageForm formStyle1">
              站点详情
              {
                _.map(timedetail,(item,i)=>{
                  return (<div key={i}>{item.starttime} 到达 {item.stationname}</div>)
                })
              }
            </div>
            <div className="pageForm formStyle1">
                <Form>
                    <FormCell select selectPos="after">
                        <CellHeader>
                            <Label>上车地点</Label>
                        </CellHeader>
                        <CellBody>
                            <Select
                                onChange={(e)=>{changeHandler('beginstation',e)}}
                                data={newstartstations} />
                        </CellBody>
                    </FormCell>
                    <FormCell select selectPos="after">
                        <CellHeader>
                            <Label>到站地点</Label>
                        </CellHeader>
                        <CellBody>
                            <Select
                                onChange={(e)=>{changeHandler('endstation',e)}}
                                data={newendstations} />
                        </CellBody>
                    </FormCell>
                    <FormCell select selectPos="after">
                        <CellHeader>
                            <Label>乘客人数</Label>
                        </CellHeader>
                        <CellBody>
                            <Select
                                onChange={(e)=>{changeHandler('orderseatnumber',e)}}
                                data={takennumbersz} />
                        </CellBody>
                    </FormCell>
                </Form>
                <div>{groupnumber}人成团 {seatnumbertotal}人参与</div>
                <div>参团结果会以短信形式发送到你手机上，请注意查收!</div>
            </div>
        </div>
    );
}
export default OrderToPayDetail;
