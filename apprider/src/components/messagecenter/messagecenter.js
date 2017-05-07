import React from 'react'
import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../../public/newcss/message.css';
import NavBar from '../tools/nav.js';
import moment from 'moment';
import {
  getnotifymessage_request
} from '../actions';

const NotifymessageItem = (props) => {
  const {notifymessage} = props;
  const createdatestring = moment(notifymessage.created_at).format("YYYY-MM-DD");
  return (
    <div className="li"  onClick={props.onClickMsgDetail}>
      <div className="time">{createdatestring}</div>
      <div className="cont">
        <div className="tit">{notifymessage.messagetitle}</div>
        <div className="text">{notifymessage.messageconent}</div>
      </div>
    </div>
  );
}
export class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount () {
    this.props.dispatch(getnotifymessage_request({
      query:{},
      options:{
        sort:{created_at:-1},
        offset: 0,
        limit: 10,
      }
    }));
  }
  onClickMsgDetail(notifymessage){
    this.props.history.push(`/messsagedetail/${notifymessage._id}`);
  }
  onClickBack(){
    this.props.history.goBack();
  }
  componentWillUnmount () {
  }


  render() {
       return (
         <div className="messagePage AppPage">
             <NavBar back={true} title="消息" />
             <div className="list">

             </div>
         </div>);
  }
}



const mapStateToProps = (state) => {
  return state;
}

export default connect(
  mapStateToProps
)(Page);
