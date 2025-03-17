import SideMenu from '@/components/side-menu';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/button';
import { SaleProps } from '@/resources/types/props';
import { ProductsList } from '@/resources/types/general-types';
import ModalSale from '@/components/modal-sale';

const SalePresentation: React.FC<SaleProps> = ({
  handleProducts,
  loadings,
  errors,
}) => {
  const [showModalSale, setShowModalSale] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'store' | 'warehouse' | 'sold'>(
    'store'
  );
  const [productList, setProductList] = useState<ProductsList[] | undefined>(
    []
  );
  const [productsListFiltered, setProductsListFiltered] = useState<
    ProductsList[] | undefined
  >([]);

  useEffect(() => {
    const products = async () => {
      const response = await handleProducts(filter);
      setProductList(response);
    };
    products();
  }, [filter]);

  useEffect(() => {
    if (searchValue.trim() !== '') {
      const filtered = productList?.filter(product =>
        product.model.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setProductsListFiltered(filtered);
    }
  }, [searchValue, productList]);

  return (
    <>
      {showModalSale && <ModalSale setShow={setShowModalSale} />}
      <SideMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      <div className="flex items-center justify-start overflow-hidden flex-col w-screen h-dvh p-3 space-y-3">
        <div className="flex w-full  flex-col sm:flex-row  items-center ">
          <div className="flex items-end justify-between w-full pb-4">
            <div className="flex items-center space-x-2 flex-row justify-center">
              <span
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  fontSize: '24px',
                }}
                className={`material-icons w-fit cursor-pointer ${
                  showMenu && 'z-30'
                } bg-gray-2/50 hover:bg-gray-2/40 text-orange-1 p-1.5 rounded-full `}
              >
                {showMenu ? 'menu_open' : 'menu'}
              </span>
              <h1 className="font-bold text-xl sm:text-2xl">Inventario</h1>
            </div>
            <Image
              src="/icons/fix-icon.png"
              alt="Logo"
              width={50}
              height={50}
              className="w-20"
            ></Image>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-center space-x-2">
              <Button
                text="Venta"
                onClick={() => setShowModalSale(true)}
                state="primary"
                loading={false}
                disabled={false}
              ></Button>
              <Button
                text="Devolución"
                onClick={() => console.log('Devolución')}
                state="primary"
                loading={false}
                disabled={false}
              ></Button>

              <Button
                text="Reubicación"
                onClick={() => console.log('Reubicación')}
                state="primary"
                loading={false}
                disabled={false}
              ></Button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-2">
          <div className="flex items-center justify-center space-x-2">
            <Button
              text="Todos"
              onClick={() => setFilter('all')}
              state="secondary"
              loading={loadings.allProductsLoading}
              disabled={loadings.allProductsLoading}
              selected={filter === 'all'}
            />
            <Button
              text="Tienda"
              onClick={() => setFilter('store')}
              state="secondary"
              loading={loadings.shoesInStoreLoading}
              disabled={loadings.shoesInStoreLoading}
              selected={filter === 'store'}
            />
            <Button
              text="Almacén"
              onClick={() => setFilter('warehouse')}
              state="secondary"
              loading={loadings.shoesInWarehouseLoading}
              disabled={loadings.shoesInWarehouseLoading}
              selected={filter === 'warehouse'}
            />
            <Button
              text="Vendidos"
              onClick={() => setFilter('sold')}
              state="secondary"
              loading={loadings.soldShoesLoading}
              disabled={loadings.soldShoesLoading}
              selected={filter === 'sold'}
            />
          </div>
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="w-full p-2 border border-gray-4 rounded-md outline-none"
            />
          </div>
        </div>
        <div className="flex w-full  h-full max-h-full  justify-center md:w-10/12 lg:w-9/12 xl:w-8/12 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-1/40 scrollbar-track-gray-1">
          <div className="flex w-full h-full max-h-full  ">
            <table className="w-full max-h-full ">
              <thead>
                <tr className="bg-gray-2">
                  <th className=" p-2 rounded-md ">ID</th>
                  <th className=" p-2 rounded-md">Marca</th>
                  <th className=" p-2 rounded-md">Modelo</th>
                  <th className="p-2 rounded-md">Color</th>
                  <th className="p-2 rounded-md">Talla</th>
                </tr>
              </thead>
              <tbody>
                {(searchValue.trim() ? productsListFiltered : productList)?.map(
                  product => (
                    <tr key={product.id} className=" ">
                      <td className="border-b border-gray-300 p-2 text-center">
                        {product.id}
                      </td>
                      <td className="border-b border-gray-300 p-2 text-center">
                        {product.brand.name}
                      </td>
                      <td className="border-b border-gray-300 p-2 text-center">
                        {product.model.name}
                      </td>
                      <td className="border-b border-gray-300 p-2 text-center">
                        {product.color.name}
                      </td>
                      <td className="border-b border-gray-300 p-2 text-center">
                        {product.size}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalePresentation;
