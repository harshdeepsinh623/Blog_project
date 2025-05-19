import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// A wrapper for routes that should only be accessible to authenticated users
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // If user is not authenticated, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the protected component
  return children;
};

export default PrivateRoute;