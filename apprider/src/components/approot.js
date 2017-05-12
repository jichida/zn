/**
 * Created by wangxiaoqing on 2017/3/15.
 */
import React from 'react';

import WeuiTool from './tools/weuitool';

import App from './home/home';
import Login from './login/login';
import SystemSetting from './setting/setting';
import About from './setting/about';
import Emerygencycontact from './emerygencycontact/emerygencycontact';
import City from './city/city';
import Oftenuseaddress from './oftenuseaddress/index';
import Search from './search/search';
import Caroverlay from './maps/caroverlay';
import Editprofile from './editprofile/editprofile';
import Orderdetail from './orderdetail/orderdetail';
import Myorders from './myorders/myorders';
import Orderconfirm from './orderconfirm/index';
import Feedetail from './orderdetail/feedetail';

import Mywallet from './mywallet/wallet';
import Mycoupons from './mycoupons/index';

import {hidepopmessage} from '../actions/index.js';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';


/*UI重新做*/
import Messagelist from "./new/user/message";

/*个人中心*/
//设置
import Setting from "./new/user/setting";
//优惠券
import Discount from "./new/user/discount";
//addresscommon常用地址
import Addresscommon from "./new/user/addresscommon";
//添加常用地址
import Addresscommonadd from "./new/user/addresscommonadd";
//我的钱包
import Userwallet from "./new/user/wallet";
//我要充值
import Userrecharge from "./new/user/recharge";
//订单详情
import Orderinfo from "./new/user/orderinfo";
//订单列表
import Orderlist from "./new/user/orderlist";
//选择支付方式
import Selpay from "./new/user/selpay";
//紧急联系人
import Urgentlist from "./new/user/urgentlist";
//个人信息
import Userinfo from "./new/user/userinfo";
//个人中心
import Usercenter from "./new/user/usercenter";

//取消规则
import Cancelrule from "./new/other/cancelrule";
//集团信息
import Phonelist from "./new/other/phonelist";


//选择支付方式
import Payway from "./orderdetail/payway";
//提现
import Recharge from "./new/user/recharge";

/*公共样式*/
import '../../public/newcss/common.css';

//import '../../public/App.css';
//import '../../public/amaze.css';
//import '../../public/a2017.css';
//import '../../public/m2015.css';
//import '../../public/style.css';
//import '../../public/css/page.css';


import {requireAuthentication} from './requireauthentication';


class MessageCo extends React.Component {
    onDismiss = ()=> {
        this.props.dispatch(hidepopmessage());
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ispop && !this.props.ispop) {
            window.setTimeout(()=> {
                this.props.dispatch(hidepopmessage());
            }, 3000);
        }
    }

     render() {
        let fullheight = {
            height: window.innerHeight + "px"
        };
        let MessageCo = null;
        if (this.props.ispop) {
            if (this.props.type === 'error') {
                MessageCo = (
                    <div className="messageCo" style={fullheight}>
                        <Message onDismiss={this.onDismiss}
                                 error
                                 header={this.props.title}
                                 content={this.props.msg}
                        />
                    </div>
                );
            }
            else if (this.props.type === 'warning') {
                MessageCo = (
                    <div className="messageCo" style={fullheight}>
                        <Message onDismiss={this.onDismiss}
                                 warning
                                 header={this.props.title}
                                 content={this.props.msg}
                        />
                    </div>
                );
            }
            else if (this.props.type === 'success') {
                MessageCo = (
                    <div className="messageCo" style={fullheight}>
                        <Message onDismiss={this.onDismiss}
                                 success
                                 header={this.props.title}
                                 content={this.props.msg}
                        />
                    </div>
                );
            }
        }
        return MessageCo;
     }
}
const mapStateToPropsMessageCo = ({app:{ispop,type,title,msg}}) => {
    return {ispop,type,title,msg};
}
MessageCo = connect(mapStateToPropsMessageCo)(MessageCo);

class AppRoot extends React.Component {
    render() {
        return (
            <div className="AppContainer">
                <WeuiTool />
                <MessageCo />
                <Switch>
                    <Route exact path="/" component={()=>(<Redirect to="/index/chuzuche"/>)}/>
                    <Route path="/index/:keyname" component={App}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/about/:keyname" component={About}/>
                    <Route path="/systemsetting" component={SystemSetting}/>
                    <Route path="/emerygencycontact" component={requireAuthentication(Emerygencycontact)} />
                    <Route path="/city" component={City}/>
                    <Route path="/oftenuseaddress" component={requireAuthentication(Oftenuseaddress)}/>
                    <Route path="/search/:searchfrom" component={Search}/>
                    <Route path="/requestorderstarting" component={Caroverlay}/>
                    <Route path="/editprofile" component={requireAuthentication(Editprofile)}/>
                    <Route path="/orderdetail/:triporderid" component={requireAuthentication(Orderdetail)}/>
                    <Route path="/feedetail/:triporderid" component={requireAuthentication(Feedetail)}/>
                    <Route path="/myorders" component={requireAuthentication(Myorders)}/>
                    <Route path="/orderconfirm/:clickfrom" component={requireAuthentication(Orderconfirm)}/>
                    <Route path="/mywallet" component={requireAuthentication(Mywallet)}/>
                    <Route path="/mycoupons" component={requireAuthentication(Mycoupons)}/>
                    <Route path="/messagelist" component={Messagelist}/>
                    <Route path="/setting" component={Setting}/>
                    <Route path="/discount" component={Discount}/>
                    <Route path="/addresscommon" component={Addresscommon}/>
                    <Route path="/addresscommonadd" component={Addresscommonadd}/>
                    <Route path="/userwallet" component={Userwallet}/>
                    <Route path="/userrecharge" component={Userrecharge}/>
                    <Route path="/orderinfo" component={Orderinfo}/>
                    <Route path="/cancelrule" component={Cancelrule}/>
                    <Route path="/orderlist" component={Orderlist}/>
                    <Route path="/selpay" component={Selpay}/>
                    <Route path="/urgentlist" component={Urgentlist}/>
                    <Route path="/phonelist" component={Phonelist}/>
                    <Route path="/userinfo" component={Userinfo}/>
                    <Route path="/usercenter" component={Usercenter}/>
                    <Route path="/payway" component={Payway}/>
                    <Route path="/recharge" component={Recharge}/>

                    <Route component={App}/>
                </Switch>
            </div>
        );
    }
}

export default AppRoot;
