import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import about from './about';
import app from './app';
import appui from './appui';
import userlogin from './userlogin';
import pinche from './pinche';
import emerygencycontact from './emerygencycontact';
import city from './city';
import oftenuseaddress from './oftenuseaddress';
import search from './search';
import carmap from './carmap';
import lvyoudaba from './lvyoudaba';
import myorders from './myorders';
import orderdetail from './orderdetail';
import orderconfirm from './orderconfirm';
import weui from "./weui";

import { routerReducer } from 'react-router-redux';

export default combineReducers({
        about,
        app,
        appui,
        userlogin,
        pinche,
        emerygencycontact,
        city,
        oftenuseaddress,
        search,
        carmap,
        lvyoudaba,
        myorders,
        orderdetail,
        orderconfirm,
        weui,
        form: formReducer,
        router: routerReducer
    }
);
