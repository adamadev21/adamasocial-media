import {
    LOADING_UI,
SET_AUTHENTICATED,
GET_FRIENDS,
SET_UNAUTHENTICATED,
SET_USER,
LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM, MARK_NOTIFICATIONS_READ, SEND_MESSAGE, GET_MESSAGES, SET_LIKED_SCREAMS, READ_MESSAGE, GET_CONVERSATION
} from '../../utils/types';
import store from '../store';

const initialState = {
    authenticated: false,
    credentials: {},
    loading: false,
    likes: [],
    notifications: [],
    comments: [],
messages: [],
friends: [],
likedScreams: [],
conversation: []
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
            const scream = store.getState().data.screams[store.getState().data.screams.findIndex(sc=>sc.screamId===action.payload.screamId)]
            return {
                ...state,
                likedScreams: {...state.likedScreams, scream},
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
             };
        case SET_LIKED_SCREAMS:
            return {
                ...state, likedScreams: action.payload
            }
        case SEND_MESSAGE:
            return {
                ...state,
                conversation: [ ...state.conversation,action.payload]
            };
        case GET_MESSAGES:
            return {
                ...state, messages: action.payload
            };
        case GET_FRIENDS:
            return  {
            ...state, friends: action.payload
        };
        case GET_CONVERSATION:
         return {
             ...state, conversation: action.payload
         };
         case READ_MESSAGE:
             const mescop = [...state.messages]
             mescop.forEach(ms=>{
                 if (ms.sender===action.payload) ms.read=true })
             return {
                 ...state, messages: mescop
             };
        default:
            return state;
    }
} 

export default userReducer;