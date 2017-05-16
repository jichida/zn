import React from 'react';
import {
  Container,
} from 'amazeui-touch';
import MapGaode from './mapcar.js';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
  }

  onClickTripover(){

  }
  render() {

      const {driveroute:routeshow,currentrequest:curreqobj,currentorder:currentorder,onClickNext} = this.props;
      const {resultpricedetail} = curreqobj;

      if(curreqobj.requeststatus === '已取消'){
        return (<div>已取消</div>);
      }
      console.log("curreqobj==>"  + JSON.stringify(curreqobj));
  return (
    <Container>
		<div className="relative">
      <div style={{height:"200px",overflow:"hidden"}}><MapGaode ref='mapgaode'  curreqobj={curreqobj} currentorder={currentorder}/></div>
                <div className="item item-content borderless xjl_top box_show"><div className="item-media"><span className="icon icon-tz text-primary"></span></div>
                <div className="item-main">行程开始，祝您一路好心情</div>
                </div>
      <div className="container container-fill container-scrollable">
      </div>
	  </div>
      <div className="item item-linked xjl_bottom"><a>
      <div className="item-media"><span className="icon icon-jld text-warning"></span></div>
      <div className="item-main"><h3 className="item-title text-warning">全程大约{resultpricedetail.totalkm}公里 耗时{resultpricedetail.totalduringminute}分钟</h3>
      <div className="item-after">
      <button onClick={onClickNext} className="btn">到目的地</button></div></div>
      </a>
      </div>
      </Container>
    );
  }
  }
