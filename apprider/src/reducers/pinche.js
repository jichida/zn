import { createReducer } from 'redux-act';
import {
  getbuscarpool_result,
} from '../actions';


const initial = {
  pinche: {
    resultroute:[],
  },
};

const pinche = createReducer({
  [getbuscarpool_result]: (state, payload) => {
    const {list} = payload;
    let resultroute = [...list];
    return {
        ...state,
        resultroute
    };
  },
}, initial.pinche);

export default pinche;
