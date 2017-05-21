import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  Container,
  View,
  Group,
  Grid,
  Col,
  List,
  Button
} from 'amazeui-touch';
import {getdistance} from '../../util/geo.js';
import {carmap_setmapstage} from '../../actions';
import {acceptrequest} from '../../actions/sagacallback';
import MapGaode from './mapcar.js';
import '../../../public/newcss/outcar.css';
import NavBar from '../tools/nav.js';

export class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
  }

  onClickOK(){
    // let profile = this.props.profile;
    let updatedrequest = {
      _id:this.props.selrequest._id,
    };
    this.props.dispatch(acceptrequest(updatedrequest)).then((result)=>{
      this.props.dispatch(carmap_setmapstage('联系乘客'));
      this.props.history.replace('/starttrip');
    });

    // this.props.sendSrvData('server/driver',{
    //   cmd:'acceptrequest',
    //   data:updatedrequest
    // });
  }
  render() {
    const itemLeft = {
      title: '返回'
    };
    const dataLeft = {
      title: '抢单',
      leftNav: [{...itemLeft, icon: 'left-nav'}],
      onAction: ()=>{
        this.props.history.goBack();
      },
    };
    let curreqobj = this.props.selrequest;
    let triptypename = curreqobj.isrealtime?'实时':'预约';
    let showqdbtn = curreqobj.requeststatus === '请求中';
    const {resultpricedetail} = curreqobj;
  return (
        <div className="outcarPage AppPage">
            <NavBar back={true} title="抢单" />
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
            <div className="mapcontent list">
                <MapGaode ref='mapgaode' curreqobj={curreqobj} />
            </div>




		<div className="relative">
            <div className="list margin-0 xjl_bottom">
			<div className="text-center">{curreqobj.requeststatus}</div>
            <div className="item item-content">
              <div className="item-main">
                <li className="padding-bottom">
                  <div className="item-title-row">
                    <div><span className="badge badge-success margin-8 radius35">{triptypename}</span>
                    {curreqobj.showtimestring}<span className="dd_lx_b">快</span></div>

                    <div className="item-after"><span className="icon icon-jl fize18"></span>
                      全程约{resultpricedetail.totalkm}公里
                    </div>
                  </div>
                </li>
                  <li>
                    <div className="item-main cfd_icon"> {curreqobj.srcaddress.addressname} </div>
                  </li>
                  <li>
                    <div className="item-main zd_icon"> {curreqobj.dstaddress.addressname} </div>
                  </li>
                </div>
                </div>
                <div className="item-title-row padding"><div>预计费用</div><div className="item-after red">￥{resultpricedetail.totalprice}元</div></div>
				{showqdbtn?
                    <Button onClick={this.onClickOK.bind(this)} amStyle="primary" block className="margin-0">抢单</Button>
      :null}
            </div>
        </div>
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
