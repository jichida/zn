/**
 * Created by wangxiaoqing on 2017/3/15.
 */
import React from 'react';
import App from './appindex.js';
import Login from './login.js';
import SystemSetting from './systemsettings';
import About from './about.js';
import Emerygencycontact from './emerygencycontact';
import City from './city';
import Oftenuseaddress from './oftenuseaddress';
import Search from './search.js';
import Caroverlay from './maps/caroverlay';
import Editprofile from './editprofile';
import Orderdetail from './orderdetail/orderdetail';
import Myorders from './myorders';
import Orderconfirm from './orderconfirm/index';
import Feedetail from './orderdetail/feedetail';

import {hidepopmessage} from '../actions/index.js';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import '../../public/App.css';
import '../../public/amaze.css';
import '../../public/a2017.css';
import '../../public/m2015.css';
import '../../public/style.css';
import '../../public/css/page.css';


import {requireAuthentication} from './requireauthentication';



 class AppRoot extends React.Component {
    onDismiss=()=>{
        this.props.dispatch(hidepopmessage());
    }
    componentWillMount () {
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
                <Route exact path="/" component={()=>(<Redirect to="/index/chuzuche"/>)}/>
                <Route path="/index/:keyname" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/about/:keyname" component={About}/>
                <Route path="/systemsettings" component={SystemSetting}/>
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

                <Route component={App}/>
            </Switch>
        </div>);
    }

}

const mapStateToProps = ({app}) => {
    return {...app};
}
AppRoot = connect(mapStateToProps)(AppRoot);

export default AppRoot;
