import React from 'react';
import ReactDOM from 'react-dom';
import Root from './env/root';
import store,{sagaMiddleware} from './env/store';
import rootSaga from './sagas';
import {
    postNotifyFromJPush
} from './env/jpush';

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);

sagaMiddleware.run(rootSaga);

postNotifyFromJPush(store.dispatch);
