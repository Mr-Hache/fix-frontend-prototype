import SideMenu from '@/components/side-menu';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/button';
import { SaleProps } from '@/resources/types/props';
import { ProductsList } from '@/resources/types/general-types';
import ModalSale from '@/components/modal-sale';
import ModalReturn from '@/components/modal-return';
import ModalRelocate from '@/components/modal-relocate';

const SalePresentation: React.FC<SaleProps> = ({
  handleProducts,
  loadings,
  errors,
}) => {
  const [showModalSale, setShowModalSale] = useState(false);
  const [showModalReturn, setShowModalReturn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showModalRelocate, setShowModalRelocate] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [countItems, setCountItems] = useState<null | number>(null);
  const [filter, setFilter] = useState<'all' | 'store' | 'warehouse' | 'sold'>(
    'warehouse'
  );
  const [sizeFilter, setSizeFilter] = useState<string>('');
  const [productList, setProductList] = useState<ProductsList[] | undefined>(
    []
  );
  const [productsListFiltered, setProductsListFiltered] = useState<
    ProductsList[] | undefined
  >([]);

  useEffect(() => {
    const products = async () => {
      const response = await handleProducts(filter);
      if (filter == 'sold' && response !== undefined) {
        if (response?.length > 0) {
          // Ordenar por fecha más reciente primero
          const sortedProducts = [...response].sort((a, b) => {
            const dateA = new Date(a.sale?.soldAt || 0);
            const dateB = new Date(b.sale?.soldAt || 0);
            return dateB.getTime() - dateA.getTime();
          });
          setProductList(sortedProducts);
        }
      } else {
        setProductList(response);
      }
    };
    products();
  }, [filter]);
  useEffect(() => {
    if (searchValue.trim() !== '' || sizeFilter !== '') {
      const filtered = productList?.filter(product => {
        const matchesModel = product.model.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        const matchesSize =
          sizeFilter === '' || product.size.toString() === sizeFilter;
        return matchesModel && matchesSize;
      });

      if (filtered) {
        setCountItems(filtered?.length || 0);
      }

      setProductsListFiltered(filtered);
    } else if (productList) {
      setCountItems(productList.length);
      setProductsListFiltered(productList);
    }
  }, [searchValue, sizeFilter, productList]);

  // useEffect(() => {
  //   console.log('Product List:', productList);
  // }, [productList]);

  return (
    <>
      {showModalRelocate && <ModalRelocate setShow={setShowModalRelocate} />}
      {showModalReturn && <ModalReturn setShow={setShowModalReturn} />}
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
                onClick={() => setShowModalReturn(true)}
                state="primary"
                loading={false}
                disabled={false}
              ></Button>

              <Button
                text="Reubicación"
                onClick={() => setShowModalRelocate(true)}
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
              text="Bodega"
              onClick={() => setFilter('warehouse')}
              state="secondary"
              loading={loadings.shoesInWarehouseLoading}
              disabled={loadings.shoesInWarehouseLoading}
              selected={filter === 'warehouse'}
            />
            <Button
              text="Local"
              onClick={() => setFilter('store')}
              state="secondary"
              loading={loadings.shoesInStoreLoading}
              disabled={loadings.shoesInStoreLoading}
              selected={filter === 'store'}
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
          <div className="w-full flex sm:space-y-0 sm:space-x-2 space-y-2 sm:w-auto flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Ej: Gores..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="w-full p-2 border border-gray-4 rounded-md outline-none"
            />{' '}
            <input
              type="text"
              placeholder="Ej: 42..."
              value={sizeFilter}
              onChange={e => setSizeFilter(e.target.value)}
              className="w-full p-2 border border-gray-4 rounded-md outline-none"
            />
          </div>
          {countItems !== null && (
            <div className="flex items-center justify-center">
              <span className="text-gray-500">
                Número de productos: {countItems}
              </span>
            </div>
          )}
        </div>
        <div className="flex w-full   max-h-full  justify-start md:w-10/12 lg:w-9/12 xl:w-8/12 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-1/40 scrollbar-track-gray-1">
          <div className="flex w-full  max-h-full ">
            <table className="w-full  ">
              <thead>
                <tr className="bg-gray-2">
                  <th className=" p-2 rounded-md ">ID</th>
                  <th className=" p-2 rounded-md">Marca</th>
                  <th className=" p-2 rounded-md">Modelo</th>
                  <th className="p-2 rounded-md">Color</th>
                  <th className="p-2 rounded-md">Talla</th>
                  {filter === 'sold' && (
                    <th className="p-2 rounded-md">Fecha de venta</th>
                  )}
                </tr>
              </thead>
              <tbody className="">
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
                      {filter === 'sold' && (
                        <td className="border-b border-gray-300 p-2 text-center">
                          {new Date(
                            product.sale?.soldAt || ''
                          ).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',

                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </td>
                      )}
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
