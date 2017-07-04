import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import weui from './weui';
import app from './app';
import notifymessage from './messagecenter';
import userlogin from './userlogin';

export default combineReducers({
  app,
  notifymessage,
  userlogin,
  weui,
  form: formReducer,
  router: routerReducer
});
