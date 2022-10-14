import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Tooltip, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { methods } from '@/services/API';
import { useAppSelector } from '@/hooks';
import Provider from '@/models/Provider';

const List = () => {
  const { openConfirmModal, closeAll } = useModals();
  const navigate = useNavigate();
  const providers = useAppSelector((state) => state.providers.providers);
  const {
    providers: { remove },
  } = methods();

  const handleDelete = (id: string) => {
    openConfirmModal({
      title: 'Excluir fornecedor',
      children:
        'Tem certeza que deseja excluir este fornecedor? Esta ação não poderá ser desfeita!',
      closeOnConfirm: false,
      onConfirm: () =>
        openConfirmModal({
          title: 'Excluir fornecedor',
          children:
            'Entre em contato com o fornecedor para ter certeza das consequências desta ação.',
          onConfirm: () => {
            remove(id);
            closeAll();
          },
          labels: {
            confirm: 'Sim, entrei em contato, excluir.',
            cancel: 'Tem razão, não vou excluir.',
          },
        }),
    });
  };

  const handleRedirect = (id: string) => {
    navigate(`/providers/${id}`);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Endereço</th>
          <th>CNPJ</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {providers &&
          providers.length > 0 &&
          providers.map((item: Provider) => (
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
              <td>{item.address}</td>
              <td>{item.cnpj}</td>
              <td>{item.email}</td>
              <td>
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
  );
};

export default List;
