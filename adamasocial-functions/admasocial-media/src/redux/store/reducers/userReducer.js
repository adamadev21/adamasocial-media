import {
    LOADING_UI,
SET_AUTHENTICATED,
SET_ERRORS,
SET_UNAUTHENTICATED,
SET_USER,
LOADING_USER
} from '../../utils/types';

const initialState = {
    authenticated: false,
    userCredentials: {},
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
        default:
            return state;
    }
} 

export default userReducer;