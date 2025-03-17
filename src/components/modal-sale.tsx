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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let barcode = ""; // Buffer para capturar el código
    let scanTimeout: NodeJS.Timeout | null = null;
  
    const handleScan = (event: KeyboardEvent) => {
      event.preventDefault(); // Evita activaciones accidentales de botones
  
      // 🔹 Evitar interferencias con inputs
      if (document.activeElement && ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        return;
      }
  
      // 🔹 Filtrar solo caracteres imprimibles (evita teclas como Shift, Control, etc.)
      if (event.key.length === 1) {
        barcode += event.key;
      }
  
      // 🔹 Reiniciar temporizador: cuando pasan 100ms sin más teclas, procesamos el código
      if (scanTimeout) clearTimeout(scanTimeout);
      scanTimeout = setTimeout(() => {
        if (barcode) {
          console.log("Código escaneado (bruto):", barcode);
  
          // 🔹 Eliminar caracteres no deseados
          barcode = barcode.replace(/(Control|AltGraph|Shift|Tab)/g, "").trim();
          console.log("Código escaneado (limpio):", barcode);
  
          // 🔹 Convertir el código en JSON si es válido
          let scannedProduct;
          try {
            scannedProduct = JSON.parse(barcode);
          } catch {
            scannedProduct = { id: barcode, price: "0" }; // 🔹 Asegurar estructura válida
          }
  
          console.log("Producto escaneado:", scannedProduct);
  
          // 🔹 Validar que `id` existe
          if (!scannedProduct || !scannedProduct.id) {
            setErrorMessage("El código de barras no contiene un ID válido.");
            barcode = ""; // Limpiar buffer
            return;
          }
  
          // 🔹 Asegurar que `price` siempre es un string
          setProducts(prev => [
            ...prev,
            { id: scannedProduct.id, price: scannedProduct.price ? scannedProduct.price.toString() : "0" }
          ]);
  
          barcode = ""; // 🔹 Reiniciar buffer
        }
      }, 100); // 🔹 Si en 100ms no llegan más teclas, se considera que terminó la lectura
    };
  
    window.addEventListener("keydown", handleScan);
    return () => window.removeEventListener("keydown", handleScan);
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
    setErrorMessage(null); // Limpiamos mensajes de error anteriores

    // Validar campos requeridos
    if (!buyerEmail || !buyerName || !buyerId || !products.length) {
      setErrorMessage('Por favor, complete todos los campos requeridos.');
      return;
    }

    // Validar precios
    const isValid = products.every(product => !isNaN(parseFloat(product.price)));
    if (!isValid) {
      setErrorMessage('Por favor, ingrese precios válidos para todos los productos.');
      return;
    }

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
      setErrorMessage('Error al registrar la venta. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white-1/30 backdrop-blur-sm">
      <div className="bg-gray-2 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Venta</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
                className="w-1/2 p-2 border rounded bg-gray-1/10"
                placeholder="ID del producto"
              />
              <input
                type="number"
                placeholder="Precio"
                value={product.price}
                onChange={e => handleProductChange(index, 'price', e.target.value)}
                className="w-1/2 p-2 border rounded"
                required
              />
            </div>
          ))}

          {/* Mensaje de error */}
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}

          <div className="flex w-full items-center justify-center">
            <Button
              text={loading ? 'Registrando...' : 'Registrar Venta'}
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

        <button
          onClick={() => {
            if (buyerEmail || buyerName || buyerId || products.length) {
              const confirmClose = confirm('¿Estás seguro de que quieres cerrar? Se perderán los datos ingresados.');
              if (confirmClose) setShow(false);
            } else {
              setShow(false);
            }
          }}
          className="mt-4 text-gray-500"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalSale;