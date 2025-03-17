import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_SALE } from '@/services/graphql-request';
import { ModalSaleProps } from '@/resources/types/props';
import { ProductSale } from '@/resources/types/general-types';
import Button from './button';

const ModalSale: React.FC<ModalSaleProps> = ({ setShow }) => {
  const [registerSale, { loading, error }] = useMutation(REGISTER_SALE);

  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerId, setBuyerId] = useState('');
  const [products, setProducts] = useState<ProductSale[]>([]);

  useEffect(() => {
    let barcode = ''; // Buffer para capturar el código

    const handleScan = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (barcode.trim() !== '') {
          const scannedProduct = JSON.parse(barcode); // Convertimos el string a objeto

          setProducts(prev => [
            ...prev,
            { id: scannedProduct.id, price: '' }, // Solo guardamos el ID
          ]);

          barcode = ''; // Reiniciamos el buffer
        }
      } else {
        barcode += event.key;
      }
    };

    window.addEventListener('keydown', handleScan);
    return () => window.removeEventListener('keydown', handleScan);
  }, []);

  const handleProductChange = (
    index: number,
    field: keyof ProductSale,
    value: string
  ) => {
    setProducts(prev => {
      const updatedProducts = [...prev];
      updatedProducts[index] = { ...updatedProducts[index], [field]: value };
      return updatedProducts;
    });
  };

  const handleSubmit = async () => {
    try {
      await registerSale({
        variables: {
          input: {
            buyerEmail,
            buyerName,
            buyerId,
            products: products.map(p => ({
              id: p.id,
              price: parseFloat(p.price),
            })),
          },
        },
      });
      alert('Venta registrada con éxito');
      setShow(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white-1/30 backdrop-blur-sm">
      <div className="bg-gray-2 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Venta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo del comprador"
            value={buyerEmail}
            onChange={e => setBuyerEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="Nombre del comprador"
            value={buyerName}
            onChange={e => setBuyerName(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="Cédula del comprador"
            value={buyerId}
            onChange={e => setBuyerId(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />

          <h3 className="font-semibold mt-2">Productos Escaneados</h3>
          {products.map((product, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={product.id}
                readOnly
                className="w-1/2 p-2 border rounded bg-gray-200"
              />
              <input
                type="number"
                placeholder="Precio"
                value={product.price}
                onChange={e =>
                  handleProductChange(index, 'price', e.target.value)
                }
                className="w-1/2 p-2 border rounded"
                required
              />
            </div>
          ))}
          <div className="flex w-full items-center justify-center ">
            <Button
              text="Registrar Venta"
              loading={loading}
              state="secondary"
              disabled={
                loading ||
                !buyerEmail ||
                !buyerName ||
                !buyerId ||
                !products.length
              }
              onClick={handleSubmit}
            />
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
        <button onClick={() => setShow(false)} className="mt-4 text-gray-500">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalSale;
