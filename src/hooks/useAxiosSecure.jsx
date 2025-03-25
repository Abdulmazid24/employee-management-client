import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      config => {
        const token = localStorage.getItem('access-token');
        if (token) {
          console.log('Token attached:', token);
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      response => response,
      async error => {
        if (error.response) {
          const status = error.response.status;
          console.log('Interceptor caught error:', status);
          if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function: Remove interceptors when component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]); // Runs only when `logOut` or `navigate` changes

  return axiosSecure;
};

export default useAxiosSecure;
