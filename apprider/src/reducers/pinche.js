import { createReducer } from 'redux-act';
import {
  getbuscarpoolcitylist_result,
  getbuscarpool_result,
} from '../actions';


const initial = {
  pinche: {
    resultroute:[],
    citylist:[]
  },
};

const pinche = createReducer({
  [getbuscarpoolcitylist_result]: (state, payload) => {
    let citylist = [...payload];
    return {
            ...state,
            citylist
        };
  },
  [getbuscarpool_result]: (state, payload) => {
    let resultroute = [...payload];
    return {
        ...state,
        resultroute
    };
  },
}, initial.pinche);

export default pinche;
