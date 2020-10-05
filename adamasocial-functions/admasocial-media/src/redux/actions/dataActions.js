import { LIKE_SCREAM, LOADING_DATA, SET_SCREAM , SET_SCREAMS, UNLIKE_SCREAM} from "../utils/types"
import axios from 'axios'
//*Get all screams
export const getScreams = ()=> (dispatch)=>{
    dispatch({type: LOADING_DATA});
    axios.get("http://localhost:5001/admasocial-media/us-central1/api/screams")
    .then(res=>{
        dispatch({
            type: SET_SCREAMS,
            payload:res.data
        })
    })
    .catch(err=>{
        console.log(err);
        dispatch({type: SET_SCREAMS, payload: []})
    })
}
//*Get a specific scream


export const getOneScream = () => (dispatch) => {
    dispatch({type: LOADING_DATA})
    axios
      .get('http://localhost:5001/admasocial-media/us-central1/api/scream')
      .then((res) => {
    //* Now i NEED to get the full data to display
   dispatch({type: SET_SCREAM, payload: res.data})
      })
      .catch((err) => {
        console.log(err);
      })
  };
export const likeScream = (screamId)=> (dispatch)=>{
    axios.get(`http://localhost:5001/admasocial-media/us-central1/api/scream/${screamId}/like`)
    .then(res=>{
        dispatch({type: LIKE_SCREAM, payload: res.data})
    })
    .catch(err=>{
        console.log(err);
    })
}

export const unlikeScream = (screamId)=> (dispatch)=>{
    axios.get(`http://localhost:5001/admasocial-media/us-central1/api/scream/${screamId}/unlike`)
    .then(res=>{
        dispatch({type: UNLIKE_SCREAM, payload: res.data})
    })
    .catch(err=>{
        console.log(err);
    })
}