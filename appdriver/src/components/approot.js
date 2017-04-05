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

import {hidepopmessage} from '../actions/index.js';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
    HashRouter as Router,
    Route,Redirect,
    Switch
} from 'react-router-dom';

import '../../public/App.css';
import '../../public/amaze.css';
import '../../public/a2017.css';
import '../../public/style.css';
import '../../public/css/page.css';

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
        return (<div>{MessageCo}
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
                <Route component={App}/>
            </Switch>
        </div>);
    }

}

const mapStateToProps = ({app,carmap}) => {
    return {...app};
}
AppRoot = connect(mapStateToProps)(AppRoot);

export default AppRoot;
