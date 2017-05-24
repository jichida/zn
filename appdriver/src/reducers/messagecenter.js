import { createReducer } from 'redux-act';
import { getnotifymessage_result } from '../actions';

const perpagenumber = 10;//每页个数
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
