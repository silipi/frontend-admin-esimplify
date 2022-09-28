import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  ScrollArea,
  TextInput,
  Button,
  Tooltip,
  Text,
} from '@mantine/core';
import { MdDelete, MdEdit } from 'react-icons/md';
import { methods } from '@/services/API';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setQuickEdit } from '@/store/slices/products';
import type { Product } from '@/models/Product';
import { formatCurrency } from '@/utils';

const List = () => {
  const {
    products: { remove },
  } = methods();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDelete = (id: string) => {
    remove(id);
  };

  const handleEdit = (item: Product) => {
    dispatch(setQuickEdit(item));
  };

  const handleRedirect = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <ScrollArea>
      <TextInput
        placeholder="Busque por qualquer campo..."
        mb="md"
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            <th>Nome</th>
            <th>Fornecedor</th>
            <th>Estoque</th>
            <th>Preço unitário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.length > 0 &&
            products.map((item) => (
              <tr key={item.id}>
                <td>
                  <Text
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleRedirect(item.id)}
                    variant="link"
                    weight={500}
                  >
                    {item.name}
                  </Text>
                </td>
                <td>{item.provider.name}</td>
                <td>{item.stock}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>
                  <Tooltip label="Edição rápida" position="top">
                    <Button
                      onClick={() => handleEdit(item)}
                      color="indigo"
                      p="sm"
                      mr="sm"
                    >
                      <MdEdit />
                    </Button>
                  </Tooltip>
                  <Tooltip label="Excluir" position="top">
                    <Button
                      onClick={() => handleDelete(item.id)}
                      color="red"
                      p="sm"
                    >
                      <MdDelete />
                    </Button>
                  </Tooltip>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default List;
