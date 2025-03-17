import Image from 'next/image';
import { RegisterProps } from '@/resources/types/props';
import { useEffect, useState } from 'react';
import Input from '@/components/input';
import Button from '@/components/button';
import ModalAdd from '@/components/modal-add';
import { Products } from '@/resources/types/general-types';
import ModalConfirm from '@/components/modal-confirm';
import SideMenu from '@/components/side-menu';

const registerPresentation: React.FC<RegisterProps> = ({
  brands,
  colors,
  models,
  loadings,
  errors,
  handleCreate,
  handleCreateProducts,
}) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [pairs, setPairs] = useState('');
  const [add, setAdd] = useState(false);
  const [openAdd, setOpenAdd] = useState(true);
  const [showCreateBrand, setShowCreateBrand] = useState(false);
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [showCreateColor, setShowCreateColor] = useState(false);
  const [showCreateProducts, setShowCreateProducts] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const isBrandValid = brands?.some(b => b.name === brand);

    const isModelValid = models?.some(m => m.name === model);

    const isColorValid = colors?.some(c => c.name === color);

    const isSizeValid = size.trim() !== '';
    const isPairsValid = pairs.trim() !== '';

    if (
      isBrandValid &&
      isModelValid &&
      isColorValid &&
      isSizeValid &&
      isPairsValid
    ) {
      setAdd(true);
    } else {
      setAdd(false);
    }
  }, [brand, model, color, size, pairs, brands, colors, models]);

  useEffect(() => {
    console.log('brands', brands);
  }, [brands]);

  useEffect(() => {
    console.log('colors', colors);
  }, [colors]);

  useEffect(() => {
    console.log('models', models);
  }, [models]);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'brand':
        setBrand(value);
        break;
      case 'model':
        setModel(value);
        break;
      case 'color':
        setColor(value);
        break;
      case 'size':
        setSize(value);
        break;
      case 'pairs':
        setPairs(value);
        break;
    }
  };

  const onClickAddProduct = () => {
    if (add) {
      setProducts([
        ...products,
        {
          brand,
          model,
          color,
          size,
          pares: parseInt(pairs),
        },
      ]);

      // setBrand('');
      // setModel('');
      // setColor('');
      // setSize('');
      // setPairs('');
      // setAdd(false);
    }
  };

  const noClickCreateProducts = () => {
    handleCreateProducts(products);

    setProducts([]);
    setShowCreateProducts(!showCreateProducts);
  };

  return (
    <>
      {showCreateBrand && (
        <ModalAdd
          title="Añadir Marca"
          loading={loadings.createBrandLoading}
          name="marca"
          setShowModal={setShowCreateBrand}
          onClick={handleCreate}
        />
      )}

      {showCreateModel && (
        <ModalAdd
          title="Añadir Modelo"
          loading={loadings.createModelLoading}
          name="modelo"
          setShowModal={setShowCreateModel}
          onClick={handleCreate}
        />
      )}

      {showCreateColor && (
        <ModalAdd
          title="Añadir Color"
          loading={loadings.createColorLoading}
          name="color"
          setShowModal={setShowCreateColor}
          onClick={handleCreate}
        />
      )}

      {showCreateProducts && (
        <ModalConfirm
          onClick={noClickCreateProducts}
          setShowModal={setShowCreateProducts}
        />
      )}

      <SideMenu setShowMenu={setShowMenu} showMenu={showMenu} />

      <div className="flex items-center justify-start overflow-hidden flex-col w-screen h-dvh p-3">
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
              <h1 className="font-bold text-xl sm:text-2xl">
                Añadir Mercancía
              </h1>
            </div>
            <Image
              src="/icons/fix-icon.png"
              alt="Logo"
              width={50}
              height={50}
              className="w-20"
            ></Image>
          </div>
          <div className="flex w-full sm:justify-end space-x-2">
            <Button
              text="Añadir color"
              loading={loadings.createColorLoading}
              disabled={loadings.createColorLoading}
              onClick={() => {
                setShowCreateColor(!showCreateColor);
              }}
              state="primary"
            ></Button>
            <Button
              text="Añadir modelo"
              loading={loadings.createModelLoading}
              disabled={loadings.createModelLoading}
              onClick={() => {
                setShowCreateModel(!showCreateModel);
              }}
              state="primary"
            ></Button>
            <Button
              text="Añadir marca"
              loading={loadings.createBrandLoading}
              disabled={loadings.createBrandLoading}
              onClick={() => {
                setShowCreateBrand(!showCreateBrand);
              }}
              state="primary"
            ></Button>
          </div>
        </div>
        <div className="flex w-full  flex-col justify-center items-center">
          <div className="w-full flex justify-end px-5 pt-5 sm:pt-0 sm:px-10">
            <span
              onClick={() => setOpenAdd(!openAdd)}
              className="material-icons text-orange-1 select-none cursor-pointer"
            >
              {openAdd ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </div>
          {openAdd && (
            <div className="flex w-full flex-col justify-center items-center space-y-3 sm:space-y-10">
              <div className="flex w-full justify-center items-center  sm:flex-row flex-col space-y-3 sm:space-y-0 sm:space-x-5 sm:w-9/12 lg:w-8/12 xl:w-6/12">
                <Input
                  type="text"
                  placeholder="Adidas..."
                  value={brand}
                  onChange={handleChanges}
                  name="brand"
                  label="Marca"
                  options={brands?.map(brand => brand.name)}
                  loadingOptions={loadings.brandsLoading}
                ></Input>
                <Input
                  type="text"
                  placeholder="Jabbar OG..."
                  value={model}
                  onChange={handleChanges}
                  name="model"
                  label="Modelo"
                  options={models?.map(model => model.name)}
                  loadingOptions={loadings.modelsLoading}
                ></Input>
              </div>
              <div className="flex w-full justify-center items-center  sm:flex-row flex-col space-y-3 sm:space-y-0 sm:space-x-5  lg:w-10/12 ">
                <Input
                  type="text"
                  placeholder="Blanco..."
                  value={color}
                  onChange={handleChanges}
                  name="color"
                  label="Color"
                  options={colors?.map(color => color.name)}
                  loadingOptions={loadings.colorsLoading}
                ></Input>
                <Input
                  type="number"
                  placeholder="39..."
                  value={size}
                  onChange={handleChanges}
                  name="size"
                  label="Talla"
                  options={undefined}
                  loadingOptions={false}
                ></Input>
                <Input
                  type="number"
                  placeholder="2..."
                  value={pairs}
                  onChange={handleChanges}
                  name="pairs"
                  label="# de pares"
                  options={undefined}
                  loadingOptions={false}
                ></Input>
                <span
                  onClick={onClickAddProduct}
                  className={`${
                    add
                      ? 'text-orange-1 shadow-layout cursor-pointer'
                      : 'text-gray-4'
                  } material-icons p-3 bg-gray-3 rounded-full select-none sm:p-1`}
                >
                  {' '}
                  add
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex w-full h-full mt-5 max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-orange-1/40 scrollbar-track-gray-1">
          <div className="flex w-full flex-col justify-start items-center max-h-full">
            <table className="w-full border-collapse  max-h-full md:w-10/12 lg:w-9/12 xl:w-8/12">
              {/* Encabezados de la tabla */}
              <thead>
                <tr className="bg-gray-2/70 ">
                  <th className="p-2 rounded-lg sm:p-1 text-center">Marca</th>
                  <th className="p-2 rounded-lg sm:p-1 text-center">Modelo</th>
                  <th className="p-2 rounded-lg sm:p-1 text-center">Color</th>
                  <th className="p-2 rounded-lg sm:p-1 text-center">Talla</th>
                  <th className="p-2 rounded-lg sm:p-1 text-center">Pares</th>
                </tr>
              </thead>

              {/* Cuerpo de la tabla */}
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className=" border-gray-3 ">
                    <td className="p-1 text-center border-b">
                      {product.brand}
                    </td>
                    <td className="p-1 text-center border-b">
                      {product.model}
                    </td>
                    <td className="p-1 text-center border-b">
                      {product.color}
                    </td>
                    <td className="p-1 text-center border-b">{product.size}</td>
                    <td className="p-1 text-center border-b">
                      {product.pares}
                    </td>
                    <td className="p-1">
                      <span
                        onClick={() => {
                          setProducts(products.filter((p, i) => i !== index));
                        }}
                        className="material-icons text-orange-1/30 cursor-pointer selected-none"
                      >
                        delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <Button
            text="Registrar"
            loading={loadings.createProductsLoading}
            disabled={products.length === 0}
            onClick={() => {
              setShowCreateProducts(!showCreateProducts);
            }}
            state="primary"
          ></Button>
        </div>
      </div>
    </>
  );
};

export default registerPresentation;
