import { createReducer } from 'redux-act';
import { getabouthtml_result } from '../actions';

const initial = {
  about: {
    'userguide':{
      title:'用户指南',
      desc:'乘客端用户指南'
    },
    'feerules':{
      title:'计费规则',
      desc:'乘客端计费规则'
    },
    'raws':{
      title:'法律条款',
      desc:'乘客端法律条款'
    }
  },
};

const about = createReducer({
  [getabouthtml_result]: (state, {aboutdoc}) => {
    return { ...state,
         about:{
            ...state.about,
            [aboutdoc.keyname]:{
              title:aboutdoc.title,
              desc:aboutdoc.desc,
            }
          }
        };
  },
}, initial.about);

export default about;
