import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`
})

const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user?.accessToken}`
    return config;
  }), (error) => {
    return Promise.reject(error);
  }

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    }
  ), (error) => {
    if (error.response.status === 403) {
      console.error('Unauthorized or forbidden request:', error);
      navigate('/forbidden');
    } else if (error.response.status === 401) {

      logout()
        .then(() => {
          navigate('/signin');
        })
        .catch((logoutError) => {
          console.error('Logout failed:', logoutError);
        });
    }
    return Promise.reject(error);
  }
  return axiosSecure;
};

export default useAxiosSecure;