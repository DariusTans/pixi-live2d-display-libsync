import axios from "axios";

const BASE_URL = 'http://localhost:8000';

const getInstance = () => {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.timeout = 6e4;
  // axios.interceptors.request.use(config => {
  //   const token = Token.getUserToken();
  //   if (token) {
  //     config.headers = {
  //       ...config.headers,
  //       'Cache-Control': 'no-cache',
  //       // 'authorization': Bearer ${token},
  //     }
  //   }
  //   return config;
  // });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      //manage error
      return Promise.reject(error);
    }
  );

  return axios;
};

export const axiosServer = getInstance();

export default getInstance();