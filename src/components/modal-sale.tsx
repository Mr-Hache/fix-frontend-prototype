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
  const [isScannerActive, setIsScannerActive] = useState(true);

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
            scannedProduct = { id: barcode.trim(), price: '0' };
          }

          if (!scannedProduct.id) {
            setErrorMessage('El código de barras no contiene un ID válido.');
            barcode = '';
            return;
          }

          setProducts(prev => [
            ...prev,
            {
              id: scannedProduct.id,
              price: scannedProduct.price
                ? scannedProduct.price.toString()
                : '0',
            },
          ]);

          barcode = '';
        }
      }, 100);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isScannerActive]);

  // 🔹 Nuevo efecto para bloquear inputs
  useEffect(() => {
    const inputs = document.querySelectorAll('input, textarea');

    if (isScannerActive) {
      inputs.forEach(input => ((input as HTMLInputElement).disabled = true));
    } else {
      inputs.forEach(input => ((input as HTMLInputElement).disabled = false));
    }

    return () => {
      inputs.forEach(input => ((input as HTMLInputElement).disabled = false));
    };
  }, [isScannerActive]);

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
    const isValid = products.every(
      product => !isNaN(parseFloat(product.price))
    );
    if (!isValid) {
      setErrorMessage(
        'Por favor, ingrese precios válidos para todos los productos.'
      );
      return;
    }

    try {
      const response = await registerSale({
        variables: {
          input: {
            buyerEmail,
            buyerName,
            buyerId,
            products: products.map(p => ({
              id: p.id.toString(),
              price: parseInt(p.price),
            })),
          },
        },
      });
      if (response.data?.registerSale) {
        alert('Venta registrada con éxito');
        console.log('Venta registrada:', response.data.registerSale);
        const invoiceContent = `
        <html>
          <head>
       
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1, h2 { text-align: center; }
              .invoice { width: 250px; margin: 0 auto;  padding: 10px; }
              .invoice-header { text-align: center; }
              .invoice-details { margin-top: 10px; }
              .invoice-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              .invoice-table th, .invoice-table td { border: 1px solid #000; padding: 5px; text-align: left; }
              .invoice-total { margin-top: 10px; text-align: right; }
              .invoice-footer { text-align: center; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="invoice">
              <div class="invoice-header">
                <h2>RECIBO DE PAGO</h2>
              </div>
              <div class="invoice-details">
                <p><strong>Fecha y hora:</strong> ${new Date(
                  response.data.registerSale.soldAt
                ).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',

                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
                </p>
                <p><strong>Recibo No:</strong> ${
                  response.data.registerSale.id
                }</p>
                <p><strong>Cliente:</strong> ${
                  response.data.registerSale.buyerName
                }</p>
                <p><strong>Documento:</strong> ${
                  response.data.registerSale.buyerId
                }</p>
              </div>
              <table class="invoice-table">
                <thead>
                  <tr>
                    <th>Mod.</th>
                    <th>Tall.</th>
                    <th>Cant.</th>
                    <th>Prec.</th>
                  </tr>
                </thead>
                <tbody>
                ${response.data.registerSale.products
                  .map(
                    (product: {
                      id: number;
                      priceAtSale: number;
                      brand: {
                        name: string;
                      };
                      model: {
                        name: string;
                      };
                      color: {
                        name: string;
                      };
                      size: string;
                    }) => `
                      <tr>
                        <td>${product.model.name}</td>
                        <td>${product.size}</td>
                        <td>1</td> <!-- Asumiendo que la cantidad es siempre 1 -->
                        <td>$${product.priceAtSale}</td>
                      </tr>
                    `
                  )
                  .join('')}
                </tbody>
              </table>
              <div class="invoice-total">
                <p><strong>TOTAL A PAGAR:</strong> $${
                  response.data.registerSale.price
                }</p>
              </div>
              <div class="invoice-footer">
                <p>¡Somos Home Run!</p>
                <p>¡Gracias por su compra!</p>
                <p>fix2k25@gmail.com</p>
                <p>=======================</p>
              </div>
            </div>
          </body>
        </html>
      `;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(invoiceContent);
          printWindow.document.close();

          // 🔹 Llamar al diálogo de impresión
          printWindow.print();
        }

        setShow(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(
        'Error al registrar la venta. Por favor, inténtelo de nuevo.'
      );
    }
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white-1/30 backdrop-blur-sm">
      <div className="bg-gray-2 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Venta</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
                onChange={e =>
                  handleProductChange(index, 'price', e.target.value)
                }
                className="w-1/2 p-2 border rounded"
                required
              />
              <span
                onClick={() => handleRemoveProduct(index)}
                className="p-2 material-icons cursor-pointer"
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
              text={'Registrar Venta'}
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

export default ModalSale;
