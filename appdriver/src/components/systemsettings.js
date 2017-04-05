import React from 'react';
import { connect } from 'react-redux';
import {
  View,Container,NavBar,Button
} from 'amazeui-touch';
import {logout_request} from '../actions';

 class Page extends React.Component {

  componentWillMount () {
  }
  onClickBack(){
    this.props.history.goBack();
  }
  onClickLogout(){
    this.props.dispatch(logout_request());
  }
  onClickPage(name){
    this.props.history.push(name);
  }
  render() {
      const itemLeft = {
        title: '返回'
      };
      const dataLeft = {
        title: '系统设置',
        leftNav: [{...itemLeft, icon: 'left-nav'}],
        onAction: ()=>{
          this.onClickBack();
        },
      };
  return (<View>
	   <NavBar {...dataLeft}/>
        <Container scrollable={true}>
        <div className="group group-no-padded margin-top-0">
          <div className="group-body">
            <ul className="list">
              <li onClick={this.onClickPage.bind(this,'/emerygencycontact')} className="item item-linked"><a><div className="item-media"><span className="icon icon-lxr"></span></div>
                <div className="item-main"><h3 className="item-title">紧急联系人</h3>
                <span className="icon icon-right-nav item-icon"></span></div></a></li>
                </ul>
                </div>
                </div>
                <div className="group group-no-padded">
          <div className="group-body">
		  <ul className="list">
              <li  onClick={this.onClickPage.bind(this,'/about/userguide')} className="item item-linked"><a><div className="item-media"><span className="icon icon-gz"></span></div>
                <div className="item-main"><h3 className="item-title">用户指南</h3>
                <span className="icon icon-right-nav item-icon"></span></div></a></li>
              <li  onClick={this.onClickPage.bind(this,'/about/feerules')}  className="item item-linked"><a><div className="item-media"><span className="icon icon-jfgz"></span></div>
                <div className="item-main"><h3 className="item-title">计费规则</h3>
                <span className="icon icon-right-nav item-icon"></span></div></a></li>
                <li onClick={this.onClickPage.bind(this,'/about/raws')}   className="item item-linked"><a><div className="item-media"><span className="icon icon-flfg"></span></div>
                <div className="item-main"><h3 className="item-title">法律条款</h3>
                <span className="icon icon-right-nav item-icon"></span></div></a></li>
            </ul>
          </div>
        </div>
        {this.props.loginsuccess?
          <div className="padding"><Button amStyle="primary" block onClick={this.onClickLogout.bind(this)}>退出登录</Button></div>
          :null}
   </Container>
        </View>);
      }
}

const mapStateToProps = ({userlogin}) => {
    return userlogin;
}
Page = connect(mapStateToProps)(Page);
export default Page;
