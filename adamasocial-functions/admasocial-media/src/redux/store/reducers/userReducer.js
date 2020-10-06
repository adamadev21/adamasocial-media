import {
    LOADING_UI,
SET_AUTHENTICATED,
SET_ERRORS,
SET_UNAUTHENTICATED,
SET_USER,
LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM
} from '../../utils/types';

const initialState = {
    authenticated: false,
    credentials: {},
    loading: false,
    likes: [],
    notifications: [],
    comments: []

};

const userReducer = (state=initialState, action)=>{
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state, authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state, loading: true
            };
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes, {
                        userHandle:state.credentials.handle,
                        screamId:action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(like=> like.screamId !== action.payload.screamId)
            }
        default:
            return state;
    }
} 

export default userReducer;