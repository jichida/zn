import React from 'react'
import { connect } from 'react-redux';
import {
  View,Container,NavBar,Button
} from 'amazeui-touch';
import moment from 'moment';
import { InfiniteLoader, List } from 'react-virtualized';
import {getnotifymessage_request} from '../actions';

const NotifymessageItem = (props) => {
  const {notifymessage} = props;
  const createdatestring = moment(notifymessage.created_at).format("YYYY-MM-DD");
  return (
    <li target="_blank" className="item item-content" onClick={props.onClickMsgDetail}>
      <div className="item-media"><img width="48" src="http://lorempixel.com/160/160/people/" className="radius50" /></div>
      <div className="item-main">
        <div className="item-title-row">
          <h3 className="item-title">{notifymessage.messagetitle}</h3>
          <div className="item-after">{createdatestring}</div>
        </div>
        <div className="item-subtitle"></div>
      </div>
  </li>
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
    // this.props.onUpdatePage('mynotifymessagepagedetail_setobj',notifymessage);
    // browserHistory.push('xxzxxq');
    this.props.history.push(`/messsagedetail/${notifymessage._id}`);
  }
  onClickBack(){
    this.props.history.goBack();
  }
  componentWillUnmount () {
  }

  isRowLoaded = ({ index })=> {
    return (this.props.list.length > index);
  }

  loadMoreRows= ({ startIndex, stopIndex })=> {
    let queryobj = {};
    this.props.dispatch(getnotifymessage_request({
      query:queryobj,
      options:{
        sort:{created_at:-1},
        offset: startIndex,
        limit: (stopIndex-startIndex),
      }
    }));

  }

  rowRenderer= ({ key, index, style})=> {

    let notifymessageitem = this.props.list[index];
    if (typeof notifymessageitem.expdate === 'string') {
      notifymessageitem.expdate = new Date(Date.parse(notifymessageitem.expdate));
    }
    return (<NotifymessageItem key={notifymessageitem._id} notifymessage={notifymessageitem}
                               onClickMsgDetail={this.onClickMsgDetail.bind(this,notifymessageitem)} />;

  }

  render() {
      const itemLeft = {
        title: '返回'
      };
      const dataLeft = {
        title: '消息中心',
        leftNav: [{...itemLeft, icon: 'left-nav'}],
        onAction: ()=>{
          this.onClickBack();
        },
      };

       return (
            <View>
            <NavBar {...dataLeft}/>

              <InfiniteLoader
                  isRowLoaded={this.isRowLoaded}
                  loadMoreRows={this.loadMoreRows}
                  rowCount={this.props.remoteRowCount}
              >
                {({ onRowsRendered, registerChild }) => (
                    <List
                        height={580}
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        rowCount={this.props.remoteRowCount}
                        rowHeight={129}
                        rowRenderer={this.rowRenderer}
                        width={200}
                    />
                )}
              </InfiniteLoader>,
            </View>
          );
  }
}



const mapStateToProps = (state) => {
  return state;
}

export default connect(
  mapStateToProps
)(Page);
