import { createReducer } from 'redux-act';
import {
    getemerygencycontact_result,
    getphoneconcatlist,
} from '../actions';
import {normalizr_emerygencycontactlist} from './normalizr';

const initial = {
    emerygencycontact: {
        myconcatlist:[],
        phoneconcatlist:[],
    },
};

const emerygencycontact = createReducer({
    [getphoneconcatlist]:(state,payload)=>{
      let phoneconcatlist = [...payload];
      return {...state,phoneconcatlist};
    },
    [getemerygencycontact_result]:(state, payload) => {
        let myconcatlist = [...payload.list];
        return {...state,myconcatlist};
    },
}, initial.emerygencycontact);

export default emerygencycontact;
