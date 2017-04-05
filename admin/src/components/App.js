import React from 'react';
import { connect } from 'react-redux';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import '../../public/transitions.css';
import NotificationSystem from 'react-notification-system';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this._notificationSystem = null;
  }
  componentWillMount () {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.showpop && this._notificationSystem){
      this.props.onUpdatePage('apppage_showpop',false);
      this._notificationSystem.addNotification({
         position:'tc',
         message: nextProps.popmessage,
         level: nextProps.level
      });
    }
  }

  render() {
    return (<div>
       {this.props.children}
        <NotificationSystem ref="notificationSystem" onRemove={
          ()=>{
            this.props.onUpdatePage('apppage_showpop',false);
          }
        }  ref={(ref) => {this._notificationSystem = ref;}}/>
      </div>);
    // return (
    //     <ReactCSSTransitionGroup
    //     transitionName="slideInDown"
    //     transitionEnterTimeout={400}
    //     transitionLeaveTimeout={400}
    //   >
    //     {this.props.children && cloneElement(this.props.children, {
    //       key: this.props.location.pathname
    //     })}
    //   </ReactCSSTransitionGroup>
    //
    // );

  }
}



const mapStateToProps = (state,props) => {
  let page = {};
  if(state.pagereducer.hasOwnProperty('apppage')){
      page = state.pagereducer['apppage'];
  }
  if(!page.hasOwnProperty('showpop')){
    page.showpop = false;
  }
  if(!page.hasOwnProperty('popmessage')){
    page.popmessage = '';
  }
  if(!page.hasOwnProperty('level')){
    page.level = 'info';
  }
  return Object.assign({},page);
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePage:(type,v)=>{
      dispatch({ type:type ,data:v});
    },
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
