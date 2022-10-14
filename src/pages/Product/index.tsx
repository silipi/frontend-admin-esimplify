/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Divider,
  Paper,
  Text,
  Tooltip,
  Image,
} from '@mantine/core';
import * as S from './styles';
import { useAppSelector } from '@/hooks';
import { methods } from '@/services/API';
import { formatCurrency } from '@/utils';
import WriteProduct from '@/components/WriteProduct';

const EditSchema = Yup.object({
  name: Yup.string().required(),
}).required();

const Product = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const {
    products,
    providers: { getAll: getAllProviders },
  } = methods();
  const { id } = useParams();
  const product = useAppSelector((state) => state.products.product);

  useEffect(() => {
    if (id) {
      products.get(id);
    }
  }, [id]);

  useEffect(() => {
    if (isEditing) {
      getAllProviders();
    }
  }, [isEditing]);

  if (!product) {
    return null;
  }

  const handleEdit = (data: any) => {
    const { id: idD, createdAt, updatedAt, ...rest } = data;

    products.update(id!, rest).then(async () => {
      await products.get(id!);
      setIsEditing(false);
    });

    console.log(data);
  };

  const goToProvider = () => {
    navigate(`/providers/${product.providerId}`);
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
        <WriteProduct
          schema={EditSchema}
          defaultValues={product}
          onSubmit={handleEdit}
          isEditing
        />
      ) : (
        <>
          <S.Section>
            <Box py="xl">
              <S.Title order={3} weight={500}>
                Nome: {product.name}
                <Tooltip label={product.color || 'Sem cor selecionada'}>
                  <S.Color color={product.color || 'white'} />
                </Tooltip>
              </S.Title>

              <p>Preço unitário: {formatCurrency(product.price)}</p>
              <p>Quantidade em estoque: {product.stock}</p>
              <small>
                Valor total ({product.stock} x {product.price}):{' '}
                {formatCurrency(product.stock * product.price)}
              </small>
            </Box>
            <Box p="lg">
              <S.Title order={3} weight={500}>
                Imagens
              </S.Title>
              <S.ImagesContainer>
                {product.images.map((image, index) => (
                  <Image
                    src={image.location}
                    key={index}
                    width={100}
                    height={100}
                  />
                ))}
              </S.ImagesContainer>
            </Box>
          </S.Section>

          <Divider my="md" />
          <S.Section>
            <Paper withBorder shadow="sm" p="sm">
              <S.Title order={3} weight={500}>
                Descrição
              </S.Title>
              {product.description ? (
                <div>{product.description}</div>
              ) : (
                <Text italic size="sm">
                  Não há descrição ainda.
                </Text>
              )}
            </Paper>
            <S.Provider withBorder shadow="sm" p="sm">
              <S.Title order={3} weight={500}>
                Fornecedor
              </S.Title>
              <div className="row">
                <Text
                  variant="link"
                  onClick={goToProvider}
                  style={{ cursor: 'pointer' }}
                >
                  Nome: {product.provider.name}
                </Text>
                <Text is="span">CNPJ: {product.provider.cnpj}</Text>
              </div>
              <Text>Email: {product.provider.email}</Text>
            </S.Provider>
          </S.Section>
          <Divider my="md" />
          <S.Attributes>
            <S.Title order={3} weight={500}>
              Atributos
            </S.Title>
            <div className="body">
              {product.attributes?.map(({ key, value }) => (
                <Text>
                  {key}: {value}
                </Text>
              )) || (
                <Text italic size="sm">
                  Não há atributos ainda.
                </Text>
              )}
            </div>
          </S.Attributes>
          <Divider my="md" />
          <Box>
            <S.Title order={4} weight={500}>
              Atualizações
            </S.Title>
            <Text>
              Criado em: {new Date(product.createdAt).toLocaleString()}
            </Text>
            <Text>
              Última atualização em:{' '}
              {new Date(product.updatedAt).toLocaleString()}
            </Text>
          </Box>
        </>
      )}
    </>
  );
};

export default Product;
