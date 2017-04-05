import React from 'react'
import { connect } from 'react-redux';
import {requestgetwithtoken} from '../util/util.js';
import {
  View,Container,NavBar,Button
} from 'amazeui-touch';
import moment from 'moment';
import Infinite from 'react-infinite';

const perpagenumber = 10;//每页个数

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
    this.displayitems = [];//first clear
  }
  componentWillMount () {
    this.props.sendSrvData('server/rider',{
      cmd:'getnotifymessage',
      data:{
        query:{},
        options:{
          page: 1,
          limit: perpagenumber,
        }
      }
    });
  }
  onClickMsgDetail(notifymessage){
    this.props.onUpdatePage('mynotifymessagepagedetail_setobj',notifymessage);
    browserHistory.push('xxzxxq');
  }
  onClickBack(){
    browserHistory.goBack();
  }
  componentWillUnmount () {
    this.displayitems = [];//first clear
    this.props.onUpdatePage('mynotifymessagepage_setobj',{
      displaypage:1,
      result:{
        page:1,
        limit:0,
        docs:[]
      }});
  }
  handleInfiniteLoad(){
    if(this.props.result.pages <= this.props.result.page){
      console.log("加载到底了，没有更多数据了!");
      return;
    }
    let page = this.props.displaypage + 1;
    console.log("滚动到底了!!!访问下一页：" + page);
    this.props.onUpdatePage('mynotifymessagepage_displaypage',page);//plus+1
    this.props.sendSrvData('server/rider',{
      cmd:'getnotifymessage',
      data:{
        query:{},
        options:{
          page: page,
          limit: perpagenumber,
        }
      }
    });
  }

  render() {
      const itemLeft = {
        title: '返回'
      };
      const dataLeft = {
        title: '消息中心',
        leftNav: [{...itemLeft, icon: 'left-nav'}],
        onAction: ()=>{
          browserHistory.goBack();
        },
      };
      if((this.displayitems.length < this.props.displaypage*perpagenumber)&&
    (this.props.result.page*perpagenumber === this.displayitems.length+ perpagenumber)){
      //append
        this.props.result.docs.forEach((notifymessageitem)=>{
          if (typeof notifymessageitem.expdate === 'string') {
            notifymessageitem.expdate = new Date(Date.parse(notifymessageitem.expdate));
          }
          this.displayitems.push(notifymessageitem);
        });
      }
      let notifymessageitemco  = [];
      this.displayitems.forEach((notifymessageitem)=>{
        if (typeof notifymessageitem.expdate === 'string') {
          notifymessageitem.expdate = new Date(Date.parse(notifymessageitem.expdate));
        }
        notifymessageitemco.push(<NotifymessageItem key={notifymessageitem._id} notifymessage={notifymessageitem}
          onClickMsgDetail={this.onClickMsgDetail.bind(this,notifymessageitem)}/>)
      });
 return (
<View>
<NavBar {...dataLeft}/>

     <Infinite containerHeight={1290} elementHeight={129}
     infiniteLoadBeginEdgeOffset={100}
     onInfiniteLoad={this.handleInfiniteLoad.bind(this)}>
       {notifymessageitemco}
     </Infinite>
        </View>
 );
  }
}



const mapStateToProps = (state,props) => {
  let mynotifymessagepage = {};
  if(state.pagereducer.hasOwnProperty('mynotifymessagepage')){
    mynotifymessagepage = state.pagereducer['mynotifymessagepage'];
  }

  //由于界面和网络的先后顺序不一致,可能就造成个别字段不存在，容错!
  if(!mynotifymessagepage.hasOwnProperty('displaypage')){
    mynotifymessagepage.displaypage = 1;
  }

  if(!mynotifymessagepage.hasOwnProperty('result')){
    mynotifymessagepage.result =  {
        page:1,
        limit:0,
        docs:[]
      };
  }
  return Object.assign({},mynotifymessagepage);
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePage:(type,v)=>{
      dispatch({ type:type ,data:v});
    },
    sendSrvData:(type,v)=>{
      dispatch({ type:type ,data:v});
    },
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
