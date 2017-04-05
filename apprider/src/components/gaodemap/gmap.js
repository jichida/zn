import React from 'react';
import {Map,ImageOverlay} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TileLayer from './gtilelayer.js';
L.Icon.Default.imagePath = 'images/';

export default class GMap extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
      window.leafletmap = this.getLeafletMap();
  }
  componentWillUnmount() {
  }
  getLeafletMap() {
     return this.refs.leafletmap.leafletElement;
  }

  render() {
    return (<Map {...this.props} ref='leafletmap'>
        <TileLayer/>
                {this.props.children}
            </Map>);
    }

};
