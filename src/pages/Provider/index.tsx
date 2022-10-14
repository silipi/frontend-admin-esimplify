import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { MdEdit } from 'react-icons/md';
import { Title, Text, Button } from '@mantine/core';
import { methods } from '@/services/API';
import { useAppSelector } from '@/hooks';
import WriteProvider from '@/components/WriteProvider';

const EditSchema = Yup.object({
  name: Yup.string().required(),
}).required();

const Provider = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const {
    providers: { get },
  } = methods();
  const provider = useAppSelector((state) => state.providers.provider);

  useEffect(() => {
    get(id!);
  }, []);

  if (!provider) {
    return null;
  }

  const handleEdit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Button
        leftIcon={<MdEdit />}
        onClick={() => setIsEditing(!isEditing)}
        variant="light"
      >
        {isEditing ? 'Desabilitar' : 'Habilitar'} edição
      </Button>

      {isEditing ? (
        <WriteProvider
          schema={EditSchema}
          onSubmit={handleEdit}
          defaultValues={provider}
        />
      ) : (
        <>
          <Title order={2}>Nome: {provider.name}</Title>
          <Text>Endereço: {provider.address}</Text>
          <Text>CNPJ: {provider.cnpj}</Text>
          <Text>Inscrição Estadual: {provider.ie}</Text>
          <Text>E-mail: {provider.email}</Text>
          <Text>Telefone: {provider.phone}</Text>
          <Text>
            Impostos: {provider.taxes || 'Sem impostos criados ainda!'}
          </Text>
          <Text>
            Criado em: {new Date(provider.createdAt).toLocaleString()}
          </Text>
          <Text>
            Atualizado em: {new Date(provider.updatedAt).toLocaleString()}
          </Text>
        </>
      )}
    </>
  );
};

export default Provider;
