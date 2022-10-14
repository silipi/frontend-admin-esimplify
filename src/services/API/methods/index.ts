import toast from 'react-hot-toast';

import products from './products';
import providers from './providers';

import { caller, notifyError } from '@/services/API';
import { useAppDispatch } from '@/hooks';
import { setAuth } from '@/store/slices/user';

const methods = () => {
  const dispatch = useAppDispatch();

  const login = async ({ username, password }: Record<any, string>) => {
    try {
      const { status } = await caller.post('/auth/admin/login', {
        username,
        password,
      });

      if (status === 200) {
        dispatch(setAuth(true));
        toast.success('Seja bem vindo!');
      } else {
        dispatch(setAuth(false));
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  const logout = async () => {
    try {
      const { status } = await caller.post('/auth/admin/logout');

      if (status === 200) {
        dispatch(setAuth(false));
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  const checkAuth = async () => {
    try {
      const { status } = await caller.get('/auth/admin/check');

      if (status === 200) {
        dispatch(setAuth(true));
      } else {
        dispatch(setAuth(false));
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  const productsMethods = products({ dispatch });
  const providersMethods = providers({ dispatch });

  return {
    auth: {
      login,
      logout,
      checkAuth,
    },
    products: productsMethods,
    providers: providersMethods,
  };
};

export default methods;
