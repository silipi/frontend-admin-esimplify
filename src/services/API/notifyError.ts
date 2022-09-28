import toast from 'react-hot-toast';

const ERRORS_MESSAGES = {
  'admin/admins-not-set':
    'Variável de ambiente ADMINS não foi configurada no backend',
  'admin/login-not-authorized': 'Administrador não autorizado',
  'unexpected-error': 'Erro inesperado, por favor, tente novamente',
  'product/not-found': 'Produto não encontrado',
  'provider/not-found': 'Fornecedor não encontrado',
  'provider/products-not-found': 'Este fornecedor não possui produtos',
  'provider/cnpj-already-exists': 'Este CNPJ já está cadastrado',
};

const notifyError = (error: any) => {
  if (error && error?.response?.data?.code) {
    const { code } = error.response.data as { code: string };
    const message =
      // @ts-ignore
      ERRORS_MESSAGES[code] ||
      error.response.data.message ||
      ERRORS_MESSAGES['unexpected-error'];

    toast.error(message);
  } else {
    toast.error(ERRORS_MESSAGES['unexpected-error']);
  }
};

export default notifyError;
