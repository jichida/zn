import React from 'react';
import ReactDOM from 'react-dom';
import Root from './env/root';
import store,{sagaMiddleware} from './env/store';
import rootSaga from './sagas';
import {handleChange} from './sagas/subscribereduxstate';
import {
    postNotifyFromJPush
} from './env/jpush';

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

sagaMiddleware.run(rootSaga);

store.subscribe(handleChange);

postNotifyFromJPush(store.dispatch);
