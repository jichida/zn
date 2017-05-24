import { createReducer } from 'redux-act';
import {
    getemerygencycontact_result,
    getphoneconcatlist,
} from '../actions';
import {normalizr_emerygencycontactlist} from './normalizr';

const initial = {
    emerygencycontact: {
        concatlist:[],
        emerygencycontacts:{

        },
        phoneconcatlist:[],
    },
};

const emerygencycontact = createReducer({
    [getphoneconcatlist]:(state,payload)=>{
      let phoneconcatlist = [...payload];
      return {...state,phoneconcatlist};
    },
    [getemerygencycontact_result]:(state, list) => {
        let newemerygencycontactlist = normalizr_emerygencycontactlist(list);
        return {...state,...newemerygencycontactlist};
    },
}, initial.emerygencycontact);

export default emerygencycontact;
