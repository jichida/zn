import React from 'react';
import moment from 'moment';
import {orderconfirm_selpinchestation} from '../../actions';
import "../../../public/newcss/pinche.css";
import NavBar from "../tools/nav.js";
import _ from "lodash";
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    CellsTitle,
    Form,
    FormCell,
    Label,
    Input,
    Select
    } = WeUI;

const OrderToPayDetail = (props) => {
    let changeHandler =(keyname,event)=>{
        let obj = {};
        obj[keyname] = event.target.value;
        props.dispatch(orderconfirm_selpinchestation(obj));
    }
    let startdate = new Date();
    if(props.hasOwnProperty('startdate')){
        startdate = props.startdate;
    }
    if (typeof startdate === 'string') {
        startdate = new Date(Date.parse(startdate));
    }
    let startdatestring = moment(startdate).format("MM月DD日 HH时mm分");
    let newstartstations = _.map(props.startstations, (startstation,index)=>{
        return {value:startstation ,label:startstation }
    });
    let newendstations = _.map(props.endstations, (endstation,index)=>{
        return {value:endstation ,label:endstation }
    });
    return (
        <div className="orderconfirmPinchePage">
            <div className="head">
                <div className="time">{startdatestring}</div>
                <div className="city">
                    <span>{props.startcity}</span>
                    <span className="line"></span>
                    <span>{props.endcity}</span>
                </div>
                <div className="lastnum">剩余{props.seatnumber-props.seatnumbertotal}座</div>
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
                </Form>
            </div>
        </div>
    );
}
export default OrderToPayDetail;
