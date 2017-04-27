import { createReducer } from 'redux-act';
import {
  carcreate_result,
  cardelete_result,
  cargetall_result,
  carupdate_result,
  cargetallbrands_result,
  cargetallmodelfrombrandid_result,
  cargetallcolors_result,
} from '../actions';


const initial = {
  car: {

  },
};

const car = createReducer({
  [cargetallbrands_result]:(state,payload)=>{
    return {...state,...payload};
  },
}, initial.car);

export default car;
