import Axios from '../../utils/axiosInstance';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED } from './types';
import { setAlert } from '../actions/alert';

// Load User
export const loadUser = async dispatch => { 
    try {
        const res = await Axios.get('api/auth');
        dispatch({ type: USER_LOADED, payload: res.data })
    } catch (error) {
       if (error.response) {
         dispatch(setAlert(error.response.data.msg, "danger", 5000));
         dispatch({ type: AUTH_ERROR, payload: error.response.data });
       } else {
         dispatch(setAlert("server error", "danger", 5000));
       }    
    }
}

// Register User
export const register = ({name, email, password}) => async dispatch => {
    const url = 'api/users';
    const body = { name, email, password }; 
    
    try {
        const res = await Axios.post(url, body);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: AUTH_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }    
    }
}

// login User
export const login = (email, password) => async dispatch => {
    const url = '/api/auth';
    const body = { email, password }; 
    
    try {
        const res = await Axios.post(url, body);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert('Login successful!','success', 5000));   
    } catch (error) {
        if (error.response) {
          dispatch(setAlert(error.response.data.msg, "danger", 5000));
          dispatch({ type: AUTH_ERROR, payload: error.response.data });
        } else {
          dispatch(setAlert("server error", "danger", 5000));
        }    
        
    }
}                              

// Logout User
export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
}


// delete user and profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm("are you sure? This cannot be undone")) {
      try {
        await Axios.delete("/api/profile");
        dispatch({ type: ACCOUNT_DELETED });
        dispatch(setAlert("Account deleted", "", 5000));
      } catch (error) {
          if (error.response) {
            dispatch(setAlert(error.response.data.msg, "danger", 5000));
            dispatch({ type: AUTH_ERROR, payload: error.response.data });
          } else {
            dispatch(setAlert("server error", "danger", 5000));
          }    
      }    
    }
      
}