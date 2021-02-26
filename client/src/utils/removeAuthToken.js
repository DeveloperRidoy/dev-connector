import Axios from './axiosInstance';

const removeAuthToken = () => delete Axios.defaults.headers.common['x-auth-token'];


export default removeAuthToken;