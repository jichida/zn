/**
 * Created by wangxiaoqing on 2017/3/15.
 */
import React from 'react';
import WeuiTool from './tools/weuitool';

import { Route, Switch, Redirect } from 'react-router-dom';
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
import Mywallet from './mywallet/wallet';
import Mycoupons from './mycoupons/index';
//支付界面
import Pay from './pay/pay';
//订单列表
import Orderlist from "./myorders/myorders";
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
                    <Route path="/messagedetail/:msgid" component={MessageDetail} />
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
export default AppRoot;
