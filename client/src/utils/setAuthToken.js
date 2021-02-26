import Axios from './axiosInstance';

const setAuthToken = token => Axios.defaults.headers.common['x-auth-token'] = token;

export default setAuthToken; 