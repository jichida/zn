import React from 'react';
import { connect } from 'react-redux';
import Myprofile from './myprofile';
import {
    ui_setsidebaropen,
    ui_setindexmapvisiable,
    carmap_settriptype
} from '../actions';
import {
  Route,
  Switch
} from 'react-router-dom';

import {
  Container,View
} from 'amazeui-touch';
import Lvyoudaba from './lvyoudaba';
import Pinche from './pinche';
import CarOverlayEmbedded from './maps/caroverlaymbedded';

var Sidebar = require('react-sidebar').default;


export class AppIndex extends React.Component {
  renderOC =()=> {
    return (<Myprofile />);
  }
  onSetSidebarOpen(open){
    this.props.dispatch(ui_setsidebaropen(open));
  }
  onClickPage(page){
    this.props.history.replace('/index/'+page);
    if(page === 'chuzuche'){
      this.props.dispatch(carmap_settriptype('出租车'));
    }
    else if(page === 'kuaiche'){
      this.props.dispatch(carmap_settriptype('快车'));
    }
    else if(page === 'daijia'){
      this.props.dispatch(carmap_settriptype('代驾'));
    }
  }
  onClickPagePush(page){
    this.props.history.push(page);
  }
  componentWillMount () {
    this.props.dispatch(ui_setindexmapvisiable(true));
  }
  componentWillReceiveProps (nextprop) {
    if(nextprop.match.params.keyname !== this.props.match.params.keyname){
      const {match} = nextprop;
      let currentkeyname = match.params.keyname;
      if(currentkeyname==='chuzuche' || currentkeyname==='kuaiche' || currentkeyname==='daijia'){
        this.props.dispatch(ui_setindexmapvisiable(true));
      }
      else{
        this.props.dispatch(ui_setindexmapvisiable(false));
      }
    }
  }
  componentWillUnmount () {
    this.props.dispatch(ui_setindexmapvisiable(false));
  }
  render() {
    console.log("thisprops:" + JSON.stringify(this.props));
    const {issidedbaropen,match,location,history} = this.props;
    let pathnamelist = [
      {
        keyname:'chuzuche',
        title:'出租车',
        Co:<CarOverlayEmbedded {...this.props}/>
      },
      {
        keyname:'kuaiche',
        title:'快车',
        Co:<CarOverlayEmbedded {...this.props}/>
      },
      {
        keyname:'pinche',
        title:'拼车',
        Co:<Pinche {...this.props}/>
      },
      {
        keyname:'lvyoudaba',
        title:'旅游大巴',
        Co:<Lvyoudaba {...this.props}/>
      },
      {
        keyname:'daijia',
        title:'代驾',
        Co:<CarOverlayEmbedded {...this.props}/>
      }
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
