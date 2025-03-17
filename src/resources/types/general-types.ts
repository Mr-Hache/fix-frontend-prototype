import { ApolloError } from '@apollo/client';

export type Products = {
  brand: string;
  model: string;
  color: string;
  pares: number;
  size: string;
};

export type QRCodeData = {
  id: string;
  size: number;
  brand: {
    name: string;
  };
  model: {
    name: string;
  };
  color: {
    name: string;
  };
};

export type ProductsList = {
  id: string;
  brand: {
    name: string;
  };
  model: {
    name: string;
  };
  color: {
    name: string;
  };
  size: string;

  location: string;
  isSold: boolean;
};

export type ProductQueryList = {
  data?: {
    getAllProducts?: ProductsList[];
    shoesInStore?: ProductsList[];
    shoesInWarehouse?: ProductsList[];
    soldShoes?: ProductsList[];
  };
  loading: boolean;
  error?: ApolloError;
};

export type ProductSale = {
  id: string;
  price: string;
};
