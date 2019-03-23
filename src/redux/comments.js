import * as ActionTypes from './ActionTypes';


export const Comments=function(state={
    errMss:null,
    comments:[]
},action)
{
    switch (action.type)
    {
        case ActionTypes.ADD_COMMENTS:
            return {...state,isLoading:false,errMss:null,comments:action.payload}

        case ActionTypes.COMMENTS_FAILED:
            return {...state,isLoading:false,errMss:action.payload,comments:[]}

        case ActionTypes.ADD_COMMENT:
            var comment=action.payload;
            return {...state, comments:state.comments.concat(comment)};
        default: return state;
    }
}