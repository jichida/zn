import { createReducer } from 'redux-act';
import {
  //登录
    login_result,
    login_err,
    loginsendauth_result,
    logout_result,
    fillrealnameprofile_result
} from '../actions';

const initial = {
  userlogin:{
    loginsuccess:false,
    username:'',
    token:'',
    authtoken:'',
    registertype:'快车',
    profile:{},
  },
};

const userlogin = createReducer({
  [logout_result]: (state, payload) => {
    localStorage.removeItem('zhongnan_driver_token');
    return { ...initial.userlogin};
  },
  [login_result]: (state, payload) => {
    localStorage.setItem('zhongnan_driver_token',payload.token);
    return { ...state, ...payload,loginsuccess:true};
  },
  [fillrealnameprofile_result]: (state, payload) => {
    return { ...state, ...payload};
  },
  [loginsendauth_result]:(state,authtoken)=>{
    return { ...state, authtoken};
  }
}, initial.userlogin);

export default userlogin;
