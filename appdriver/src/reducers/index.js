import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import app from './app';
import appui from './appui';
import userlogin from './userlogin';
import operate from './operate';
import carmap from './carmap';
import driveroute from './driveroute';
import myorders from './myorders';
import orderdetail from './orderdetail';
import car from './car';
import registerfillwizard from './registerfillwizard';
import createcarwizard from './createcarwizard';
import withdraw from './withdraw';
import weui from './weui';
import messagecenter from './messagecenter';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
        app,
        appui,
        car,
        createcarwizard,
        userlogin,
        operate,
        carmap,
        driveroute,
        myorders,
        withdraw,
        orderdetail,
        registerfillwizard,
        weui,
        messagecenter,
        form: formReducer,
        router: routerReducer
    }
);
