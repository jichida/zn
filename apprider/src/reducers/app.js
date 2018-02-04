import { createReducer } from 'redux-act';
import {
  notify_socket_connected,
  getsystemconfig_result,
  setisweixininstalled
} from '../actions';


const initial = {
  app: {
    socketconnected:false,
    type:'error',
    title:'',
    msg:'',
    ispop:false,
    pinchecitylist:[],
    isweixininstalled:false,
    hotcity:[],
    servicephonenumber:'',
    daijiacancelprice:50,
    daijialeastbalance:50,
    downloadurl_android:null,
    downloadurl_ios:null
  },
};

const app = createReducer({
  [setisweixininstalled]: (state, isweixininstalled) => {
      return { ...state, isweixininstalled };
  },
  [getsystemconfig_result]:(state,payload)=>{
    return {...state,...payload};
  },
  [notify_socket_connected]:(state,socketconnected)=>{
    return {...state,socketconnected};
  },
}, initial.app);

export default app;
