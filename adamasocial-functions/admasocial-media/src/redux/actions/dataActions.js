import { STOP_LOADING_UI, DELETE_SCREAM, LIKE_SCREAM, LOADING_DATA, LOADING_UI, POST_SCREAM, SET_ERRORS, SET_SCREAM , SET_SCREAMS, UNLIKE_SCREAM} from "../utils/types"
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


// export const getOneScream = () => (dispatch) => {
//     dispatch({type: LOADING_DATA})
//     axios
//       .get('http://localhost:5001/admasocial-media/us-central1/api/scream')
//       .then((res) => {
//     //* Now i NEED to get the full data to display
//    dispatch({type: SET_SCREAM, payload: res.data})
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   };
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


//*Delete a scream
export const deleteScream = (screamId) =>(dispatch)=>{
axios.get(`http://localhost:5001/admasocial-media/us-central1/api/scream/${screamId}/delete`)
.then(res=>{
dispatch({type: DELETE_SCREAM ,payload: res.data})
})
.catch(err=>{
    console.log(err)
})
}

//*Post a scream
export const postScream =(newScream)=> (dispatch)=>{
    dispatch({type: LOADING_UI})
axios.post("http://localhost:5001/admasocial-media/us-central1/api/screams", newScream)
.then(res=>{
    dispatch({type: POST_SCREAM,  payload:res.data});
})
.catch(err=>{
    dispatch({type: SET_ERRORS, payload:err.response.data})
})
}

export const getOneScream =(screamId) => (dispatch)=>{
    dispatch({type: LOADING_UI});
    axios.get(`http://localhost:5001/admasocial-media/us-central1/api/scream/${screamId}`)
    .then(res=>{
        dispatch({type: SET_SCREAM, payload: res.data})
        dispatch({type: STOP_LOADING_UI})

    }
    )
    .catch(err=>{
        console.log(err)
    })
}