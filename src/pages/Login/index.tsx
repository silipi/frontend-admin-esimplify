import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Text,
  Image,
} from '@mantine/core';
import * as Yup from 'yup';
import { Container } from './styles';
import Form from '@/components/Form';
import Logo from '@/assets/logo-extended.png';
import { methods } from '@/services/API';

const schema = Yup.object().shape({
  username: Yup.string().required('Usuário é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
});

const Login = () => {
  const {
    auth: { login },
  } = methods();

  const onSubmit = (data: any) => {
    const { username, password } = data;
    login({ username, password });
  };

  return (
    <Container>
      <Paper withBorder shadow="sm" py="md" px="64px">
        <Form onSubmit={onSubmit} schema={schema}>
          <Image src={Logo} alt="Logo" width={200} m="xl" />
          <Text align="center" size="xl" mb="md">
            Entre na plataforma
          </Text>
          <TextInput
            mb="sm"
            name="username"
            label="Usuário Admin:"
            placeholder="Insira seu usuário"
            required
          />
          <PasswordInput
            mb="sm"
            name="password"
            label="Senha:"
            required
            autoComplete="off"
          />
          <Button fullWidth type="submit">
            Entrar
          </Button>
        </Form>
      </Paper>
    </Container>
  );
};

export default Login;
