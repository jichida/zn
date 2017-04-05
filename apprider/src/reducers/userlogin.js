import { createReducer } from 'redux-act';
import {
  //登录
    login_result,
    login_err,
    loginsendauth_result,
    fillprofile_result,
    logout_result,
} from '../actions';

const initial = {
  userlogin:{
    loginsuccess:false,
    username:'',
    token:'',
    authtoken:'',
    profile:{},
  },
};

const userlogin = createReducer({
  [logout_result]: (state, payload) => {
    localStorage.removeItem('zhongnan_rider_token');
    return { ...initial.userlogin};
  },
  [fillprofile_result]: (state, {profile}) => {
    return { ...state, profile};
  },
  [login_result]: (state, payload) => {
    localStorage.setItem('zhongnan_rider_token',payload.token);
    return { ...state, ...payload,loginsuccess:true};
  },
  [login_err]: (state, authtoken) => {
    return { ...state, loginsuccess:false};
  },
  [loginsendauth_result]:(state,authtoken)=>{
    return { ...state, authtoken};
  }
}, initial.userlogin);

export default userlogin;
