import { createReducer } from 'redux-act';
import {
  setcurcity,
  setcurselcity
} from '../actions';


let defaultcurcity = localStorage.getItem('defaultcurcity');
if(!defaultcurcity){
  defaultcurcity = {
              "cityname": "常州",
              "zipcode": "0519",
              "pinyin": "Changzhou"
          };
}

let defaultcurselcity = localStorage.getItem('defaultcurselcity');
if(!defaultcurselcity){
  defaultcurselcity = {
    "cityname": "南京",
    "zipcode": "025",
    "pinyin": "Nanjing"
  };
}


const initial = {
  city: {
    curcity: defaultcurcity,
    curselcity: {
    "cityname": "南京",
    "zipcode": "025",
    "pinyin": "Nanjing"
  },
  },
};

const city = createReducer({
  [setcurcity]:(state, curcity) => {
    localStorage.setItem('defaultcurcity',curcity);
    return { ...state,curcity:{...curcity}};
  },
  // [setcurselcity]:(state, curselcity) => {
  //   localStorage.setItem('defaultcurselcity',curselcity);
  //   return { ...state,curselcity:{...curselcity}};
  // },
}, initial.city);

export default city;
