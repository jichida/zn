import React from 'react';
import { connect } from 'react-redux';

import MapGaode from './mapcar.js';
import '../../../public/newcss/outcar.css';
import NavBar from '../tools/nav.js';

import {acceptrequest_request} from '../../actions';
import {
  getdistance,
  getcurrentlocationfn
} from '../../util/geo.js';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount () {
    }

    onClickOK(){
        let updatedrequest = {
            _id:this.props.selrequest._id,
        };
        getcurrentlocationfn((locz)=>{
             if(locz[0] !== 0 && locz[1] !== 0){
               updatedrequest.driverlocation = locz;
               this.props.dispatch(acceptrequest_request(updatedrequest));
             }
        });

    }
    render() {
      let curreqobj = this.props.selrequest;
      let resultpricedetail;
      let triptypename;
      let showqdbtn;
      if(!!curreqobj){
        resultpricedetail = curreqobj.resultpricedetail;
        triptypename = curreqobj.isrealtime?'实时':'预约';
        showqdbtn = curreqobj.requeststatus === '请求中';
      }
      return (
          <div className="outcarPage AppPage">
              <NavBar back={true} title="抢单" />
              {
                !!curreqobj &&
                <div className="orderinfohead">
                    <img src="newimg/17.png" className="avatar"/>
                    <div className="address">
                        <div className="orderprice">全程约: <span className="color_warning">{resultpricedetail.totalkm}公里</span></div>
                        <div className="orderprice">预计费用: <span className="color_warning">￥{resultpricedetail.totalprice}元</span></div>
                        <div className="startaddress">{curreqobj.srcaddress.addressname}</div>
                        <div className="endaddress">{curreqobj.dstaddress.addressname}</div>
                    </div>
                    <span
                        className="qiangdanLnk"
                        onClick={this.onClickOK.bind(this)}
                        >抢单</span>
                </div>
              }

              {
                  !!curreqobj &&
                <div className="mapcontent list">
                    <MapGaode ref='mapgaode' curreqobj={curreqobj} />
                </div>
              }
          </div>
      );
  }
}



const mapStateToProps = ({operate},props) => {
  let requests = operate.nearbyrequests.requests;
  let selrequest = requests[props.match.params.requestid];
  let curlocation = operate.curlocation;
  return {selrequest,curlocation};
}

export default connect(
  mapStateToProps,
)(Page);
