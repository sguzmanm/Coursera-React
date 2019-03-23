import * as ActionTypes from './ActionTypes';

export const Promotions=function(state={
    isLoading:true,
    errMss:null,
    promotions:[]
},action)
{
    switch (action.type)
    {
        case ActionTypes.ADD_PROMOS:
            return {...state,isLoading:false,errMss:null,promotions:action.payload}
        case ActionTypes.PROMOS_LOADING:
            return {...state,isLoading:true,errMss:null,promotions:[]}
        case ActionTypes.PROMOS_FAILED:
            return {...state,isLoading:false,errMss:action.payload,promotions:[]}


        default: return state;
    }
}