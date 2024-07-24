export type CustomerType = {
  id: number;
  name: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currencySymbol: string;
  customerTypes: CustomerType[];
};
