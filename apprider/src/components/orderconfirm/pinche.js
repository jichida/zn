import React from 'react';
import {
    Group,
    List,
    Col,
    Grid
} from 'amazeui-touch';
import moment from 'moment';
import {orderconfirm_selpinchestation} from '../../actions';

const OrderToPayDetail = (props) => {
    let changeHandler =(keyname,event)=>{
        let obj = {};
        obj[keyname] = event.target.value;
        props.dispatch(orderconfirm_selpinchestation(obj));
    }

    let stationsnamestartco = [];
    props.startstations.forEach((stationobj)=>{
        stationsnamestartco.push(<option key={stationobj} value={stationobj}>{stationobj}</option>);
    });
    let stationsnameendco = [];
    props.endstations.forEach((stationobj)=>{
        stationsnameendco.push(<option key={stationobj} value={stationobj}>{stationobj}</option>);
    })
    const selectctlstationstartco =
        (
            <select className="borderless pl_pr margin-0 text-right"
                    value={props.beginstation}  onChange={(e)=>{changeHandler('beginstation',e);}}>
                {stationsnamestartco}
            </select>
        );
    const selectctlstationendco =
        (
            <select className="borderless pl_pr margin-0 text-right"
                    value={props.endstation} onChange={(e)=>{changeHandler('endstation',e);}}>
                {stationsnameendco}
            </select>
        );



    let startdate = new Date();
    if(props.hasOwnProperty('startdate')){
        startdate = props.startdate;
    }
    if (typeof startdate === 'string') {
        startdate = new Date(Date.parse(startdate));
    }
    let startdatestring = moment(startdate).format("MM月DD日 HH时mm分");

    const textblue = (<div className="text-primary">{startdatestring} </div>);
    const textblueprice = (<div className="text-primary">{props.orderprice}</div>);

    return (<div>
            <div  className="bule_bg">
                <Grid className="text-center">
                    <Col className="col-center">{props.startcity}</Col>
                    <Col>
                        <div  className="bule-bg radius50 text-center icon icon-left-nav">
                        </div>
                    </Col>
                    <Col className="col-center">{props.endcity}</Col>
                </Grid>
                <p className="text-center">剩余{props.seatnumber-props.takennumber}座</p>
            </div>
            <Group noPadded>
                <List>
                    <List.Item after={textblue} title="出行时间" />
                    <List.Item after={selectctlstationstartco}  title="上车地点" />
                    <List.Item after={selectctlstationendco}  title="到站地点" />
                    <List.Item after={textblueprice} title="支付价格" />
                </List>
            </Group>
        </div>
    );
}



export default OrderToPayDetail;
