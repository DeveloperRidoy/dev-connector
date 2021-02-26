import Axios from "../../utils/axiosInstance";
import { setAlert } from "./alert";
import { ADD_EDUCATION, ADD_EDUCATION_FAIL, ADD_EXPERIENCE, ADD_EXPERIENCE_FAIL, CREATE_PROFILE, GET_PROFILE, PROFILE_ERROR, REMOVE_EXPERIENCE, REMOVE_EDUCATION, REMOVE_EDUCATION_FAIL, REMOVE_EXPERIENCE_FAIL, GET_PROFILES, CLEAR_PROFILE, GET_GITHUB_REPOS, START_PROFILE_LOADING } from "./types";
 
// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await Axios.get('api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: PROFILE_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }    
    }
}

// Get all user's profile
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    dispatch({type: START_PROFILE_LOADING }) 
    try {
        const res = await Axios.get('api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: PROFILE_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }    
    }
}

// Get all user's profile by id
export const getProfileById = (userID) => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await Axios.get(`api/profile/user/${userID}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
       if (error.response) {
         dispatch(setAlert(error.response.data.msg, "danger", 5000));
         dispatch({ type: PROFILE_ERROR, payload: error.response.data });
       } else {
         dispatch(setAlert("server error", "danger", 5000));
       }    
    }
}

// Get user's github repos
export const getGithubRepos = (userName) => async dispatch => {
    try {
        const res = await Axios.get(`api/profile/github/${userName}`);
        dispatch({
            type: GET_GITHUB_REPOS,
            payload: res.data
        })
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: PROFILE_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }    
    }
}
    
// Create or Update profile
export const createProfile = (formData, history, edit = false) => async  dispatch => {
    try {
        const url = 'api/profile';
        const res = await Axios.post(url, formData);
        dispatch({
            type: CREATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(`profile ${edit ? 'updated' : 'created successfully'}`, "success", 5000));
        !edit && history.push('/dashboard');
    } catch (error) {
       if (error.response) {
         dispatch(setAlert(error.response.data.msg, "danger", 5000));
         dispatch({ type: PROFILE_ERROR, payload: error.response.data });
       } else {
         dispatch(setAlert("server error", "danger", 5000));
       }    
    }   
}

// Add experience in profile
export const addExperience = (data) => async dispatch => {
    try {
        const url = '/api/profile/experience'
        const res = await Axios.put(url, data)
        dispatch({
            type: ADD_EXPERIENCE,
            payload: res.data
        })
        dispatch(setAlert('Experience added', 'success', 5000));
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: PROFILE_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }    
    }
} 

// Remove experience in profile
export const removeExperience = (expID) => async dispatch => {
    try {
        const url = `/api/profile/experience/${expID}`
        const res = await Axios.put(url)
        dispatch({
            type: REMOVE_EXPERIENCE,
            payload: res.data
        }) 
        dispatch(setAlert('Experience deleted', 'success', 5000))
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: PROFILE_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }    
    }
}

// Add education in profile
export const addEducation = (data) => async dispatch => {
    try {
        const url = '/api/profile/education'
        const res = await Axios.put(url, data)
        dispatch({
            type: ADD_EDUCATION,
            payload: res.data
        })
        dispatch(setAlert('education item added', 'success', 5000))
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: PROFILE_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }    
    }
}

// Remove education in profile
export const removeEducation = (eduID) => async dispatch => {
    try {
        const url = `/api/profile/education/${eduID}`
        const res = await Axios.put(url)
        dispatch({
            type: REMOVE_EDUCATION,
            payload: res.data
        })
        dispatch(setAlert('education item removed', 'success', 5000))
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: PROFILE_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }    
    }
} 