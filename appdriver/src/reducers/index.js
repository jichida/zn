import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import about from './about';
import app from './app';
import appui from './appui';
import userlogin from './userlogin';
import emerygencycontact from './emerygencycontact';
import oftenuseaddress from './oftenuseaddress';
import operate from './operate';
import carmap from './carmap';
import driveroute from './driveroute';
import myorders from './myorders';
import orderdetail from './orderdetail';
import car from './car';
import registerfillwizard from './registerfillwizard';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
        about,
        app,
        appui,
        car,
        userlogin,
        emerygencycontact,
        oftenuseaddress,
        operate,
        carmap,
        driveroute,
        myorders,
        orderdetail,
        registerfillwizard,
        form: formReducer,
        router: routerReducer
    }
);
