import { createReducer } from 'redux-act';
import { ui_setsidebaropen,ui_setpagetype } from '../actions';

const initial = {
  appui:{
    home:{
      issidedbaropen:false,
      pagetype:'all'
    },
  }
};

const appui = createReducer({
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
