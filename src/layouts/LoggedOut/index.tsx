import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/hooks';

const LoggedOut = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoggedOut;
