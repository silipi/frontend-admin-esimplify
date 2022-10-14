export default interface Product {
  id: string;
  name: string;
  description: string;
  color: string;
  attributes?: { key: string; value: string }[];
  createdAt: string;
  updatedAt: string;
  providerId: string;
  price: number;
  stock: number;
  provider: {
    name: string;
    cnpj: string;
    email: string;
  };
  images: any[];
}
