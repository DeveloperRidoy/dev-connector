import { GET_POST, GET_POSTS, POST_ERROR, GET_POST_ERROR, LIKE_POST, UNLIKE_POST, DELETE_POST, CREATE_POST, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, CLEAR_POST } from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false 
            }
        case POST_ERROR:
        case GET_POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case LIKE_POST:
        case UNLIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postID ? { ...post, likes: payload.likes } : post),
                loading: false
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload.postID),
                loading: false
            }
        case ADD_COMMENT:
        case UPDATE_COMMENT:
        case DELETE_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload.comments },
                posts: state.posts.map(post => post._id === payload.postID ? { ...post, comments: payload.comments } : post),
                loading: false 
            }
        case CLEAR_POST:
            return {
                ...state,
                post: null,
                loading: true
            }
        default:
            return state;
    }
}    