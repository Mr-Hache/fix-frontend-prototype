import { ApolloError } from '@apollo/client';

export type RegisterProps = {
  brands:
    | [
        {
          id: number;
          name: string;
        }
      ]
    | null;
  colors:
    | [
        {
          id: number;
          name: string;
        }
      ]
    | null;
  models:
    | [
        {
          id: number;
          name: string;
        }
      ]
    | null;

  loadings: {
    brandsLoading: boolean;
    colorsLoading: boolean;
    modelsLoading: boolean;
    createModelLoading: boolean;
    createBrandLoading: boolean;
    createColorLoading: boolean;
    createProductsLoading: boolean;
  };

  errors: {
    brandsError: ApolloError | undefined;
    colorsError: ApolloError | undefined;
    modelsError: ApolloError | undefined;
    createModelError: ApolloError | undefined;
    createBrandError: ApolloError | undefined;
    createColorError: ApolloError | undefined;
    createProductsError: ApolloError | undefined;
  };

  handleCreate: (name: string, value: string) => void;
  handleCreateProducts: (products: Products[]) => void;
};

export type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  options: string[] | undefined;
  label: string;
  loadingOptions: boolean;
};

export type ButtonProps = {
  text: string;
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
  state: string;
  selected?: boolean;
};

export type ModalAddProps = {
  title: string;
  loading: boolean;
  name: string;
  setShowModal: (value: boolean) => void;
  onClick: (name: string, value: string) => void;
};

export type ModalConfirmProps = {
  onClick: () => void;
  setShowModal: (value: boolean) => void;
};

export type SideMenuProps = {
  setShowMenu: (value: boolean) => void;
  showMenu: boolean;
};

export type ItemSideMenuProps = {
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  iconName: string;
  selected: boolean;
};

export type SaleProps = {
  handleProducts: (
    filter: 'all' | 'store' | 'warehouse' | 'sold'
  ) => Promise<ProductsList[] | undefined | []>;

  loadings: {
    allProductsLoading: boolean;
    shoesInStoreLoading: boolean;
    shoesInWarehouseLoading: boolean;
    soldShoesLoading: boolean;
  };

  errors: {
    allProductsError: ApolloError | undefined;
    shoesInStoreError: ApolloError | undefined;
    shoesInWarehouseError: ApolloError | undefined;
    soldShoesError: ApolloError | undefined;
  };
};

export type ModalSaleProps = {
  setShow: (value: boolean) => void;
};
