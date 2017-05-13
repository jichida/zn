import React from 'react';
import {
  Container,
  View,Button
} from 'amazeui-touch';
import MapGaode from './mapcar.js';
import {getdistance} from '../../util/geo.js';


export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
  }
  render() {
      let curreqobj = this.props.currentrequest;
      if(curreqobj.requeststatus === '已取消'){
        return (<div>已取消</div>);
      }
      console.log("curreqobj==>"  + JSON.stringify(curreqobj));
      return (
           <Container>
          <div style={{height:"200px",overflow:"hidden"}}><MapGaode ref='mapgaode'  curreqobj={curreqobj} /></div>
          <div className="list margin-0 xjl_bottom">
          <div className="item">
                    <div>{curreqobj.showtimestring}</div>
                    <div className="item-after"><span className="icon icon-jl fize18"></span>
                      距离乘客:{getdistance([this.props.curlocation.lng,this.props.curlocation.lat],[curreqobj.srcaddress.location.lng,curreqobj.srcaddress.location.lat])}
                    </div>
                  </div>
            <div className="item item-linked item-content"> <a>
              <div className="item-media"><img width="50" src="images/user.jpg" className="radius50" alt='img'/></div>
              <div className="item-main">
                <div className="cfd_icon">{curreqobj.srcaddress.addressname}</div>
                <div className="zd_icon">{curreqobj.dstaddress.addressname}</div>
              </div>
      <img src="images/dh.png" alt="img" style={{width:"40px"}}/></a> </div>
      <Button onClick={this.props.onClickNext} amStyle="primary" block className="margin-0">去接乘客</Button>
      <Button onClick={this.props.onClickCancel} amStyle="primary" block className="margin-0">取消</Button>
          </div>

    </Container>
  );
}


}
