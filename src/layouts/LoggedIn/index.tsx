import { useEffect, useState } from 'react';
import { AppShell, Header } from '@mantine/core';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useAppSelector } from '@/hooks';
import { methods } from '@/services/API';

const LoggedIn = () => {
  const {
    auth: { checkAuth },
  } = methods();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <AppShell
      padding="md"
      navbar={
        // @ts-ignore
        <Navbar />
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};

LoggedIn.defaultProps = {
  children: null,
};

export default LoggedIn;
