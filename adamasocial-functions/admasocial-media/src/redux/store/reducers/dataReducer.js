import { LOADING_DATA, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM } from "../../utils/types";

const initialState = {
   screams:[],
   scream:{},
   loading: false
}

const dataReducer = (state=initialState, action)=>{
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state, loading:true
            };
        case SET_SCREAMS:
            return {
                ...state, screams: action.payload,loading:false
            };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.scream.findIndex(scream=> scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            return {
...state
            };
        default:
            return state
    }
        
}
export default dataReducer;