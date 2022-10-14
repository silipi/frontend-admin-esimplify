import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { methods } from '@/services/API';
import Provider from '@/models/Provider';
import WriteProvider from '@/components/WriteProvider';

const CreateSchema = Yup.object({
  name: Yup.string().required(),
  address: Yup.string().required(),
  cnpj: Yup.string().required(),
  ie: Yup.string().required(),
  email: Yup.string().email().required(),
});

const ProviderCreate = () => {
  const navigate = useNavigate();
  const {
    providers: { create },
  } = methods();

  const handleSubmit = (data: any) => {
    const redirect = (res: Provider) => navigate(`/providers/${res.id}`);
    create(data, redirect);
  };

  return <WriteProvider onSubmit={handleSubmit} schema={CreateSchema} />;
};

export default ProviderCreate;
