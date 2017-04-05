import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


export class Page extends React.Component {

  componentWillMount () {
  }
  onClickItem(name,e){
    // if(name === '/editprofile' && this.props.hasOwnProperty('profile')){
    //   //传递数据
    //   this.props.onUpdatePage('editprofilepage_setobj',this.props.profile);
    // }
    this.props.history.push(name);
    e.stopPropagation();
    //return false;//防止冒泡!
  }

  render() {
    let phonenumbertext = this.props.loginsuccess?this.props.username:'未登录';
    let linkeditprofile = this.props.loginsuccess?'/editprofile':'/login';
    if(this.props.loginsuccess){
      if(this.props.hasOwnProperty('profile')){
        if(this.props.profile.hasOwnProperty('nickname')){
          phonenumbertext = this.props.profile.nickname;
        }
      }
    }

    let imageavatar = "images/user.jpg";
    if(this.props.hasOwnProperty('profile')){
      if(this.props.profile.hasOwnProperty('avatar')){
        imageavatar = this.props.profile.avatar;
      }
    }

  return (
  <div style={{
    width: 256,
    height: '100%',backgroundColor:'#fff'
  }} onClick={this.onClickItem.bind(this,linkeditprofile)}>
    <div className="g padding bule_bg"><div className="col text-center">
	<div className="background_img"  style={{backgroundImage:"url("+imageavatar+")"}}></div>
    <p className="text-center">{phonenumbertext}</p>
    </div>
    </div>
    <ul className="list margin-top-0">
    <li className="item item-linked" onClick={this.onClickItem.bind(this,'/myorders')}><a>
        <div className="item-media"><span className="icon icon-wddd"></span></div>
        <h3 className="item-title padding-left">我的订单</h3>
        <span className="icon icon-right-nav item-icon"></span></a></li>
    <li className="item item-linked" onClick={this.onClickItem.bind(this,'/wdqb')}><a target="_blank">
        <div className="item-media"><span className="icon icon-qb"></span></div>
        <h3 className="item-title padding-left">我的钱包</h3>
        <span className="icon icon-right-nav item-icon"></span></a></li>
      <li className="item item-linked" onClick={this.onClickItem.bind(this,'/wdcl')}><a target="_blank">
        <div className="item-media"><span className="icon icon-cl"></span></div>
        <h3 className="item-title padding-left">我的车辆</h3>
        <span className="icon icon-right-nav item-icon"></span></a></li>
      <li className="item item-linked" onClick={this.onClickItem.bind(this,'/systemsettings')}><a target="_blank">
        <div className="item-media"><span className="icon icon-sz"></span></div>
        <h3 className="item-title padding-left">系统设置</h3>
        <span className="icon icon-right-nav item-icon"></span></a></li>
    </ul>
    <div className="group text-center margin-bottom-0"><img src="images/logo_foot.png" /></div>
	<div className="text-center"><p className="text-warning"><small>有问题可以来这里投诉哦！</small></p>
	<div><span className="icon icon-jtxx"></span><div>集团信息</div></div></div>
  </div>);
}
}




const mapStateToProps =  ({userlogin}) =>{
    return userlogin;
};


export default connect(
mapStateToProps,
)(withRouter(Page));
