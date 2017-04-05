import { createReducer } from 'redux-act';
import { getabouthtml_result } from '../actions';

const perpagenumber = 10;//每页个数
const initial = {
  messagecenter: {
    'messagelistquery':{
      query:{},
      options:{
        page: 1,
        limit: perpagenumber,
      }
    },
    'messagelistresult':{
      page:1,
      limit:0,
      docs:[]
    },
    displaypage:1
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
