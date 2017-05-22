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
        let updatedrequest = {
            _id:this.props.selrequest._id,
        };
        this.props.dispatch(acceptrequest(updatedrequest)).then((result)=>{
            this.props.dispatch(carmap_setmapstage('去接乘客'));
            this.props.history.replace('/starttrip');
        });
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
