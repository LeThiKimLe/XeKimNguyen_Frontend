import axios from 'axios';
import queryString from 'query-string'

const API_URL = process.env.REACT_APP_API_URL
const token = localStorage.getItem('accessToken');

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use((req) => {
  // Xử lý request trước khi gửi đi, thêm header token vào
  const token = getAccessToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('current_user'));
  if (user && user.accessToken){
      return user.accessToken
  }
  else{
      return null
  }
}

axiosClient.interceptors.response.use(
  // Xử lý khi response thành công trả về
  (response) => {
    if (response && response.data){
        return response.data;
    }
    return response;
  },
  // Xử lý lỗi
  async (error) => {
    const originalRequest = error.config;
    
    return Promise.reject(error);
  }
);
export default axiosClient;