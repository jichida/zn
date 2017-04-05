import React from 'react';
import { connect } from 'react-redux';
import {ui_setsidebaropen,ui_setpagetype} from '../actions';
import {
  Route,
  Switch
} from 'react-router-dom';

import {
  Container,View
} from 'amazeui-touch';

var Sidebar = require('react-sidebar').default;
import Myprofile from './myprofile';
import Home from './home';

export class AppIndex extends React.Component {
  renderOC =()=> {
    return (<Myprofile />);
  }
  onSetSidebarOpen(open){
    this.props.dispatch(ui_setsidebaropen(open));
  }
  onClickPage(page){
    this.props.history.replace('/index/'+page);
    this.props.dispatch(ui_setpagetype(page));

  }
  onClickPagePush(page){
    this.props.history.push(page);
  }
  render() {
    console.log("thisprops:" + JSON.stringify(this.props));
    const {issidedbaropen,match,location,history} = this.props;
    let pathnamelist = [
      {
        keyname:'all',
        title:'全部',
        Co:<Home  {...this.props}/>
      },
      {
        keyname:'realtime',
        title:'实时',
        Co:<Home  {...this.props}/>
      },
      {
        keyname:'appointment',
        title:'预约',
        Co:<Home  {...this.props}/>
      },
    ];
    let Co = null;
    let currentkeyname = match.params.keyname;
    if(!currentkeyname || currentkeyname===''){
      currentkeyname = pathnamelist[0].keyname;
      Co = pathnamelist[0].Co;
    }

    let navlinkco = [];
    let title = '';
    pathnamelist.forEach((cur)=>{
      if(cur.keyname === currentkeyname){
        title = cur.title;
        Co = cur.Co;
        navlinkco.push(<li onClick={this.onClickPage.bind(this,cur.keyname)} key={cur.keyname} className="hover" >{cur.title}</li>);
      }
      else{
        navlinkco.push(<li onClick={this.onClickPage.bind(this,cur.keyname)} key={cur.keyname} >{cur.title}</li>);
      }
      navlinkco.push(' ');
    });
    return (
      <Sidebar sidebar={this.renderOC()}
                     open={issidedbaropen}
                     docked={false}
                     touch={false}
                     onSetOpen={this.onSetSidebarOpen.bind(this)}
                     >
      <View style={{zIndex: 0}}>
        <header className="navbar">
              <h2 className="navbar-title navbar-center"><font><font>中南出行</font></font></h2>
              <div onClick={this.onSetSidebarOpen.bind(this,true)} className="navbar-nav navbar-left"><a  className="navbar-nav-item"><span className="icon icon-user navbar-icon navbar-icon-sibling-of-title fize22 padding-t10"></span></a></div>
              <div onClick={this.onClickPagePush.bind(this,'/messagecenter')} className="navbar-nav navbar-right"><a  className="navbar-nav-item"><span className="icon icon-xx navbar-icon navbar-icon-sibling-of-title fize22 padding-t10"></span></a></div>
            </header>
            <div className="tab">
              <ul className="list margin-top-0">
                  {navlinkco}
    		      </ul>
            </div>
         <Container scrollable={true}>
          {Co}
          </Container>
        </View>
      </Sidebar>
        );
      }
}

const mapStateToProps = ({appui}) => {
  return appui.home;
}
AppIndex = connect(mapStateToProps)(AppIndex);
export default AppIndex;
