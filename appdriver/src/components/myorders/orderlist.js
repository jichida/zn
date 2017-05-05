/*
    个人中心-订单详情
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderItem from './myordersitem.js';
import _ from 'lodash';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userorderlist.css';
import NavBar from '../tools/nav.js';
import {getmytriporders_request} from '../../actions';

const {
    Cells,
    Cell,
    CellBody,
    CellFooter
    } = WeUI;

class Page extends Component {
  constructor(props) {
      super(props);
   }
  componentWillMount () {
    this.props.dispatch(getmytriporders_request({
        query:{},
        options:{
            sort:{created_at:-1},
            offset: 0,
            limit: 100,
        }
    }));
  }

  onClickSelCurOrder(orderinfo){
      this.props.history.push(`/orderdetail/${orderinfo._id}`);
  }

    render() {
        const {mytriporderlist,triporders,remoteRowCount} = this.props;
        let orderinfolist = [];
        _.map(mytriporderlist,(orderid,index)=>{
          orderinfolist.push(<OrderItem orderinfo={triporders[orderid]}  key={index}
                       onClickSelCurOrder={this.onClickSelCurOrder.bind(this)} />)
        });
        return (
            <div className="userorderlistPage AppPage">
                <NavBar back={true} title="我的订单" />
                <div className="list">
                    <Cells>
                      {orderinfolist}
                    </Cells>
                </div>
            </div>
        )
    }
}


const mapStateToProps =  ({myorders}) =>{
    return {...myorders};
};

export default connect(
    mapStateToProps,
)(Page);
