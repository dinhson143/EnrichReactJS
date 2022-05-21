import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://petstore.swagger.io/v2/',

  headers: {
    'Content-Type': 'application/json',
  },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    //  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    // console.log(localStorage.getItem('token'));
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //  if (response && response.data && response.data.statusCode === 200) return response.data;

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
