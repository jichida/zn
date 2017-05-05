/*
    出车
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/outcar.css';
import NavBar from '../tools/nav.js';
import { connect } from 'react-redux';
import {getdistance} from '../../util/geo';

const {
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
    } = WeUI;
import MapGaode from './mapcar.js';
import _ from 'lodash';
import {selrequest,ui_outcarselregistertype} from '../../actions';

class Page extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
  }
  onClickTitle(regtype){
    this.props.dispatch(ui_outcarselregistertype(regtype));
  }
  onClickReq(reqobj){
    this.props.dispatch(selrequest(reqobj));
    this.props.history.push(`/selrequest/${reqobj._id}`);
  }
  render() {
        const {uiregistertype,requestlist,registertypeoptions,curlocation} = this.props;
        let titleco = [];
        _.map(registertypeoptions,(registertype,index)=>{
          if(uiregistertype === registertype){
            titleco.push(<span key={index} className="sel">{registertype}</span>);
          }
          else{
            titleco.push(<span key={index} onClick={this.onClickTitle.bind(this,registertype)}>{registertype}</span>);
          }
        });

        let cellco = [];
        _.map(requestlist,(reqobj,index)=>{
          let triptypename = reqobj.isrealtime?'实时':'预约';
          cellco.push(<Cell key={index} access onClick={this.onClickReq.bind(this,reqobj)}>
              <CellBody>
                  <div className="tt">
                      <span className="i">{triptypename}</span>
                      <span>{reqobj.showtimestring}</span>
                  </div>
                  <div className="li a">{reqobj.srcaddress.addressname}</div>
                  <div className="li b">{reqobj.dstaddress.addressname}</div>
              </CellBody>
              <CellFooter />
          </Cell>);
        });

        return (
            <div className="outcarPage AppPage">
                <NavBar back={true} title="中南出行" />
                <div className="headNav">
                    {titleco}
                </div>
                <div className="mapcontent">
                    <MapGaode ref='mapgaode' />
                    <div className="outcarControl">
                        <div className="list hide">
                            <Cells>
                              {cellco}
                            </Cells>
                        </div>
                        <div className="lnk">展开</div>
                        <div className="bbtn">
                            <span>全部</span>
                            <span>收车</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({appui,operate,userlogin}) => {
  let nearbyrequestslist = operate.nearbyrequests.list;
  let requests = operate.nearbyrequests.requests;
  let curlocation = operate.curlocation;
  let userregistertype = userlogin.registertype;
  let registertypeoptions =[];
  if(userregistertype === '快车'){
    registertypeoptions= ['快车','代驾'];
  }
  else if(userregistertype === '出租车'){
    registertypeoptions= ['出租车','代驾'];
  }
  else if(userregistertype === '代驾'){
    registertypeoptions= ['代驾'];
  }
  let uiregistertype = appui.pageregistertype;
  if(registertypeoptions.indexOf(uiregistertype) === -1){
    uiregistertype = registertypeoptions[0];
  }

  let requestlist = [];
  _.map(nearbyrequestslist,(requestid)=>{
    let reqobj = requests[requestid];
    if(reqobj.triptype === uiregistertype){
      requestlist.push(reqobj);
    }
  });
  return {
    uiregistertype,
    requestlist,
    registertypeoptions,
    curlocation
  };
}

export default connect(
  mapStateToProps,
)(Page);
