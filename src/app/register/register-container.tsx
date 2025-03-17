'use client';
import RegisterPresentation from './register-presentation';
import { useQuery, useMutation } from '@apollo/client';
import {
  FIND_ALL_BRANDS,
  FIND_ALL_COLORS,
  FIND_ALL_MODELS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  SHOES_IN_STORE,
  SHOES_IN_WAREHOUSE,
  SOLD_SHOES,
  CREATE_BRAND,
  CREATE_MODEL,
  CREATE_COLOR,
  CREATE_PRODUCTS,
} from '../../services/graphql-request';
import { useEffect } from 'react';

const RegisterContainer = () => {
  const { data: brands } = useQuery(FIND_ALL_BRANDS);
  const { data: colors } = useQuery(FIND_ALL_COLORS);
  const { data } = useQuery(FIND_ALL_MODELS);
  const { data: products } = useQuery(GET_ALL_PRODUCTS);
  const { data: shoesInStore } = useQuery(SHOES_IN_STORE);
  const { data: shoesInWarehouse } = useQuery(SHOES_IN_WAREHOUSE);
  const { data: soldShoes } = useQuery(SOLD_SHOES);
  const { data: productById } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: 26642 },
  });

  const [createModel] = useMutation(CREATE_MODEL);
  const [createBrand] = useMutation(CREATE_BRAND);
  const [createColor] = useMutation(CREATE_COLOR);
  const [createProducts] = useMutation(CREATE_PRODUCTS);

  useEffect(() => {
    createProducts({
      variables: {
        createProductInput: {
          products: [
            {
              brand: 'Puma',
              model: 'Timon',
              color: 'Scarlet',
              pares: 10,
              size: 48,
            },
          ],
        },
      },
    });
  }, [createProducts]);

  useEffect(() => {
    createBrand({
      variables: {
        createBrandInput: {
          name: 'Puma', // El campo `name` debe estar dentro de `input`
        },
      },
    });
  }, [createBrand]);

  useEffect(() => {
    createModel({
      variables: {
        createModelInput: {
          name: 'Timon', // El campo `name` debe estar dentro de `input`
        },
      },
    });
  }, [createModel]);

  useEffect(() => {
    createColor({
      variables: {
        createColorInput: {
          name: 'Scarlet', // El campo `name` debe estar dentro de `input`
        },
      },
    });
  }, [createColor]);

  useEffect(() => {
    createProducts({
      variables: {
        products: [
          {
            brand: 'Puma',
            model: 'Timon',
            color: 'Scarlet',
            pares: 10,
            size: '48',
          },
        ],
      },
    });
  }, [createProducts]);

  useEffect(() => {
    console.log('brands', brands);
  }, [brands]);

  useEffect(() => {
    console.log('colors', colors);
  }, [colors]);

  useEffect(() => {
    console.log('models', data);
  }, [data]);

  useEffect(() => {
    console.log('products', products);
  }, [products]);

  useEffect(() => {
    console.log('shoesInStore', shoesInStore);
  }, [shoesInStore]);

  useEffect(() => {
    console.log('shoesInWarehouse', shoesInWarehouse);
  }, [shoesInWarehouse]);

  useEffect(() => {
    console.log('soldShoes', soldShoes);
  }, [soldShoes]);

  useEffect(() => {
    console.log('productById', productById);
  }, [productById]);

  return (
    <div>
      <RegisterPresentation />
    </div>
  );
};

export default RegisterContainer;
