import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {getdistance} from '../util/geo';
import {selrequest} from '../actions';

export class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
  }
  onClickReq(reqobj){
    this.props.dispatch(selrequest(reqobj));
    this.props.history.push(`/selrequest/${reqobj._id}`);
  }
  componentWillUnmount(){
//    stoplocationrequest();
  }
  render() {
      let requestlistco = [];
      const {nearbyrequestslist,requests} = this.props;
      nearbyrequestslist.forEach((requestid)=>{
        let reqobj = requests[requestid];
        let triptypename = reqobj.isrealtime?'实时':'预约';
        requestlistco.push(<div key={reqobj._id} onClick={this.onClickReq.bind(this,reqobj)} className="item item-linked item-content"><a>
          <div className="item-main">
            <li className="padding-bottom">
              <div className="item-title-row">
                <div><span className="badge badge-success margin-8 radius35">{triptypename}</span>{reqobj.showtimestring}<span className="dd_lx_b">快</span></div>
                <div className="item-after"><span className="icon icon-jl fize18"></span>
                {getdistance([this.props.curlocation.lng,this.props.curlocation.lat],[reqobj.srcaddress.location.lng,reqobj.srcaddress.location.lat])}
                </div>
              </div>
            </li>
            <div className="relative">
              <li className="padding-bottom">
                <div className="item-main cfd_icon"> {reqobj.srcaddress.addressname} </div>
              </li>
              <li className="padding-bottom">
                <div className="item-main zd_icon"> {reqobj.dstaddress.addressname} </div>
              </li>
            </div>
          </div>
          </a> </div>);
      });


  return(
          <div className="list margin-0">
            {requestlistco}
          </div>

  );
}
}


const mapStateToProps = ({appui,operate}) => {
  let nearbyrequestslist = operate.nearbyrequests.list;
  let requests = operate.nearbyrequests.requests;
  let curlocation = operate.curlocation;
  return {...appui.home,nearbyrequestslist,requests,curlocation};
}

export default connect(
mapStateToProps,
)(Page);
