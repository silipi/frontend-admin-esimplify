import { useEffect } from 'react';
import { Button, Modal } from '@mantine/core';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setProductQuickEdit } from '@/store/slices/products';
import Form from '@/components/Form';
import { methods } from '@/services/API';

const schema = Yup.object().shape({});

const QuickEditModal = () => {
  const dispatch = useAppDispatch();
  const {
    products,
    providers: { getAll: getAllProviders },
  } = methods();
  const quickEditItem = useAppSelector((state) => state.products.quickEdit);
  const providers = useAppSelector((state) => state.providers.providers);

  useEffect(() => {
    if (quickEditItem) {
      getAllProviders();
    }
  }, [quickEditItem]);

  if (!quickEditItem || !providers) {
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
    <Modal opened onClose={() => dispatch(setProductQuickEdit(null))}>
      <Form onSubmit={handleSave} schema={schema} defaultValues={quickEditItem}>
        <Form.Input name="name" label="Nome:" />
        <Form.Select
          name="providerId"
          label="Fornecedor:"
          data={providers.map((provider: any) => ({
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
