import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import {createForms} from 'react-redux-form';
import {Dishes} from './dishes.js';
import {Comments} from './comments.js';
import {Promotions} from './promotions.js';
import {Leaders} from './leaders.js';
import { initialFeedback } from './Forms.js';


export const ConfigureStore=()=>{
    const store=createStore(
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            promotions:Promotions,
            leaders:Leaders,
            ...createForms({
                feedback:initialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}