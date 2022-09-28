import toast from 'react-hot-toast';
import { caller, notifyError } from '@/services/API';

import { useAppDispatch } from '@/hooks';

import { setAuth } from '@/store/slices/user';
import { Product } from '@/models/Product';
import { setProduct, setProducts, setQuickEdit } from '@/store/slices/products';

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

  const getProducts = async () => {
    try {
      const { status, data } = await caller.get('/products');

      if (status === 200) {
        return dispatch(setProducts(data as Product[]));
      }

      return dispatch(setProducts([]));
    } catch (error: any) {
      notifyError(error);
      return dispatch(setProducts([]));
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { status, data } = await caller.delete(`/products/${id}`);

      if (status === 200 && data) {
        toast.success(`Produto excluído com sucesso!`);
        getProducts();
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  const updateProduct = async (id: string, data: Record<any, any>) => {
    try {
      const backendData = { ...data };
      delete backendData.provider;
      const { status } = await caller.put(`/products/${id}`, backendData);

      if (status === 204) {
        toast.success(`Produto atualizado com sucesso!`);
        getProducts();
        dispatch(setQuickEdit(null));
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  const getProduct = async (id: string) => {
    try {
      const { status, data } = await caller.get(`/products/${id}`);

      if (status === 200) {
        dispatch(setProduct(data as Product));
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  const createProduct = async (
    data: Record<any, any>,
    callback: (responseData: Product) => void,
  ) => {
    try {
      const { status, data: responseData } = await caller.post(
        `/products`,
        data,
      );

      if (status === 201) {
        toast.success(`Produto criado com sucesso!`);
        callback(responseData);
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  const getProviders = async () => {
    try {
      const { status, data } = await caller.get('/providers');

      if (status === 200) {
        return data;
      }

      return [];
    } catch (error: any) {
      notifyError(error);
      return [];
    }
  };

  return {
    auth: {
      login,
      logout,
      checkAuth,
    },
    products: {
      getAll: getProducts,
      remove: deleteProduct,
      update: updateProduct,
      get: getProduct,
      create: createProduct,
    },
    providers: {
      getAll: getProviders,
    },
  };
};

export default methods;
