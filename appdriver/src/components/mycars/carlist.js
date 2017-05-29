/*
    个人中心－我的车辆
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/usercarlist.css';
import NavBar from '../tools/nav.js';
import { connect } from 'react-redux';
const {
    Panel,
    PanelBody,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    Button,
    } = WeUI;
import {
  cargetall_request,
  carsetdefault_request
} from '../../actions';
import CarItem from './caritem.js';
import _ from 'lodash';

class Page extends Component {

  componentWillMount () {
    this.props.dispatch(cargetall_request({}));
  }

  onClickSelCurCar(carinfo){
    this.props.dispatch(carsetdefault_request({
      carid:carinfo._id,
      Platform_baseInfoVehicleId:carinfo.Platform_baseInfoVehicleId,
      Platform_baseInfoVehicle:carinfo.Platform_baseInfoVehicle
    }));
      //this.props.history.push(`/cardetail/${orderinfo._id}`);
  }

    render() {
        let titleRightNav = [
            {
                text : '新增车辆',
                type : 'push',//push, action,
                url : '/createcar'
            },
        ];
        const {carlist,defaultmycar} = this.props;
        return (
            <div className="usercarlistPage AppPage">
                <NavBar 
                  back={true} 
                  title="我的车辆" 
                  rightnav={titleRightNav} />
                <div className="list">
                    <Panel>
                        <PanelBody>
                            {_.map(carlist,(caritem,index)=>{
                                return (
                                    <CarItem 
                                      carinfo={caritem}  
                                      key={index} 
                                      isdefault={defaultmycar === caritem._id }
                                      onClickSelCurCar={this.onClickSelCurCar.bind(this)} 
                                      />
                                )
                            })}
                        </PanelBody>
                    </Panel>
                </div>
            </div>
        )
    }
}


const mapStateToProps =  ({car:{carlist},userlogin:{defaultmycar}}) =>{
    return {carlist,defaultmycar};
};

export default connect(
    mapStateToProps,
)(Page);
