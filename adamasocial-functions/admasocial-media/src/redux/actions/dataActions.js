import {  EDIT_POST, STOP_LOADING_UI, DELETE_SCREAM, LIKE_SCREAM, LOADING_DATA, LOADING_UI, POST_SCREAM, SET_ERRORS, SET_SCREAM , SET_SCREAMS, UNLIKE_SCREAM, SUBMIT_COMMENT, DELETE_COMMENT, SHARE_SCREAM} from "../utils/types"
import axios from 'axios'
//*Get all screams
export const getScreams = ()=> (dispatch)=>{
    dispatch({type: LOADING_DATA});
    axios.get("/screams")
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
//       .get('/scream')
//       .then((res) => {
//     //* Now i NEED to get the full data to display
//    dispatch({type: SET_SCREAM, payload: res.data})
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   };
export const likeScream = (screamId)=> (dispatch)=>{
    axios.get(`/scream/${screamId}/like`)
    .then(res=>{
        dispatch({type: LIKE_SCREAM, payload: res.data})
    })
    .catch(err=>{
        console.log(err);
    })
}

export const unlikeScream = (screamId)=> (dispatch)=>{
    axios.get(`/scream/${screamId}/unlike`)
    .then(res=>{
        dispatch({type: UNLIKE_SCREAM, payload: res.data})
    })
    .catch(err=>{
        console.log(err);
    })
}


//*Delete a scream
export const deleteScream = (screamId) =>(dispatch)=>{
axios.get(`/scream/${screamId}/delete`)
.then(res=>{
dispatch({type: DELETE_SCREAM ,payload: res.data})
})
.catch(err=>{
    console.log(err)
})
}

//*Post a scream
export const postScream =(data)=> (dispatch)=>{
    console.log(data)
    dispatch({type: LOADING_UI})
axios.post("/screams", data)
.then(res=>{
    dispatch({type: POST_SCREAM,  payload:res.data});
})
.catch(err=>{
    console.log(err)
})
}

export const getOneScream =(screamId) => (dispatch)=>{
    dispatch({type: LOADING_UI});
    axios.get(`/scream/${screamId}`)
    .then(res=>{
        dispatch({type: SET_SCREAM, payload: res.data})
        dispatch({type: STOP_LOADING_UI})
    }
    )
    .catch(err=>{
        console.log(err)
    })
}

//*Comment on a scream

export const commentScream = (screamId, newComment) => dispatch => {
dispatch({type: LOADING_UI});
axios.post(`/scream/${screamId}/comment`, newComment)
.then(res=>{
    dispatch({type: SUBMIT_COMMENT, payload: res.data})
    dispatch({type:STOP_LOADING_UI})
})
.catch(err=>{
    console.log(err)
})
}

//* delete scream
export const deleteComment = (commentId)=>dispatch=>{
    axios.delete(`/scream/comments/${commentId}/delete`).then(res=>{
        dispatch({type: DELETE_COMMENT, payload: commentId})
    })
    .catch(error=>{
        console.log(error)
    })
}
//* Edit scream
export const editScream = (screamId, updatedPost)=> dispatch=>{
    dispatch({type: LOADING_UI});
    axios.post(`/screams/${screamId}/edit`, updatedPost).then(res=>{
        dispatch({type: EDIT_POST, payload: res.data});
        dispatch({type: STOP_LOADING_UI});
    })
    .catch(error=>{
        console.log(error);

    });

}

export const shareScream =(newScream)=>dispatch=>{
    axios.post(`/screams/${newScream.screamId}/share`, newScream).then(res=>{
        dispatch({type: SHARE_SCREAM, payload: res.data})
    })
    .catch(error=>{
        console.log(error)
    })
}