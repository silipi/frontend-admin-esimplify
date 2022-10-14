import { useState } from 'react';
import { Button } from '@mantine/core';
import Form from '../Form';

import CreateImages from './CreateImages';
import EditImages from './EditImages';
import Attributes from './Attributes';

import { useAppSelector } from '@/hooks';

interface Props {
  defaultValues?: any;
  onSubmit: (data: any) => void;
  schema: any;
  isEditing?: boolean;
}

const WriteProduct = ({
  onSubmit,
  schema,
  defaultValues,
  isEditing,
}: Props) => {
  const [attributes, setAttributes] = useState(defaultValues.attributes || []);
  const providers = useAppSelector((state) => state.providers.providers);

  const handleSubmit = (data: any) => {
    onSubmit({ ...data, attributes });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      schema={schema}
      defaultValues={defaultValues}
      enctype="multipart/form-data"
      method="post"
    >
      <Form.Input name="name" label="Nome:" />
      <Form.Textarea name="description" label="Descrição:" />
      <Form.NumberInput name="stock" label="Estoque:" />
      <Form.PriceInput name="price" label="Preço unitário:" />
      {isEditing ? (
        <EditImages name="images" />
      ) : (
        <CreateImages name="images" />
      )}
      <Form.ColorInput
        name="color"
        label="Cor:"
        withPicker={false}
        disallowInput
        swatches={[
          '#25262b',
          '#868e96',
          '#fa5252',
          '#e64980',
          '#be4bdb',
          '#7950f2',
          '#4c6ef5',
          '#228be6',
          '#15aabf',
          '#12b886',
          '#40c057',
          '#82c91e',
          '#fab005',
          '#fd7e14',
        ]}
      />
      <Attributes attributes={attributes} setAttributes={setAttributes} />
      <Form.Select
        name="providerId"
        label="Fornecedor:"
        data={providers.map((provider: any) => ({
          label: provider.name,
          value: provider.id,
        }))}
      />

      <Button type="submit">Salvar</Button>
    </Form>
  );
};

WriteProduct.defaultProps = {
  defaultValues: {},
  isEditing: false,
};

export default WriteProduct;
