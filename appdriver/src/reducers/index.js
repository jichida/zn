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
import { routerReducer } from 'react-router-redux';

export default combineReducers({
        about,
        app,
        appui,
        userlogin,
        emerygencycontact,
        oftenuseaddress,
        operate,
        carmap,
        driveroute,
        myorders,
        orderdetail,
        form: formReducer,
        router: routerReducer
    }
);
