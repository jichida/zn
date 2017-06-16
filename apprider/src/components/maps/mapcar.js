import React from 'react';
import { connect } from 'react-redux';

import {
  carmapshow_createmap,
  carmapshow_destorymap,
} from '../../actions';

import "../../../public/newcss/mapcontainer.css";

class Page extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
    componentWillMount () {
      console.log('地图---->componentWillMount---------');
    }
    componentWillUnmount(){
      console.log('地图---->componentWillUnmount---------');
      this.props.dispatch(carmapshow_destorymap());
    }
    componentDidMount () {
      console.log('地图---->componentDidMount---------');
      this.props.dispatch(carmapshow_createmap());
   }

    render() {
        console.log('地图---->render---------');
        return (
            <div className="mapcontainer">
                <div id="gaodemap" />
            </div>
        );
    }
}


export default connect()(Page);
