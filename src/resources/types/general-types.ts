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
