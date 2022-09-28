import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Title } from '@mantine/core';
import { MdAdd } from 'react-icons/md';
import List from './List';
import QuickEditModal from './QuickEditModal';
import * as S from './styles';
import { methods } from '@/services/API';

const Products = () => {
  const navigate = useNavigate();
  const {
    products: { getAll },
  } = methods();

  useEffect(() => {
    getAll();
  }, []);

  const handleRedirectAdd = () => {
    navigate('/products/create');
  };

  return (
    <div>
      <S.TitleContainer>
        <Title order={3}>Produtos</Title>
        <Button
          leftIcon={<MdAdd />}
          variant="outline"
          color="blue"
          onClick={handleRedirectAdd}
        >
          Adicionar
        </Button>
      </S.TitleContainer>

      <QuickEditModal />
      <List />
    </div>
  );
};

export default Products;
