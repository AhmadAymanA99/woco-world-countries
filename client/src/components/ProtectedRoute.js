import React from 'react';
import { Navigate } from 'react-router-dom';
import Skeleton from './Skeleton';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-700">
        <Skeleton variant="avatar" className="!h-32 !w-32" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
