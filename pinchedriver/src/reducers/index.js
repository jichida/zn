import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import weui from './weui';

export default combineReducers({
        weui,
        form: formReducer,
        router: routerReducer
    }
);
