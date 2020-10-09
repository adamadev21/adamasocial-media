import axios from 'axios';
import {
  LOADING_UI,
MARK_NOTIFICATIONS_READ,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  SET_USER, LOADING_USER, SET_SCREAMS
} from '../utils/types';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      'http://localhost:5001/admasocial-media/us-central1/api/login',
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
      'http://localhost:5001/admasocial-media/us-central1/api/signup',
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
  dispatch({type: LOADING_USER})
  axios
    .get('http://localhost:5001/admasocial-media/us-central1/api/user')
    .then((res) => {
  //* Now i NEED to get the user's full data to display in profile
 dispatch({type: SET_USER, payload: res.data})
    })
    .catch((err) => {
      console.log(err);
    })
};


//* Upload profile image

export const uploadProfileImage = (formData) => (dispatch) =>{
  dispatch({type: LOADING_USER});
  axios.post("http://localhost:5001/admasocial-media/us-central1/api/user/image", formData)
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
  axios.post("http://localhost:5001/admasocial-media/us-central1/api/user", userData)
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
  axios.get(`http://localhost:5001/admasocial-media/us-central1/api/user/${userHandle}`)
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
  axios.post("http://localhost:5001/admasocial-media/us-central1/notifications",  notificationIds)
  .then(()=>{
    dispatch({type: MARK_NOTIFICATIONS_READ});
  }).catch(err=>console.log(err))
}