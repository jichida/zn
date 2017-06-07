import { createReducer } from 'redux-act';
import {
  nav_drawroute
} from '../actions';

const initial = {
    driveroute: {
      drawroute:false,
      totaldistancetxt:'',
      totaldurationtxt:'',
      instruction:'',
      latlngs:[]
    },
};

const driveroute = createReducer({
    [nav_drawroute]:(state,payload)=>{
      console.log("reducer nav_drawroute..." + JSON.stringify(payload));
      return {...state,...payload};
    },
}, initial.driveroute);

export default driveroute;
