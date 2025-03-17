'use client';
import SalePresentation from './sale-presentation';
import {
  GET_ALL_PRODUCTS,
  SHOES_IN_STORE,
  SHOES_IN_WAREHOUSE,
  SOLD_SHOES,
  UPDATE_PRODUCTS_LOCATION,
  REGISTER_SALE,
  RETURN_PRODUCTS,
} from '@/services/graphql-request';
import { useLazyQuery, useMutation } from '@apollo/client';
import { use, useEffect } from 'react';
import {
  ProductsList,
  ProductQueryList,
} from '@/resources/types/general-types';

const SaleContainer = () => {
  const [
    getProducts,
    { data: productsData, loading: productsLoading, error: productsError },
  ] = useLazyQuery(GET_ALL_PRODUCTS);
  const [
    getShoesInStore,
    {
      data: shoesInStoreData,
      loading: shoesInStoreLoading,
      error: shoesInStoreError,
    },
  ] = useLazyQuery(SHOES_IN_STORE);
  const [
    getShoesInWarehouse,
    {
      data: shoesInWarehouseData,
      loading: shoesInWarehouseLoading,
      error: shoesInWarehouseError,
    },
  ] = useLazyQuery(SHOES_IN_WAREHOUSE);

  const [
    getSoldShoes,
    { data: soldShoesData, loading: soldShoesLoading, error: soldShoesError },
  ] = useLazyQuery(SOLD_SHOES);

  //   const [returnProducts, { data: returnProductsData }] =
  //     useMutation(RETURN_PRODUCTS);

  //   useEffect(() => {
  //     returnProducts({
  //       variables: {
  //         productIds: ['10210'],
  //       },
  //     });
  //   }, [returnProductsData]);

  //   const [registerSale, { data: registerSaleData }] = useMutation(REGISTER_SALE);

  //   const [updateProductsLocation, { data: updateProductsLocationData }] =
  //     useMutation(UPDATE_PRODUCTS_LOCATION);

  //   useEffect(() => {
  //     updateProductsLocation({
  //       variables: {
  //         location: 'store',
  //         productIds: ['10210'],
  //       },
  //     });
  //   }, [updateProductsLocationData]);

  const handleProducts = async (
    filter: 'all' | 'store' | 'warehouse' | 'sold'
  ): Promise<ProductsList[] | undefined | []> => {
    try {
      let response: ProductQueryList;

      switch (filter) {
        case 'all':
          response = await getProducts();
          break;
        case 'store':
          response = await getShoesInStore();
          break;
        case 'warehouse':
          response = await getShoesInWarehouse();
          break;
        case 'sold':
          response = await getSoldShoes();
          break;
        default:
          response = await getProducts();
          break;
      }

      if (response?.data) {
        switch (filter) {
          case 'all':
            return response.data.getAllProducts;
          case 'store':
            // console.log(response.data.shoesInStore);
            return response.data.shoesInStore;
          case 'warehouse':
            //  console.log(response.data.shoesInWarehouse);
            return response.data.shoesInWarehouse;
          case 'sold':
            return response.data.soldShoes;
          default:
            return response.data.getAllProducts;
        }
      }
      return [];
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      return [];
    }
  };

  return (
    <SalePresentation
      handleProducts={handleProducts}
      loadings={{
        allProductsLoading: productsLoading,
        shoesInStoreLoading: shoesInStoreLoading,
        shoesInWarehouseLoading: shoesInWarehouseLoading,
        soldShoesLoading: soldShoesLoading,
      }}
      errors={{
        allProductsError: productsError,
        shoesInStoreError: shoesInStoreError,
        shoesInWarehouseError: shoesInWarehouseError,
        soldShoesError: soldShoesError,
      }}
    />
  );
};

export default SaleContainer;
