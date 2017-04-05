// gettourbus
import { createReducer } from 'redux-act';
import {
  gettourbus_result,
} from '../actions';


const initial = {
  lvyoudaba: {
    buslist:[],
  },
};

const lvyoudaba = createReducer({
  [gettourbus_result]: (state, payload) => {
    let buslist = [...payload];
    return {
            ...state,
            buslist
        };
  },
}, initial.lvyoudaba);

export default lvyoudaba;
