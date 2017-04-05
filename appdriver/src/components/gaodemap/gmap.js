import React from 'react';
import {Map} from 'react-leaflet';
import L from 'leaflet';
import Script from 'react-load-script';
import 'leaflet/dist/leaflet.css';
import TileLayer from './gtilelayer.js';
window.initamaploaded = false;
L.Icon.Default.imagePath = 'images/';

export default class GMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isMapInited:window.initamaploaded};
  }
  componentDidUpdate() {
    if(this.state.isMapInited){
      window.leafletmap = this.getLeafletMap();
    }
  }
  componentWillUnmount() {
  }
  getLeafletMap() {
     return this.refs.leafletmap.leafletElement;
  }

  handleScriptCreate() {
  }

  handleScriptError() {
  }

  handleScriptLoad() {
    window.init = ()=>{
      this.setState({isMapInited:true});
      window.initamaploaded = true;
    };
  }
  render() {
    if(!this.state.isMapInited){
      return (<Script
      url="http://webapi.amap.com/maps?v=1.3&key=cfda29475356ae53b42ad57a1147061c&callback=init"
      onCreate={this.handleScriptCreate.bind(this)}
      onError={this.handleScriptError.bind(this)}
      onLoad={this.handleScriptLoad.bind(this)}
      />);
    }
    return (<Map {...this.props} ref='leafletmap'>
                <TileLayer/>
                {this.props.children}
            </Map>);
    }

};
