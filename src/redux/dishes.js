import * as ActionTypes from './ActionTypes';
export const Dishes=function(state={
    isLoading:true,
    errMss:null,
    dishes:[]
},action)
{
    switch (action.type)
    {
        case ActionTypes.ADD_DISHES:
            return {...state,isLoading:false,errMss:null,dishes:action.payload}
        case ActionTypes.DISHES_LOADING:
            return {...state,isLoading:true,errMss:null,dishes:[]}

        case ActionTypes.DISHES_FAILED:
            return {...state,isLoading:false,errMss:action.payload,dishes:[]}


        default: return state;
    }
}