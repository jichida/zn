import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  Container,
  View,
  Group,
  NavBar,
  Grid,
  Col,
  List,
  Button
} from 'amazeui-touch';
import {getdistance} from '../../util/geo.js';
import {carmap_setmapstage} from '../../actions';
import {acceptrequest} from '../../actions/sagacallback';
import MapGaode from './mapcar.js';

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
    <View>
        <NavBar {...dataLeft}/>
        <Container scrollable={true}>
		<div className="relative">
		    <div style={{height:"200px",overflow:"hidden"}}><MapGaode ref='mapgaode' curreqobj={curreqobj} /></div>
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
    </Container>
  </View>
  );
}

}



const mapStateToProps = ({operate},props) => {
  let requests = operate.nearbyrequests.requests;
  let  selrequest = requests[props.match.params.requestid];
  let curlocation = operate.curlocation;
  return {selrequest,curlocation};
}

export default connect(
mapStateToProps,
)(Page);
