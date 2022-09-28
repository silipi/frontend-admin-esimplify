import { useEffect, useState } from 'react';
import { Button, Modal } from '@mantine/core';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setQuickEdit } from '@/store/slices/products';
import Form from '@/components/Form';
import { methods } from '@/services/API';

const schema = Yup.object().shape({});

const QuickEditModal = () => {
  const dispatch = useAppDispatch();
  const { products, providers } = methods();
  const quickEditItem = useAppSelector((state) => state.products.quickEdit);
  const [providersSelect, setProvidersSelect] = useState([]);

  useEffect(() => {
    console.log(quickEditItem);
  }, []);

  useEffect(() => {
    if (quickEditItem) {
      providers.getAll().then((res) => {
        setProvidersSelect(res);
      });
    }
  }, [quickEditItem]);

  if (!quickEditItem || !providersSelect) {
    return null;
  }

  const handleSave = (data: any) => {
    products.update(quickEditItem.id, {
      stock: Number(data.stock),
      providerId: data.providerId,
      name: data.name,
      price: data.price,
    });
  };

  return (
    <Modal opened onClose={() => dispatch(setQuickEdit(null))}>
      <Form onSubmit={handleSave} schema={schema} defaultValues={quickEditItem}>
        <Form.Input name="name" label="Nome:" />
        <Form.Select
          name="providerId"
          label="Fornecedor:"
          data={providersSelect.map((provider: any) => ({
            label: provider.name,
            value: provider.id,
          }))}
        />
        <Form.NumberInput name="stock" label="Estoque:" />
        <Form.PriceInput name="price" label="Valor unitário:" />
        <Button type="submit">Salvar</Button>
      </Form>
    </Modal>
  );
};

export default QuickEditModal;
