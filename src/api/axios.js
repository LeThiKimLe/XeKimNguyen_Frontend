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

// const getUserId = () => {
//   const userId = localStorage.getItem('userId');
//   return userId === null ? null : userId;
// };

// const getAccessToken = () => {
//   const accessToken = localStorage.getItem('accessToken');
//   return accessToken === null ? null : accessToken;
// };

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('current_user'));
  if (user && user.accessToken){
      return user.accessToken
  }
  else{
      return null
  }
}

let isRefreshing = false;
let failedRequests = [];
let retryCount = 0; // số lần retry

// const refreshAccessToken = async () => {
//   const userId = getUserId();
//   const accessToken = getAccessToken();
//   if (userId && accessToken) {
//     const tokenData = { userId, accessToken };
//     try {
//       // gửi request để lấy access token mới
//       const response = await axiosClient.post(
//         '/check-token',
//         JSON.stringify({ data: tokenData }),
//         { withCredentials: true }
//       );
//       const value = response.data;
//       if (value.allow) {
//         // cập nhật access token
//         localStorage.setItem('accessToken', value.accessToken);
//         // cập nhật Authorization header của tất cả các request đang chờ
//         failedRequests.forEach((request) => {
//           request.headers.Authorization = `Bearer ${value.accessToken}`;
//           retry(request); // retry lại các request đang chờ
//         });
//         failedRequests = [];
//         isRefreshing = false;
//         retryCount = 0; // reset số lần retry
//       } else {
//         // hiển thị thông báo lỗi cho người dùng
//         console.log('Access denied');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

// const retry = (request) => {
//   axiosClient(request)
//     .then((response) => {
//       request.resolve(response);
//     })
//     .catch((error) => {
//       request.reject(error);
//     });
// };

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
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   // if (!isRefreshing) {
    //   //   isRefreshing = true;
    //   //   await refreshAccessToken();
    //   // }
    //   // originalRequest._retry = true;
    //   // originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
    //   if (retryCount < 3) {
    //     // nếu số lần retry chưa vượt quá ngưỡng
    //     retryCount++; // tăng số lần retry
    //     return axiosClient(originalRequest);
    //   } else {
    //     // nếu số lần retry đã vượt quá ngưỡng
    //     // hiển thị thông báo lỗi cho người dùng
    //     console.log('Retry limit exceeded');
    //   }
    // }
    return Promise.reject(error);
  }
);
export default axiosClient;