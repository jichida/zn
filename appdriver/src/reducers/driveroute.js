import { createReducer } from 'redux-act';
import {
  driveroute_result
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
    [driveroute_result]:(state,payload)=>{
      return {...state,...payload};
    },
}, initial.driveroute);

export default driveroute;
