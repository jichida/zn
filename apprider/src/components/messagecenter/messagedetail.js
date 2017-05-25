/*消息中心*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../public/newcss/message.css';
import NavBar from '../tools/nav.js';
import _ from 'lodash';
import moment from 'moment';

class Page extends Component {
    render() {
        const {notifymessage} = this.props;
        const createdatestring = moment(notifymessage.created_at).format("YYYY-MM-DD");
        return (
            <div className="messagePage AppPage">
                <NavBar back={true} title="消息" />
                <div className="list">
                    <div className="time">{createdatestring}</div>
                    <div className="cont">
                        <div className="tit">{notifymessage.messagetitle}</div>
                        <div className="text">{notifymessage.messageconent}</div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps =  ({messagecenter:{messagelist}}, props) =>{
    let notifymessage = {};
    let messageid = props.match.params.messageid;
    let msgindex = _.findIndex(messagelist,
      (item)=>{
        return item._id === messageid
      }
    );
    if(msgindex >= 0){
      notifymessage = messagelist[msgindex];
    }
    return {notifymessage};
};

export default connect(
    mapStateToProps,
)(Page);
