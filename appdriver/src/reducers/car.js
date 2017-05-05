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
    carlist:[],
  },
};

const car = createReducer({
  [cargetall_result]:(state,payload)=>{
    const {list:carlist} = payload;
    return {...state,carlist};
  },
  [cargetallbrands_result]:(state,payload)=>{
    return {...state,...payload};
  },
}, initial.car);

export default car;
