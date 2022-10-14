import toast from 'react-hot-toast';
import notifyError from '../notifyError';
import caller from '../caller';

import {
  setProduct,
  setProductQuickEdit,
  setProducts,
} from '@/store/slices/products';
import Product from '@/models/Product';
import { AppDispatch } from '@/store';

export default function products({ dispatch }: { dispatch: AppDispatch }) {
  const getAll = async () => {
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

  const remove = async (id: string) => {
    try {
      const { status, data } = await caller.delete(`/products/${id}`);

      if (status === 200 && data) {
        toast.success(`Produto excluído com sucesso!`);
        getAll();
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  const update = async (id: string, data: Record<any, any>) => {
    try {
      const { images, ...backendData } = data;
      delete backendData.provider;

      if (images?.deletedImages && images?.deletedImages.length > 0) {
        await caller.delete(`/products/${id}/images`, {
          data: images.deletedImages,
        });
      }

      if (images?.newImages && images.newImages.length > 0) {
        const formData = new FormData();

        images.newImages.forEach((image: File) => {
          formData.append('image', image);
        });

        await caller.put(`/products/${id}/images`, formData);
      }

      const { status } = await caller.put(`/products/${id}`, backendData);

      if (status === 204) {
        toast.success(`Produto atualizado com sucesso!`);
        getAll();
        dispatch(setProductQuickEdit(null));
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  const get = async (id: string) => {
    try {
      const { status, data } = await caller.get(`/products/${id}`);

      if (status === 200) {
        dispatch(setProduct(data as Product));
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  const create = async (
    obj: { data: any; images?: any },
    callback: (responseData: Product) => void,
  ) => {
    try {
      const { status, data: responseData } = await caller.post(
        `/products`,
        obj.data,
      );

      if (status === 201) {
        toast.success(`Produto criado com sucesso!`);
      }

      if (obj.images) {
        const { data: imagesData, status: imagesStatus } = await caller.post(
          `/products/${responseData.id}/images`,
          obj.images,
        );

        if (imagesStatus === 200 && imagesData) {
          toast.success(`Imagens adicionadas com sucesso!`);
          callback(responseData);
        }
      }
    } catch (error: any) {
      notifyError(error);
    }
  };

  return {
    getAll,
    remove,
    update,
    get,
    create,
  };
}
