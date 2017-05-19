import React from 'react';
import {
  Group,
  List,
  Col,
  Grid
} from 'amazeui-touch';
import moment from 'moment';

const OrderToPayDetail = (props) => {
  if(!props.hasOwnProperty('orderinfo')){
    return (<div>无效订单</div>);
  }
  let {orderinfo} = props;
  let startdate = new Date();
  if(orderinfo.hasOwnProperty('startdate')){
    startdate = orderinfo.startdate;
  }
  let startdatestring = moment(startdate).format("YYYY-MM-DD");

  const textblue = (<div className="text-primary">{startdatestring} {orderinfo.starttime}</div>);
  const textblueprice = (<div className="text-primary">{orderinfo.orderprice}</div>);
  const startstation = (<div className="text-primary">{orderinfo.startstation}</div>);
  const endstation = (<div className="text-primary">{orderinfo.endstation}</div>);

  return (<div>
              <div  className="bule_bg">
               <Grid className="text-center">
               <Col className="col-center">{orderinfo.startcity}</Col>
               <Col>
               <div  className="bule-bg radius50 text-center icon icon-left-nav">
               </div>
               </Col>
               <Col className="col-center">{orderinfo.endcity}</Col>
               </Grid>
               </div>
			    <Group noPadded>
               <List>
               <List.Item after={textblue} title="出行时间" />
               <List.Item after={startstation}  title="上车地点" />
               <List.Item after={endstation}  title="到站地点" />
               <List.Item after={textblueprice} title="支付价格" />
               </List>
               </Group>
			   </div>);
}



export default OrderToPayDetail;
