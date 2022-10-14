export default interface Provider {
  id: string;
  name: string;
  address: string;
  cnpj: string;
  ie: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  // FIXME: temporary, find the taxes for each provider type
  taxes?: any;
  password?: string;
}
