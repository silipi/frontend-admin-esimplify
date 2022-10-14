import { Button, PasswordInput } from '@mantine/core';
import Form from '../Form';

interface Props {
  defaultValues?: any;
  onSubmit: (data: any) => void;
  schema: any;
}

const WriteProvider = ({ defaultValues, onSubmit, schema }: Props) => {
  return (
    <Form onSubmit={onSubmit} schema={schema} defaultValues={defaultValues}>
      <Form.Input name="name" label="Nome:" />
      <Form.Input name="address" label="Endereço:" />
      <PasswordInput name="password" label="Senha:" />
      <Form.Input name="cnpj" label="CNPJ:" />
      <Form.Input name="ie" label="Inscrição Estadual:" />
      <Form.Input name="email" label="E-mail:" />
      <Form.Input name="phone" label="Telefone:" />
      <Form.Input name="taxes" label="Impostos:" />
      <Button type="submit">Salvar</Button>
    </Form>
  );
};

WriteProvider.defaultProps = {
  defaultValues: {},
};

export default WriteProvider;
