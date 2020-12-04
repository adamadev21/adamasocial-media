import { SET_MOBILE, SET_DESKTOP, CLEAR_ERRORS, LOADING_UI, SET_ERRORS , STOP_LOADING_UI, SET_MESSAGES} from "../../utils/types"

const initialState = {
    loading: false,
    errors: null,
    isMobile: false,
    message: false,
}
const uiReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_ERRORS:
            return {
                ...state, errors: action.payload, 
                loading: false
            }
        case CLEAR_ERRORS: 
            return {
            ...state, errors: null,
                loading: false
        }
        case LOADING_UI:
            return {
                ...state, loading: true,
            };
        case SET_MOBILE:
            return {
                ...state, isMobile: true
            };
        case SET_MESSAGES:
            return {
                ...state, message: action.payload
            }
        case SET_DESKTOP:
            return {...state, isMobile: false}
        case STOP_LOADING_UI:
            return {
                ...state, loading: false
            }
        default: 
            return state;
}
}
export default uiReducer