import React from 'react';
import {connect} from 'react-redux';
import browserHistory from '../util/nav.js';
//import { pushState } from 'redux-react-router';

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth(this.props.loginsuccess);
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.loginsuccess);
        }

        checkAuth (isAuthenticated) {
            if (!isAuthenticated) {
                let redirectAfterLogin = this.props.location.pathname;
                let loginroute = '/login?next=' + redirectAfterLogin;
                window.setTimeout(()=>{
                  browserHistory.replace(loginroute);
                },0);
              //  this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
            }
        }

        render () {
            return (
                <div>
                    {this.props.loginsuccess === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    const mapStateToProps =  (state, props) =>{
      let page = {};
      if(state.pagereducer.hasOwnProperty('loginpage')){
        page = state.pagereducer['loginpage'];
      }

      if(!page.hasOwnProperty('loginsuccess')){
        page.loginsuccess = false;
      }
      page.loginsuccess = true;
      return Object.assign({},page);
    };

    return connect(mapStateToProps)(AuthenticatedComponent);

}
