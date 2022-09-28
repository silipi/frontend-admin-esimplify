import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { methods } from '@/services/API';
import { useAppSelector } from '@/hooks';

const Logout = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const {
    auth: { logout },
  } = methods();

  useEffect(() => {
    logout();
  }, []);

  if (isAuthenticated) {
    return null;
  }

  return <Navigate to="/login" />;
};

export default Logout;
