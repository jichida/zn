/*
    个人中心-个人中心
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    } = WeUI;
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import '../../../public/newcss/usercenter.css';
import {jsCallPhone} from '../../env/callphone.js';
class Page extends Component {

    onClickItem(name,e){
      if(name === '/test'){
        window.location.href='http://baiye.com28.cn/build2/';
        return;
      }
      this.props.history.push(name);
      e.stopPropagation();
    }
    render() {
      const {loginsuccess,balance,couponnum,username,profile:{nickname,avatar}} = this.props;

      let phonenumbertext = loginsuccess?username:'未登录';
      let linkeditprofile = loginsuccess?'/editprofile':'/login';
      if(loginsuccess){
        phonenumbertext = nickname;
      }
      console.log("this.props.app.servicephonenumber::::"+this.props.app.servicephonenumber);
      return (
            <div className="usercenterPage AppPage">
                {loginsuccess &&
                (<div className="head" onClick={this.onClickItem.bind(this,linkeditprofile)}>
                    <img src={avatar}  alt=""/>
                    <span className="name">{phonenumbertext}</span>
                    <span className="li">账户余额 ¥{balance}</span>
                    <span className="li">优惠券 {couponnum}张</span>
                </div>)}
                {!loginsuccess &&
                (<div className="head" onClick={this.onClickItem.bind(this,linkeditprofile)}>
                    <img src={avatar}  alt=""/>
                    <span className="name">{phonenumbertext}</span>
                </div>)}
                <div className="list">
                    <Cells>
                        <Cell access onClick={this.onClickItem.bind(this,'/myorders')}>
                            <CellHeader>
                                <img src="newimg/n1.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                我的订单
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access onClick={this.onClickItem.bind(this,'/oftenuseaddress')}>
                            <CellHeader>
                                <img src="newimg/n2.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                常用地址
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access onClick={this.onClickItem.bind(this,'/mywallet')}>
                            <CellHeader>
                                <img src="newimg/n3.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                我的钱包
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access onClick={this.onClickItem.bind(this,'/mycoupons/nosel')}>
                            <CellHeader>
                                <img src="newimg/n4.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                我的优惠券
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access onClick={this.onClickItem.bind(this,'/messagecenter')}>
                            <CellHeader>
                                <img src="newimg/n5.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                我的消息
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        { !!this.props.app.servicephonenumber &&
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/n6.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                <a
                                    onClick={(e)=>{jsCallPhone(`${this.props.app.servicephonenumber}`);}}
                                    style={{display:"block",color:"#333"}}
                                >联系客服</a>
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        }

                        <Cell access onClick={this.onClickItem.bind(this,'/systemsetting')}>
                            <CellHeader>
                                <img src="newimg/n7.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                系统设置
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access onClick={this.onClickItem.bind(this,'/gotodriver')}>
                            <CellHeader>
                                <img src="newimg/n8.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                司机入驻
                            </CellBody>
                            <CellFooter />
                        </Cell>
                        <Cell access onClick={this.onClickItem.bind(this,'/about/rideraboutus')}>
                            <CellHeader>
                                <img src="newimg/n9.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                关于我们
                            </CellBody>
                            <CellFooter />
                        </Cell>

                    </Cells>

                </div>
            </div>
        )
    }
}


const mapStateToProps =  ({userlogin,mycoupon:{couponlist},app}) =>{
    return {...userlogin,couponnum:couponlist.length,app};
};
export default connect(
mapStateToProps,
)(withRouter(Page));
