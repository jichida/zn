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
//import Feedetail from './orderdetail/feedetail';

import Mywallet from './mywallet/wallet';
import Mycoupons from './mycoupons/index';

import {hidepopmessage} from '../actions/index.js';

import { connect } from 'react-redux';

import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';


/*UI重新做*/
// import Messagelist from "./new/user/message";

//支付界面
import Pay from './pay/pay';
/*个人中心*/
//设置
// import Setting from "./new/user/setting";
//优惠券
// import Discount from "./new/user/discount";
// //addresscommon常用地址
// import Addresscommon from "./new/user/addresscommon";
// //添加常用地址
// import Addresscommonadd from "./new/user/addresscommonadd";
// //我的钱包
// import Userwallet from "./new/user/wallet";
// //我要充值
// import Userrecharge from "./new/user/recharge";
// //订单详情
// import Orderinfo from "./new/user/orderinfo";
//订单列表
import Orderlist from "./myorders/myorders";
//选择支付方式
//import Selpay from "./new/user/selpay";
//紧急联系人
// import Urgentlist from "./new/user/urgentlist";
// //个人信息
// import Userinfo from "./new/user/userinfo";
// //个人中心
// import Usercenter from "./new/user/usercenter";
//
// //取消规则
// import Cancelrule from "./new/other/cancelrule";
// //集团信息
// import Phonelist from "./new/other/phonelist";
//
//
// //选择支付方式
// //import Payway from "./orderdetail/payway";
// //提现
// import Recharge from "./new/user/recharge";

//充值页面
import Rechargepay from './mywallet/rechargepay.js';
/*公共样式*/
import '../../public/newcss/common.css';

import Seladdressbook from './emerygencycontact/Telephone/Seladdressbook.js';

//旅游大巴 - 填写信息
import Tourbusfillform from "./tourbus/userinfo";

import MessageCenter from './messagecenter/messagecenter.js';
import MessageDetail from './messagecenter/messagedetail.js';

import {requireAuthentication} from './requireauthentication';



class AppRoot extends React.Component {
    render() {
        return (
            <div className="AppContainer">
                <WeuiTool />
                <Switch>
                    <Route exact path="/" component={()=>(<Redirect to="/index/chuzuche"/>)}/>
                    <Route path="/index/:keyname" component={App}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/about/:keyname" component={About}/>
                    <Route path="/systemsetting" component={SystemSetting}/>
                    <Route path="/rechargepay/:triporderid" component={requireAuthentication(Rechargepay)}/>
                    <Route path="/emerygencycontact" component={requireAuthentication(Emerygencycontact)} />
                    <Route path="/city" component={City}/>
                    <Route path="/oftenuseaddress" component={requireAuthentication(Oftenuseaddress)}/>
                    <Route path="/search/:searchfrom" component={Search}/>
                    <Route path="/requestorderstarting" component={Caroverlay}/>
                    <Route path="/editprofile" component={requireAuthentication(Editprofile)}/>
                    <Route path="/orderdetail/:triporderid" component={requireAuthentication(Orderdetail)}/>

                    <Route path="/myorders" component={requireAuthentication(Myorders)}/>
                    <Route path="/orderconfirm/:clickfrom" component={requireAuthentication(Orderconfirm)}/>
                    <Route path="/mywallet" component={requireAuthentication(Mywallet)}/>
                    <Route path="/mycoupons/:sel" component={requireAuthentication(Mycoupons)}/>
                    <Route path="/messagecenter" component={MessageCenter}/>
                    <Route path="/messagedetail/:messageid" component={MessageDetail} />

                    <Route path="/orderlist" component={requireAuthentication(Orderlist)}/>
                    <Route path="/tourbusfillform" component={requireAuthentication(Tourbusfillform)}/>
                    <Route path="/pay/:triporderid" component={requireAuthentication(Pay)}/>
                    <Route path="/seladdressbook" component={requireAuthentication(Seladdressbook)}/>

                    <Route component={App}/>
                </Switch>
            </div>
        );
    }
}
//<Route path="/feedetail/:triporderid" component={requireAuthentication(Feedetail)}/>
export default AppRoot;
