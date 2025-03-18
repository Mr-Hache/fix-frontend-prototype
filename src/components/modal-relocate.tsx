import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ProductSale } from '@/resources/types/general-types';
import Button from './button';
import { UPDATE_PRODUCTS_LOCATION } from '@/services/graphql-request';
import { ModalRelocateProps } from '@/resources/types/props';

const ModalRelocate = ({ setShow }: ModalRelocateProps) => {
  const [updateProductsLocation, { data, loading, error }] = useMutation(
    UPDATE_PRODUCTS_LOCATION
  );
  const [productsId, setProductsId] = useState<string[]>([]);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [locationSelected, setLocationSelected] = useState<string | null>(null);

  useEffect(() => {
    let barcode = '';
    let scanTimeout: NodeJS.Timeout | null = null;

    const handleKeyDown = (event: KeyboardEvent) => {
      // 🔹 Bloquear ciertas teclas SIEMPRE
      if (
        [
          'Tab',
          'Enter',
          'Shift',
          'Control',
          'Alt',
          'Meta',
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
        ].includes(event.key)
      ) {
        event.preventDefault();
      }

      // 🔹 Si el escáner no está activo, salir después de bloquear las teclas
      if (!isScannerActive) return;

      // 🔹 Capturar caracteres imprimibles
      if (event.key.length === 1) {
        barcode += event.key;
      }

      // 🔹 Reiniciar temporizador para detectar fin del escaneo
      if (scanTimeout) clearTimeout(scanTimeout);
      scanTimeout = setTimeout(() => {
        if (barcode) {
          let scannedProduct;
          try {
            scannedProduct = JSON.parse(barcode);
          } catch {
            scannedProduct = { id: barcode.trim() };
          }

          if (!scannedProduct.id) {
            setErrorMessage('El código de barras no contiene un ID válido.');
            barcode = '';
          } else {
            setProductsId([...productsId, scannedProduct.id]);
            barcode = '';
          }
        }
      }, 100);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isScannerActive, productsId]);

  const handleSubmit = async () => {
    if (!productsId.length) {
      setErrorMessage('No se han escaneado productos.');
      return;
    }

    if (!locationSelected) {
      setErrorMessage('No se ha seleccionado una ubicación.');
      return;
    }

    try {
      const response = await updateProductsLocation({
        variables: {
          productIds: productsId,
          location: locationSelected,
        },
      });

      if (response.data.updateProductsLocation.length) {
        setProductsId([]);
        setErrorMessage(null);
        alert('Ubicación actualizada correctamente.');
        setShow(false);
      }
    } catch (error) {
      setErrorMessage('Error al actualizar la ubicación de los productos.');
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white-1/30 backdrop-blur-sm">
      <div className="bg-gray-2 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar locación</h2>

        <h3 className="font-semibold">Ubicación</h3>
        <select
          value={locationSelected || ''}
          onChange={event => setLocationSelected(event.target.value)}
          className="w-full p-2 border border-gray-4 cursor-pointer  rounded-md outline-none"
        >
          <option value="" className="bg-gray-4 ">
            Seleccionar...
          </option>
          <option value="store" className="bg-gray-4 ">
            Tienda
          </option>
          <option value="bodega" className="bg-gray-4">
            Almacén
          </option>
        </select>

        <h3 className="font-semibold mt-2 ">Productos Escaneados</h3>
        {productsId.map((id, index) => (
          <div
            key={index}
            className="flex justify-center items-center space-x-2 mb-2"
          >
            <span>{id}</span>
            <span
              onClick={() => {
                setProductsId(prev =>
                  prev.filter(productId => productId !== id)
                );
              }}
              className="p-1 material-icons cursor-pointer material-icons"
            >
              delete
            </span>
          </div>
        ))}

        {/* Mensaje de error */}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <div className="flex w-full items-center justify-between mt-4">
          <span
            onClick={event => {
              setIsScannerActive(prev => !prev);

              // 🔹 Quitar el foco del botón después de activarlo/desactivarlo
              setTimeout(() => {
                (event.target as HTMLElement).blur();
              }, 10);
            }}
            className="p-2 bg-gray-4 text-white-1 rounded-md cursor-pointer"
          >
            {isScannerActive ? 'Desactivar Escáner' : 'Activar Escáner'}
          </span>
          <Button
            text={'Registrar Locación'}
            loading={loading}
            state="secondary"
            disabled={loading || !productsId.length || isScannerActive}
            onClick={handleSubmit}
          />
        </div>

        <button
          onClick={() => {
            if (productsId.length) {
              const confirmClose = confirm(
                '¿Estás seguro de que quieres cerrar? Se perderán los datos ingresados.'
              );
              if (confirmClose) setShow(false);
            } else {
              setShow(false);
            }
          }}
          className="mt-4 cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalRelocate;
