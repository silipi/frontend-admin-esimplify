import React from 'react';
import { TextInput } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

const moneyMask = (value: string) => {
  value = value.replace('.', '').replace(',', '').replace(/\D/g, '');

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(value) / 100,
  );

  return `R$ ${Number.isNaN(result) ? '0,00' : result}`;
};

export interface PriceInputProps {
  name: string;
  label?: string;
  [key: string]: any;
}

const PriceInput = React.forwardRef<HTMLInputElement, any>(
  ({ name, label, ...rest }: PriceInputProps) => {
    const { setValue, getValues } = useFormContext();
    const [maskedValue, setMaskedValue] = React.useState(
      new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency',
      }).format(getValues(name) || 0),
    );

    return (
      <TextInput
        label={label || undefined}
        {...rest}
        type="text"
        value={maskedValue}
        onKeyDown={(e) => {
          if (e.key === 'Backspace') {
            setValue(name, 0);
            setMaskedValue('R$ 0,00');
          }
        }}
        onChange={(e) => {
          const { value } = e.target;

          const unmaskedValue = value
            .replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.');
          const masked = moneyMask(unmaskedValue);

          const numberValue = Number(
            masked.replace('R$ ', '').replace('.', '').replace(',', '.'),
          );

          setMaskedValue(masked);
          setValue(name, numberValue);
        }}
      />
    );
  },
);

export default PriceInput;
