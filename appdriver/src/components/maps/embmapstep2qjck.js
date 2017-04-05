import React from 'react';
import { connect } from 'react-redux';
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
  onClickNext(btnname){
    this.props.onClickNext(btnname);
  }
  render() {
      let routeshow = this.props.driveroute;
      let curreqobj = this.props.currentrequest;
      let btnco;
      if(curreqobj.requeststatus === '已取消'){
            return (<div>已取消</div>);
      }
      btnco=(<div className="item item-linked xjl_bottom">
        <a>
        <div className="item-media"><span className="icon icon-jld text-warning"></span></div>
        <div className="item-main">
          <h3 className="item-title text-warning">{routeshow.instruction}<div className="gray">{routeshow.leftdistancetxt} {routeshow.leftduringtxt}</div></h3>
          <div className="item-after"><button onClick={this.onClickNext.bind(this,'到达乘客位置')} className="btn">到达乘客位置</button></div>
          <div className="item-after"><button onClick={this.props.onClickCancel} className="btn">取消</button></div>
        </div>
        </a>
        </div>);

      return (
             <Container>
          			 <div className="relative">
          			 <MapGaode ref='mapgaode'  curreqobj={curreqobj} />
                          <div target="_blank" className="item item-content xjl_top">
                            <div className="item-media"><img width="50" src="images/user.jpg" className="radius50" alt='img'/></div>
                            <div className="item-main">
                              <div className="cfd_icon">{curreqobj.srcaddress.addressname}</div>
                              <div className="zd_icon">{curreqobj.dstaddress.addressname}</div>
                            </div>
                            <img src="images/dh.png" alt="img" style={{width:"40px"}}/> </div>
          	  </div>
              {btnco}
             </Container>);
    }

    }
