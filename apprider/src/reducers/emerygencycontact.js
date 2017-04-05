import { createReducer } from 'redux-act';
import {
    getemerygencycontact_result,

} from '../actions';
import {normalizr_emerygencycontactlist} from './normalizr';

const initial = {
    emerygencycontact: {
        concatlist:[],
        emerygencycontacts:{

        }
    },
};

const emerygencycontact = createReducer({
    [getemerygencycontact_result]:(state, list) => {
        let newemerygencycontactlist = normalizr_emerygencycontactlist(list);
        return {...state,...newemerygencycontactlist};
    },
}, initial.emerygencycontact);

export default emerygencycontact;
