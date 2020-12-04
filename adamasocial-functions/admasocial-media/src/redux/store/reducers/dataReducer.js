import {
  SUBMIT_COMMENT,
  LOADING_DATA,
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
MARK_NOTIFICATIONS_READ,
EDIT_POST,
DELETE_COMMENT,
SHARE_SCREAM,
SET_PROFILE} from "../../utils/types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
  profile: {}
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
    case SET_PROFILE:
      return {
        ...state, profile: action.payload
      }
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case EDIT_POST:
      const screamId = action.payload.screamId;
      const screamIndex = state.screams.findIndex(scream=> scream.screamId===screamId);
      const updatedScreams= [...state.screams]
      updatedScreams[screamIndex]=action.payload
      return {
        ...state,
        screams: updatedScreams
      }
    case DELETE_SCREAM:
      let index = state.screams.find(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams.splice(index, 1);
      return {
        ...state,
      };
    case DELETE_COMMENT:
      const commentCount = state.scream.commentCount--;
      const comments = [...state.scream.comments].filter(comment=>comment.commentId!==action.payload)
      return {
        ...state, scream: {...state.scream, commentCount: commentCount, comments}
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let indextoUpdate = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      const screamCopy = [...state.screams]
      screamCopy[indextoUpdate] = action.payload;
     return {
       ...state, screams: screamCopy, scream: {...state.scream, likeCount: action.payload.likeCount}
     }
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case SUBMIT_COMMENT:
const theIndex =  state.screams.findIndex(sc=>sc.screamId===action.payload.screamId);
const screamsCopy = [...state.screams]
screamsCopy[theIndex].commentCount ++;
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [ action.payload, ...state.scream.comments,],
          commentCount: state.scream.commentCount+1
        },
        screams: screamsCopy
      };
    case SHARE_SCREAM:
      return {
        ...state, screams: [action.payload, ...state.screams]
      }
 
    default:
      return state;
  }
};
export default dataReducer;
