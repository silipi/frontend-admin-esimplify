/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { Box, TextInput, Button, Title, Text } from '@mantine/core';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

interface Props {
  attributes: { key: string; value: string }[];
  setAttributes: (attributes: { key: string; value: string }[]) => void;
}

const Attributes = ({ attributes, setAttributes }: Props) => {
  const [newAttribute, setNewAttribute] = useState({ value: '', key: '' });

  const handleAddAttribute = () => {
    if (!newAttribute.value || !newAttribute.key) {
      return;
    }

    if (attributes.find((attr) => attr.key === newAttribute.key)) {
      toast('Já existe um atributo com esse nome.');
      return;
    }

    setAttributes([...attributes, newAttribute]);
    setNewAttribute({ value: '', key: '' });
  };

  const handleDeleteAttribute = (index: number) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  return (
    <>
      <Title order={3} weight={500}>
        Atributos
      </Title>
      <Text size="xs" color="dimmed">
        São um conjunto de chaves e valores personalizados.
      </Text>
      {attributes.map((attribute, index) => (
        <Box key={index} sx={{ display: 'flex' }}>
          <TextInput value={attribute.key} disabled />
          <TextInput value={attribute.value} disabled />
          <Button onClick={() => handleDeleteAttribute(index)}>
            <MdDelete />
          </Button>
        </Box>
      ))}
      <Box sx={{ display: 'flex', alignItems: 'end' }}>
        <TextInput
          value={newAttribute.key}
          onChange={(e) =>
            setNewAttribute((v) => ({ ...v, key: e.target.value }))
          }
          placeholder='Nome do atributo, ex.: "Peso"'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />
        <TextInput
          value={newAttribute.value}
          onChange={(e) =>
            setNewAttribute((v) => ({ ...v, value: e.target.value }))
          }
          placeholder='Valor do atributo, ex.: "45kg"'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
              handleAddAttribute();
            }
          }}
        />
        <Button onClick={handleAddAttribute}>Adicionar</Button>
      </Box>
    </>
  );
};

export default Attributes;
