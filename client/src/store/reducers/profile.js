import { GET_PROFILE, PROFILE_ERROR, LOGOUT, CREATE_PROFILE, ADD_EXPERIENCE, REMOVE_EXPERIENCE, ADD_EDUCATION, REMOVE_EDUCATION, REMOVE_EDUCATION_FAIL, REMOVE_EXPERIENCE_FAIL, ACCOUNT_DELETED, GET_PROFILES, CLEAR_PROFILE, GET_GITHUB_REPOS, START_PROFILE_LOADING} from "../actions/types";
 
const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
    reposLoading: true 
}
const profile =  (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE:
        case CREATE_PROFILE: 
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
        case REMOVE_EXPERIENCE_FAIL:
        case REMOVE_EDUCATION_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case LOGOUT:
        case ACCOUNT_DELETED: 
            return {
                ...state,
                profile: null,
                repos: [],
                loading: true
            }
        case ADD_EXPERIENCE:
        case REMOVE_EXPERIENCE:
        case ADD_EDUCATION:
        case REMOVE_EDUCATION:
            return {
                ...state, 
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profiles: [],
                profile: null,
                loading: true 
            }
        case GET_GITHUB_REPOS:
            return {
                ...state,
                repos: payload,
                reposLoading: false,
                loading: false,
            }
        case START_PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default profile;    