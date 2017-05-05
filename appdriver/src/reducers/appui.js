import { createReducer } from 'redux-act';
import { ui_setsidebaropen,ui_setpagetype,ui_isdateopen,ui_outcarselregistertype } from '../actions';

const initial = {
  appui:{
    isdateopen:false,
    pageregistertype:'快车',
    home:{
      issidedbaropen:false,
      pagetype:'all'
    },
  }
};

const appui = createReducer({
  [ui_outcarselregistertype]:(state,payload)=>{
    return {...state,pageregistertype:payload};
  },
  [ui_isdateopen]: (state, isdateopen) => {
    return {...state,isdateopen};
  },
  [ui_setsidebaropen]: (state, issidedbaropen) => {
    return {
            ...state,
            home:{
              ...state.home,
              issidedbaropen,
            }
        };
  },
  [ui_setpagetype]: (state, pagetype) => {
    return {
            ...state,
            home:{
              ...state.home,
              pagetype,
            }
        };
  },
}, initial.appui);

export default appui;
