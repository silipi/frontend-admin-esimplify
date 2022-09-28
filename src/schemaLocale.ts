/* eslint-disable no-template-curly-in-string */
import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo obrigatório',
    notType: 'Campo inválido',
  },
  string: {
    min: 'Campo deve ter no mínimo ${min} caracteres',
    max: 'Campo deve ter no máximo ${max} caracteres',
  },
});
