import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Pages/Loading/Loading';
import { Navigate, useLocation } from 'react-router';



const PrivateRoutes = ({ children }) => {

  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>
  }

  if (!user) {
    return <Navigate state={{ from: location.pathname }} to={'/signin'}></Navigate>
  }

  return children
};

export default PrivateRoutes;