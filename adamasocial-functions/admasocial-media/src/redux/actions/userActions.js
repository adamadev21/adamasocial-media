import axios from 'axios';
import {
  LOADING_UI,
MARK_NOTIFICATIONS_READ,
  SET_ERRORS, SET_LIKED_SCREAMS,
  CLEAR_ERRORS,GET_FRIENDS,
  SET_UNAUTHENTICATED,
  SET_USER, LOADING_USER, SET_SCREAMS, STOP_LOADING_UI, SEND_MESSAGE, GET_MESSAGES, GET_CONVERSATION, READ_MESSAGE
} from '../utils/types';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      '/login',
      userData
    )
    .then((res) => {
      setAuthorization(res.data.token);
      dispatch(getUserData());
      history.push('/');
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//*Sign User up
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      '/signup',
      newUserData
    )
    .then((res) => {
      setAuthorization(res.data.token);
      console.log(res.data.token)
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
export const getUserData = () => (dispatch) => {
  axios
    .get('/user')
    .then((res) => {
  //* Now i NEED to get the user's full data to display in profile
 dispatch({type: SET_USER, payload: res.data})
 dispatch(getFriends())
    })
    .catch((err) => {
      console.log(err);
    })
};


//* Upload profile image

export const uploadProfileImage = (formData) => (dispatch) =>{
  dispatch({type: LOADING_USER});
  axios.post("/user/image", formData)
  .then(()=>{
dispatch(getUserData())
  })
  .catch(err=>{
console.log(err.response.data)
  })
}

//* Edit user profile

export const editUserDetails = (userData) => (dispatch)=> {
  dispatch({type: LOADING_USER})
  axios.post("/user", userData)
  .then(res=>{
    dispatch(getUserData())
  })
  .catch(err=>{
    console.log(err.response.data)
  })
}

//*Get user details
export const getUserDetails = (userHandle)=>(dispatch)=>{
  dispatch({type: LOADING_UI});
  axios.get(`/user/${userHandle}`)
  .then(res=>{
    dispatch({type: SET_SCREAMS, payload: res.data.screams})
  })
  .catch(err=>{
    console.log(err);
    dispatch({type: SET_SCREAMS, payload: null})
  })
}
//* Set authorization

const setAuthorization = (token) => {
  let FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

//* Logout Route

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export  const markNotificationsRead = (notificationIds)=> (dispatch)=>{
  axios.post("/notifications",  notificationIds)
  .then(()=>{
    dispatch({type: MARK_NOTIFICATIONS_READ});
  }).catch(err=>console.log(err))
}

//* Messages

export const sendMessage = (recipient, msg)=> dispatch=>{
  dispatch({type: LOADING_UI});
  axios.post(`/messages/send/${recipient}`, msg)
  .then(res=>{
    dispatch({type: STOP_LOADING_UI});
    dispatch({type: SEND_MESSAGE, payload: res.data})
  })
  .catch(error=>{
    console.log(error)
    dispatch({type: STOP_LOADING_UI})
  })
}
export const getFriends = ()=>dispatch=>{
  axios.get(`/messages`).then(res=>{
    dispatch({type: GET_FRIENDS, payload: res.data})
  })
  .catch(err=>{
    console.log(err);
    dispatch({type: GET_FRIENDS, payload: []})
  })
}
export const getAllMessages =(friend)=>dispatch=>{
dispatch({type: GET_CONVERSATION, payload: friend})
}
export const markMessageRead = (friend)=>dispatch=>{
  axios.get(`/messages/${friend}/read`).then(res=>{
    dispatch({type: READ_MESSAGE, payload: friend})
  }).catch(err=>{
    console.log(err)
  });
}
export const getConversation = (friend)=> dispatch=>{
  dispatch({type:LOADING_UI});
  axios.get(`/messages/${friend}`).then(res=>{
    dispatch({type: GET_CONVERSATION, payload: res.data});
    dispatch({type: STOP_LOADING_UI})
  })
  .catch(err=>{
    console.log(err);
    dispatch({type: GET_MESSAGES, payload: []})
  })
}

//*Get liked screamse
export const getLikedScreams = (userHandle)=>dispatch=>{
  dispatch({type: LOADING_UI});
  axios.get(`/users/${userHandle}/likedScreams`)
  .then(res=>{
    dispatch({type: SET_LIKED_SCREAMS, payload: res.data})
    dispatch({type: STOP_LOADING_UI})
  })
  .catch(err=>{
    dispatch({type: STOP_LOADING_UI});
    console.log(err)
  })
}