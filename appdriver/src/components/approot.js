/**
 * Created by wangxiaoqing on 2017/3/15.
 */
import React from 'react';
import App from './appindex.js';
import Login from './login.js';
import SystemSetting from './systemsettings';
import About from './about.js';
import City from './city';
import Caroverlayqd from './maps/caroverlayqd';
import Caroverlaystart from './maps/caroverlaystarttrip';
import Orderdetail from './orderdetail/orderdetail';
import Myorders from './myorders';
import Emerygencycontact from './emerygencycontact';
import Feedetail from './orderdetail/feedetail';
//注册
import Register from './register/index.js';
//选择注册类型
import Register1 from './register/registerfillwizard';
//首页
import Index from './index';
//出车
import Outcar from './new/outcar';
//抢单
import Roborder from './new/roborder';

//个人中心-基本信息
import Userbaseinfo from './new/user/baseinfo';
//个人中心-我的车辆
import Usercarlist from './new/user/carlist';
//个人中心-订单详情
import Userorderinfo from './new/user/orderinfo';
//个人中心-我的订单
import Userorderlist from './new/user/orderlist';
//个人中心-我的钱包
import Userwallet from './new/user/wallet';
//个人中心－提现
import Userwithdrawals from './new/user/withdrawals';

//审核页面
import Approval from './register/approval';


//注册
import Test from './test';

import {hidepopmessage} from '../actions/index.js';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
    HashRouter as Router,
    Route,Redirect,
    Switch
} from 'react-router-dom';

import '../../public/newcss/common.css';

// import '../../public/App.css';
// import '../../public/amaze.css';
// import '../../public/a2017.css';
// import '../../public/style.css';
// import '../../public/css/page.css';

import {getcurrentlocationfn,getcurrentlocationstring} from '../util/geo.js';
import {carmap_setpageinit,getcurrentlocationandnearestdrivers_request} from '../actions';

import {requireAuthentication} from './requireauthentication';


 class AppRoot extends React.Component {
    onDismiss=()=>{
        this.props.dispatch(hidepopmessage());
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.ispop && !this.props.ispop){
            window.setTimeout(()=>{
                this.props.dispatch(hidepopmessage());
            },3000);
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
        return (
            <div className="AppContainer">
                {MessageCo}
                <Switch>
                    <Route exact path="/" component={()=>(<Redirect to="/index/all"/>)}/>
                    <Route path="/index/:keyname" component={App}/>
                    <Route path="/systemsettings" component={SystemSetting}/>
                    <Route path="/emerygencycontact" component={requireAuthentication(Emerygencycontact)} />
                    <Route path="/login" component={Login}/>
                    <Route path="/about/:keyname" component={About}/>
                    <Route path="/city" component={City}/>
                    <Route path="/selrequest/:requestid" component={Caroverlayqd}/>
                    <Route path='/starttrip' component={Caroverlaystart} />
                    <Route path="/feedetail/:triporderid" component={requireAuthentication(Feedetail)}/>
                    <Route path="/orderdetail/:triporderid" component={requireAuthentication(Orderdetail)}/>
                    <Route path="/myorders" component={requireAuthentication(Myorders)}/>
                    <Route path="/test" component={Test}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/register1" component={Register1}/>
                    <Route path="/index" component={Index}/>
                    <Route path="/outcar" component={Outcar}/>
                    <Route path="/roborder" component={Roborder}/>
                    <Route path="/approval" component={Approval}/>
                    <Route path="/userbaseinfo" component={Userbaseinfo}/>
                    <Route path="/usercarlist" component={Usercarlist}/>
                    <Route path="/userorderinfo" component={Userorderinfo}/>
                    <Route path="/userorderlist" component={Userorderlist}/>
                    <Route path="/userwallet" component={Userwallet}/>
                    <Route path="/userwithdrawals" component={Userwithdrawals}/>



                    <Route component={App}/>
                </Switch>
            </div>
        );
    }

}

const mapStateToProps = ({app,carmap}) => {
    return {...app};
}
AppRoot = connect(mapStateToProps)(AppRoot);

export default AppRoot;
