import { createReducer } from 'redux-act';
import {
  sethotcity,
  setcurcity,
  setcurselcity
} from '../actions';

let defaulthotcity = localStorage.getItem('defaulthotcity');
if(!defaulthotcity){
  defaulthotcity = [];
}

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
    hotcity: defaulthotcity,
    curcity: defaultcurcity,
    curselcity: defaultcurselcity,
  },
};

const city = createReducer({
  [sethotcity]:(state, hotcity) => {
    localStorage.setItem('defaulthotcity',hotcity);
    return { ...state,hotcity:[...hotcity]};
  },
  [setcurcity]:(state, curcity) => {
    localStorage.setItem('defaultcurcity',curcity);
    return { ...state,curcity:{...curcity}};
  },
  [setcurselcity]:(state, curselcity) => {
    localStorage.setItem('defaultcurselcity',curselcity);
    return { ...state,curselcity:{...curselcity}};
  },
}, initial.city);

export default city;
