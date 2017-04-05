
import {GridLayer} from 'react-leaflet';
import GTileLayer from './leaflet.gaodetilelayer.js';

export default class TileLayer extends GridLayer {
  componentWillMount () {
    super.componentWillMount();
    this.leafletElement = GTileLayer.CreateGTileLayer('GaoDe.Normal.Map',{
    maxZoom: 18,
    minZoom: 5,


    });
  }

}
