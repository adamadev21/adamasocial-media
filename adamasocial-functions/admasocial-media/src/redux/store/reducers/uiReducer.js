import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS , STOP_LOADING_UI} from "../../utils/types"

const initialState = {
    loading: false,
    errors: null
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
        case STOP_LOADING_UI:
            return {
                ...state, loading: false
            }
        default: 
            return state;
}
}
export default uiReducer