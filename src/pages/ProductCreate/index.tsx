import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import WriteProduct from '@/components/WriteProduct';
import { methods } from '@/services/API';
import Product from '@/models/Product';

const CreateSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().required(),
  stock: Yup.number().required(),
});

const ProductCreate = () => {
  const navigate = useNavigate();
  const {
    providers: { getAll: getAllProviders },
    products: { create: createProduct },
  } = methods();

  useEffect(() => {
    getAllProviders();
  }, []);

  const handleSubmit = async (data: any) => {
    const redirect = (res: Product) => navigate(`/products/${res.id}`);

    if (data.images) {
      const formData = new FormData();
      for (let i = 0; i < data.images.length; i += 1) {
        formData.append('image', data.images[i]);
      }
      await createProduct({ data, images: formData }, redirect);
      return;
    }

    await createProduct({ data }, redirect);
  };

  return <WriteProduct onSubmit={handleSubmit} schema={CreateSchema} />;
};

export default ProductCreate;
