import {
    LOADING_UI,
SET_AUTHENTICATED,
GET_FRIENDS,
SET_UNAUTHENTICATED,
SET_USER,
LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM, MARK_NOTIFICATIONS_READ, SEND_MESSAGE, GET_MESSAGES
} from '../../utils/types';

const initialState = {
    authenticated: false,
    credentials: {},
    loading: false,
    likes: [],
    notifications: [],
    comments: [],
messages: [],
friends: []
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
            };
            case MARK_NOTIFICATIONS_READ: 
             
             return {
                 ...state, notifications : state.notifications.forEach(not => not.read = true)
             }
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [ ...state.messages,action.payload]
            };
        case GET_MESSAGES:
            return {
                ...state, messages: action.payload
            };
        case GET_FRIENDS:
            return  {
            ...state, friends: action.payload
        }
        default:
            return state;
    }
} 

export default userReducer;