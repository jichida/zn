import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../../../public/newcss/message.css';
import NavBar from '../tools/nav.js';
import moment from 'moment';
import _ from 'lodash';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const {
    LoadMore
    } = WeUI;
import {getnotifymessageone_result} from '../../actions';
import {getnotifymessage} from '../../actions/sagacallback';
import InfinitePage from '../controls/listview';

const NotifymessageItem = (props) => {
    const {notifymessage,onClickMsgDetail} = props;
    const createdatestring = moment(notifymessage.created_at).format("YYYY-MM-DD");
    return (
        <div className="li"  onClick={onClickMsgDetail}>
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


    updateContent = (msg)=> {
        return  (
          <NotifymessageItem
              key={msg._id}
              notifymessage={msg}
              onClickMsgDetail={this.onClickMsgDetail.bind(this,msg)}
              />
        );
    }

    onClickMsgDetail(item){
        this.props.dispatch( getnotifymessageone_result(item) );
        this.props.history.push(`/messagedetail/${item._id}`);
    }

    render() {
        return (
          <div className="messagePage AppPage">
               <NavBar back={true} title="消息" />
               <div className="list">
                    <InfinitePage
                        pagenumber = {30}
                        updateContent= {this.updateContent}
                        queryfun= {getnotifymessage}
                        listheight= {window.innerHeight-68}
                        query = {{}}
                        sort = {{created_at: -1}}
                    />
                </div>
            </div>
        )
    }
}

export default connect()(Page);
