export const formatCurrency = (value: string | number) => {
  if (typeof value === 'string') {
    return value;
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
