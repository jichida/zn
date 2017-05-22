import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../tools/nav.js';
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
        const {driveroute:routeshow,currentrequest:curreqobj,onClickCancel} = this.props;
        //curreqobj.requeststatus
        return (
            <div className="outcarPage AppPage">
                <NavBar 
                    back={true} 
                    title="等待乘客上车" 
                    rightnav={[{
                        text:"取消订单",
                        type:"action",
                        action:onClickCancel
                    }]}
                />
                <div className="orderinfohead">
                    <img src="newimg/17.png" className="avatar"/>
                    <div className="address">
                        <div className="startaddress">{curreqobj.srcaddress.addressname}</div>
                        <div className="endaddress">{curreqobj.dstaddress.addressname}</div>
                    </div>
                </div>
                <div className="mapcontent list">
                    <MapGaode ref='mapgaode'  curreqobj={curreqobj} />
                </div>
                <div className="submitBtn">
                    <button onClick={this.onClickNext.bind(this,'接到乘客')} className="btn Primary">开始行程</button>
                </div>
            </div>
        );
    }
}
