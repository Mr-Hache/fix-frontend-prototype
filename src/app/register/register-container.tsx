'use client';
import RegisterPresentation from './register-presentation';
import { useQuery, useMutation } from '@apollo/client';
import {
  FIND_ALL_BRANDS,
  FIND_ALL_COLORS,
  FIND_ALL_MODELS,
  CREATE_BRAND,
  CREATE_MODEL,
  CREATE_COLOR,
  CREATE_PRODUCTS,
} from '../../services/graphql-request';
import { useEffect } from 'react';
import { Products, QRCodeData } from '../../resources/types/general-types';
import { generateAndDownloadQRCodes } from '@/resources/functions';
import { QRCode } from 'qrcode';

const RegisterContainer = () => {
  const {
    data: brands,
    loading: brandsLoading,
    error: brandsError,
    refetch: refetchBrands,
  } = useQuery(FIND_ALL_BRANDS);
  const {
    data: colors,
    loading: colorsLoading,
    error: colorsError,
    refetch: refetchColors,
  } = useQuery(FIND_ALL_COLORS);
  const {
    data: models,
    loading: modelsLoading,
    error: modelsError,
    refetch: refetchModels,
  } = useQuery(FIND_ALL_MODELS);

  const [
    createModel,
    { loading: createModelLoading, error: createModelError },
  ] = useMutation(CREATE_MODEL);
  const [
    createBrand,
    { loading: createBrandLoading, error: createBrandError },
  ] = useMutation(CREATE_BRAND);
  const [
    createColor,
    { loading: createColorLoading, error: createColorError },
  ] = useMutation(CREATE_COLOR);
  const [
    createProducts,
    { loading: createProductsLoading, error: createProductsError },
  ] = useMutation(CREATE_PRODUCTS);

  const handleCreate = async (name: string, value: string) => {
    if (name === 'marca') {
      try {
        const response = await createBrand({
          variables: {
            createBrandInput: {
              name: value,
            },
          },
        });

        if (response.data) {
          refetchBrands();
        }
      } catch (error) {
        console.log('error', error);
      }
    }

    if (name === 'modelo') {
      try {
        const response = await createModel({
          variables: {
            createModelInput: {
              name: value,
            },
          },
        });

        if (response.data) {
          refetchModels();
        }
      } catch (error) {
        console.log('error', error);
      }
    }

    if (name === 'color') {
      try {
        const response = await createColor({
          variables: {
            createColorInput: {
              name: value,
            },
          },
        });

        if (response.data) {
          refetchColors();
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const handleCreateProducts = async (products: Products[]) => {
    try {
      const response = await createProducts({
        variables: {
          products,
        },
      });

      if (response.data) {
        const qrCodeData: QRCodeData[] = response.data.createProducts.map(
          (product: {
            id: string;
            brand: { name: string };
            model: { name: string };
            color: { name: string };
            size: number;
          }) => {
            return {
              id: product.id,
              size: product.size,
              brand: {
                name: product.brand.name,
              },
              model: {
                name: product.model.name,
              },
              color: {
                name: product.color.name,
              },
            };
          }
        );

        await generateAndDownloadQRCodes(qrCodeData);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <RegisterPresentation
        brands={brands?.findAllBrands}
        colors={colors?.findAllColors}
        models={models?.findAllModels}
        loadings={{
          brandsLoading,
          colorsLoading,
          modelsLoading,
          createModelLoading,
          createBrandLoading,
          createColorLoading,
          createProductsLoading,
        }}
        errors={{
          brandsError,
          colorsError,
          modelsError,
          createModelError,
          createBrandError,
          createColorError,
          createProductsError,
        }}
        handleCreate={handleCreate}
        handleCreateProducts={handleCreateProducts}
      />
    </>
  );
};

export default RegisterContainer;
