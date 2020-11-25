import {
  SUBMIT_COMMENT,
  LOADING_DATA,
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
MARK_NOTIFICATIONS_READ} from "../../utils/types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case DELETE_SCREAM:
      let index = state.screams.find(
        (scream) => scream.screamId !== action.payload.screamId
      );
      state.screams.splice(index, 1);
      return {
        ...state,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let indextoUpdate = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[indextoUpdate] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [ action.payload, ...state.scream.comments,],
        },
      };
 
    default:
      return state;
  }
};
export default dataReducer;
