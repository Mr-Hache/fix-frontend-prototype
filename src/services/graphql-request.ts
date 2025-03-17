import { gql } from '@apollo/client';

// QUERIES
export const FIND_ALL_BRANDS = gql`
  query FindAllBrands {
    findAllBrands {
      id
      name
      products {
        id
      }
    }
  }
`;

export const FIND_ALL_COLORS = gql`
  query FindAllColors {
    findAllColors {
      id
      name
      products {
        id
      }
    }
  }
`;

export const FIND_ALL_MODELS = gql`
  query FindAllModels {
    findAllModels {
      id
      name
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      brand {
        name
      }
      color {
        name
      }
      id
      isSold
      location
      model {
        name
      }
      sale {
        id
      }
      size
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: Float!) {
    getProductById(id: $id) {
      id
    }
  }
`;

export const SHOES_IN_STORE = gql`
  query ShoesInStore {
    shoesInStore {
      id
    }
  }
`;

export const SHOES_IN_WAREHOUSE = gql`
  query ShoesInWarehouse {
    shoesInWarehouse {
      id
    }
  }
`;

export const SOLD_SHOES = gql`
  query SoldShoes {
    soldShoes {
      id
    }
  }
`;

// MUTATIONS

export const CREATE_BRAND = gql`
  mutation CreateBrand($createBrandInput: CreateBrandInput!) {
    createBrand(createBrandInput: $createBrandInput) {
      id
      name
    }
  }
`;

export const CREATE_MODEL = gql`
  mutation CreateModel($createModelInput: CreateModelInput!) {
    createModel(createModelInput: $createModelInput) {
      id
      name
    }
  }
`;

export const CREATE_COLOR = gql`
  mutation CreateColor($createColorInput: CreateColorInput!) {
    createColor(createColorInput: $createColorInput) {
      id
      name
    }
  }
`;

export const CREATE_PRODUCTS = gql`
  mutation CreateProducts($products: [CreateProductDto!]!) {
    createProducts(products: $products) {
      id
      brand {
        name
      }

      color {
        name
      }
      model {
        name
      }
      size
    }
  }
`;

export const REGISTER_SALE = gql`
  mutation RegisterSale($input: RegisterSaleInput!) {
    registerSale(inputSaleInput: $inputSaleInput) {
      id
    }
  }
`;
