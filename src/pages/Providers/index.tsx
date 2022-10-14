import { useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Title, Button } from '@mantine/core';
import List from './List';
import * as S from './styles';
import { methods } from '@/services/API';

const Providers = () => {
  const navigate = useNavigate();
  const {
    providers: { getAll },
  } = methods();

  useEffect(() => {
    getAll();
  }, []);

  const redirectCreate = () => {
    navigate('/providers/create');
  };

  return (
    <>
      <S.TitleContainer>
        <Title order={3}>Fornecedores</Title>
        <Button
          leftIcon={<MdAdd />}
          variant="outline"
          color="blue"
          onClick={redirectCreate}
        >
          Adicionar
        </Button>
      </S.TitleContainer>
      <List />
    </>
  );
};

export default Providers;
