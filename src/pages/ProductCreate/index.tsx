import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import WriteProduct from '@/components/WriteProduct';
import { methods } from '@/services/API';
import { Product } from '@/models/Product';

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
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    getAllProviders().then((res) => {
      setProviders(res);
    });
  }, []);

  const handleSubmit = (data: any) => {
    const redirect = (res: Product) => navigate(`/products/${res.id}`);
    createProduct(data, redirect);
  };

  return (
    <WriteProduct
      providers={providers}
      onSubmit={handleSubmit}
      schema={CreateSchema}
    />
  );
};

export default ProductCreate;
