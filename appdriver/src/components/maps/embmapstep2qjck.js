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
        //urreqobj.requeststatus 
        return (
            <div className="outcarPage AppPage">
                <NavBar 
                    back={true} 
                    title="接乘客" 
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
                    <h3 className="item-title text-warning">{routeshow.instruction}<div className="gray">{routeshow.leftdistancetxt} {routeshow.leftduringtxt}</div></h3>
                    <button onClick={this.onClickNext.bind(this,'')} className="btn Primary">到达叫车位置</button>
                </div>
            </div>
        );
    }
}
