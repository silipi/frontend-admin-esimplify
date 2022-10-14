import toast from 'react-hot-toast';
import caller from '../caller';
import notifyError from '../notifyError';
import { AppDispatch } from '@/store';
import { setProvider, setProviders } from '@/store/slices/providers';
import Provider from '@/models/Provider';

export default function providers({ dispatch }: { dispatch: AppDispatch }) {
  const getAll = async () => {
    try {
      const { status, data } = await caller.get('/providers');

      if (status === 200) {
        return dispatch(setProviders(data as Provider[]));
      }

      return dispatch(setProviders([]));
    } catch (error: any) {
      notifyError(error);
      return dispatch(setProviders([]));
    }
  };

  const remove = async (id: string) => {
    try {
      const { status, data } = await caller.delete(`/providers/${id}`);

      if (status === 200 && data) {
        toast.success(`Fornecedor excluído com sucesso!`);
        getAll();
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  const get = async (id: string) => {
    try {
      const { status, data } = await caller.get(`/providers/${id}`);

      if (status === 200) {
        return dispatch(setProvider(data as Provider));
      }

      // @ts-ignore
      return dispatch(setProvider(null));
    } catch (error: any) {
      notifyError(error);
      // @ts-ignore
      return dispatch(setProvider(null));
    }
  };

  const create = async (
    provider: Provider,
    redirect: (prov: Provider) => void,
  ) => {
    try {
      const { status, data } = await caller.post('/providers', provider);

      if (status === 201 && data) {
        toast.success(`Fornecedor criado com sucesso!`);
        redirect(data);
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  return {
    create,
    get,
    getAll,
    remove,
  };
}
