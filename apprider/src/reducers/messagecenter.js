import { createReducer } from 'redux-act';
import { getnotifymessage_result } from '../actions';

const initial = {
  messagecenter: {
    messagelist:[]
  },
};

const messagecenter = createReducer({
  [getnotifymessage_result]: (state,payload) => {
    let messagelist = payload.list.docs;
    return { ...state,messagelist};
  },
}, initial.messagecenter);

export default messagecenter;
