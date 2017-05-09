import { createReducer } from 'redux-act';
import { getabouthtml_result } from '../actions';

const initial = {
  about: {
    'rideruserguide':{
      title:'',
      desc:''
    },
    'riderfeerules':{
      title:'',
      desc:''
    },
    'riderlaws':{
      title:'',
      desc:''
    },
    'ridercancelrules':{
      title:'',
      desc:''
    },
    'ridergroup':{
      title:'',
      desc:''
    }
  },
};

const about = createReducer({
  [getabouthtml_result]: (state, {aboutdoc}) => {
    return { ...state,
            [aboutdoc.keyname]:{
              title:aboutdoc.title,
              desc:aboutdoc.desc,
            }
        };
  },
}, initial.about);

export default about;
