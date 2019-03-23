import { LEADERS } from '../shared/leaders';
import { actionTypes } from 'react-redux-form';
import * as ActionTypes from './ActionTypes';

export const Leaders=function(state={
    isLoading:false,
    errMss:'',
    leaders:[]
},action)
{
    switch (action.type)
    {
        case ActionTypes.ADD_LEADERS:
            return{
                ...state,
                isLoading:false,
                errMss:null,
                leaders:action.payload
            }
        case ActionTypes.LEADERS_FAILED:
            return{
                ...state,
                isLoading:false,
                errMss:action.payload,
                leaders:[]
            }
        case ActionTypes.LEADERS_LOADING:
            return{
                ...state,
                isLoading:true,
                errMss:null,
                leaders:[]
            }


        default: return state;
    }
}