import { createReducer } from 'redux-act';
import {
    getoftenuseaddress_result
} from '../actions';


const initial = {
    oftenuseaddress: {

    },
};

const oftenuseaddress = createReducer({
    [getoftenuseaddress_result]:(state, oftenuseaddress) => {
        return { ...state,...oftenuseaddress};
    },
}, initial.oftenuseaddress);

export default oftenuseaddress;
