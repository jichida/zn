import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../tools/nav.js';
import MapGaode from './mapcar.js';
import PageRiderHead from './pageriderheader';

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
        const {driveroute:routeshow,currentrequest:curreqobj,currentorder,onClickCancel} = this.props;
        //curreqobj.requeststatus
        return (
            <div className="outcarPage AppPage">
                <NavBar
                    back={false}
                    title="等待乘客上车"
                    rightnav={[{
                        text:"取消订单",
                        type:"action",
                        action:onClickCancel
                    }]}
                />
                <PageRiderHead currentorder={currentorder}/>
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
