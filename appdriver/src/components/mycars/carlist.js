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
    this.props.dispatch(carsetdefault_request({carid:carinfo._id}));
      //this.props.history.push(`/cardetail/${orderinfo._id}`);
  }

    render() {
        let titleRightNav = [
            {
                icon : '',
                text : '新增车辆',
                type : 'push',//push, action,
                url : '/createcar'
            },
        ];
        const {carlist} = this.props;
        let carlistco = [];
        _.map(carlist,(caritem,index)=>{
          carlistco.push(<CarItem carinfo={caritem}  key={index}
                       onClickSelCurCar={this.onClickSelCurCar.bind(this)} />)
        });
        return (
            <div className="usercarlistPage AppPage">
                <NavBar back={true} title="我的车辆" rightnav={titleRightNav} />
                <Button onClick={()=>this.props.history.push('/createcar')} >新建车辆</Button>
                <div className="list">
                    <Panel>
                        <PanelBody>
                            {carlistco}
                        </PanelBody>
                    </Panel>
                </div>
            </div>
        )
    }
}


const mapStateToProps =  ({car:{carlist}}) =>{
    return {carlist};
};

export default connect(
    mapStateToProps,
)(Page);
