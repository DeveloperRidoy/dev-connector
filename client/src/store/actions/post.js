import Axios from "../../utils/axiosInstance";
import { setAlert } from "./alert"
import { GET_POST, GET_POSTS, POST_ERROR, LIKE_POST, UNLIKE_POST, DELETE_POST, CREATE_POST, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, CLEAR_POST} from "./types";

export const getPost = (postID) => async dispatch => {
    try {
        const res = await Axios.get(`/api/posts/post/${postID}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        if (error.response) {
            dispatch(setAlert(error.response.data.msg, "danger", 5000));
            dispatch({ type: POST_ERROR, payload: error.response.data });
        }  else {dispatch(setAlert('server error', 'danger', 5000))}
    }
}


export const getPosts = () => async dispatch => {
    try {
        const res = await Axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: POST_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }
    }
}

export const addLikeToPost = (postID) => async dispatch => {
    try {
        const res = await Axios.put(`/api/posts/like/${postID}`);
        dispatch({
            type: LIKE_POST,
            payload: { postID, likes: res.data }
        })
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: POST_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }
    }
}

export const removeLikeFromPost = (postID) => async dispatch => {
    try {
        const res = await Axios.put(`/api/posts/unlike/${postID}`);
        dispatch({
          type: UNLIKE_POST,
          payload: { postID, likes: res.data }
        });
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: POST_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }
    }
}

export const createPost = data => async dispatch => {
    try {
        const res = await Axios.post('/api/posts', data);
        dispatch({
            type: CREATE_POST,
            payload: res.data
        })
        dispatch(setAlert("post added", "success", 5000));
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: POST_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }
    }
}

export const deletePost = postID => async dispatch => {
    if (window.confirm('Delete post? This cannot be undone')) {
        try {
          await Axios.delete(`/api/posts/${postID}`);
          dispatch({ type: DELETE_POST, payload: { postID } });
          dispatch(setAlert("post deleted", "", 5000));
        } catch (error) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: POST_ERROR, payload: error.response.data });
        }
    }
    
}
  
export const addComment = (username, avatar, postID, text) => async dispatch => {
    try {
        const res = await Axios.post(`/api/posts/comment/${postID}`, {text, username, avatar});
        dispatch({ type: ADD_COMMENT, payload: { postID, comments: res.data } });
        dispatch(setAlert('comment added', 'success', 5000))
    } catch (error) {
        dispatch(setAlert(error.response.data.msg, "danger", 5000));
        dispatch({ type: POST_ERROR, payload: error.response.data });
    }   
}

export const updateComment = (username, avatar, postID, commentID, text) => async dispatch => {
    try {
        const res = await Axios.put(`/api/posts/comment/${postID}/${commentID}`, {text, username, avatar});
        dispatch({ type: UPDATE_COMMENT, payload: { postID, comments: res.data } });
    } catch (error) {
        dispatch(setAlert(error.response.data.msg, "danger", 5000));
        dispatch({ type: POST_ERROR, payload: error.response.data });
    }   
}
  
export const deleteComment = (postID, commentID) => async dispatch => {
    if (window.confirm('Delete comment ? ')) {
        try {
        const res = await Axios.delete(`/api/posts/comment/${postID}/${commentID}`);
        dispatch({ type: DELETE_COMMENT, payload: { postID, comments: res.data } });
    } catch (error) {
        dispatch(setAlert(error.response.data.msg, "danger", 5000));
        dispatch({ type: POST_ERROR, payload: error.response.data });
    }  
    } 
}
 
export const clearPost = () => dispatch => {
    dispatch({ type: CLEAR_POST });
}