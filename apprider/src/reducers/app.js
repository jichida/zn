import { createReducer } from 'redux-act';
import {
  showpopmessage,
  hidepopmessage,
    notify_socket_connected
} from '../actions';


const initial = {
  app: {
    socketconnected:false,
    type:'error',
    title:'',
    msg:'',
    ispop:false
  },
};

const app = createReducer({
  [notify_socket_connected]:(state,socketconnected)=>{
    return {...state,socketconnected};
  },
  [showpopmessage]:(state, payload) => {
    return { ...state,msg:payload.msg,title:payload.title,type:payload.type,ispop:true};
  },
  [hidepopmessage]:(state, payload) => {
    return { ...state,msg:'',title:'',ispop:false};
  },
}, initial.app);

export default app;
