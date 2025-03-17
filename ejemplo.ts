// import { useRef, useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// const RegisterPresentation = () => {
//     const qrRef = useRef<HTMLCanvasElement>(null);
//     const [qrImage, setQrImage] = useState<string | null>(null); // Previsualización
//     const DPI = 300; // Resolución para impresión

//     // Tamaño estático del QR en píxeles
//     const staticSizePX = 150; // Tamaño fijo en píxeles

//     // Datos del objeto a convertir en QR
//     const userData = {
//         id: "20297168", // Texto personalizable
//         marca: "Adidas",
//         modelo: "Superstar",
//         color: "Blanco",
//         talla: "42",
//     };

//     const qrValue = JSON.stringify(userData);

//     // Generar la imagen del QR con fondo transparente y texto debajo
//     const generateQrImage = () => {
//         if (!qrRef.current) return;

//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         // Espacio para el texto debajo del QR
//         const textHeight = 30; // Altura del texto
//         canvas.width = staticSizePX;
//         canvas.height = staticSizePX + textHeight;

//         // Fondo transparente
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // Dibujar el QR en el nuevo canvas
//         const qrCanvas = qrRef.current;
//         ctx.drawImage(qrCanvas, 0, 0, staticSizePX, staticSizePX);

//   // Dibujar el texto debajo del QR en dos renglones
// ctx.font = "bold 10px Arial";
// ctx.fillStyle = "black";
// ctx.textAlign = "center";

// // Primera línea de texto
// const firstLine = ` ${userData.marca} - ${userData.modelo}`;
// ctx.fillText(
//     firstLine,
//     canvas.width / 2, // Centrado horizontalmente
//     staticSizePX + 10 // Posición vertical de la primera línea
// );

// // Segunda línea de texto
// const secondLine = `${userData.id} -${userData.color} - ${userData.talla}`;
// ctx.fillText(
//     secondLine,
//     canvas.width / 2, // Centrado horizontalmente
//     staticSizePX + 20 // Posición vertical de la segunda línea
// );

//         // Convertir a imagen para previsualización
//         const qrImageURL = canvas.toDataURL("image/png");
//         setQrImage(qrImageURL);
//     };

//     // Descargar la imagen generada
//     const handleDownloadQR = () => {
//         if (!qrImage) return;

//         const link = document.createElement("a");
//         link.href = qrImage;
//         link.download = "qr-code.png";
//         link.click();
//     };

//     // Generar QR al cargar el componente
//     useEffect(() => {
//         generateQrImage();
//     }, []);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-600">
//             <h1 className="text-2xl font-bold mb-4">Generador de QR</h1>

//             {/* Código QR oculto */}
//             <QRCodeCanvas
//                 value={qrValue}
//                 size={staticSizePX}
//                 ref={qrRef}
//                 className="hidden"
//                 bgColor="transparent" // Fondo transparente
//                 fgColor="black" // Color del QR
//             />

//             {/* Previsualización del QR generado */}
//             {qrImage && (
//                 <div className="p-4 bg-white shadow-lg rounded-lg">
//                     <img src={qrImage} alt="QR Code Preview" className="w-full h-auto rounded-2xl" />
//                 </div>
//             )}

//             {/* Botón para descargar */}
//             <button
//                 onClick={handleDownloadQR}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//             >
//                 Descargar QR con Texto
//             </button>
//         </div>
//     );
// };

// export default RegisterPresentation;

'use client';
// import RegisterPresentation from './register-presentation';
// import { useQuery, useMutation } from '@apollo/client';
// import {
//   FIND_ALL_BRANDS,
//   FIND_ALL_COLORS,
//   FIND_ALL_MODELS,
//   GET_ALL_PRODUCTS,
//   GET_PRODUCT_BY_ID,
//   SHOES_IN_STORE,
//   SHOES_IN_WAREHOUSE,
//   SOLD_SHOES,
//   CREATE_BRAND,
//   CREATE_MODEL,
//   CREATE_COLOR,
//   CREATE_PRODUCTS,
// } from '../../services/graphql-request';
// import { useEffect } from 'react';

// const RegisterContainer = () => {
//   const { data: brands } = useQuery(FIND_ALL_BRANDS);
//   const { data: colors } = useQuery(FIND_ALL_COLORS);
//   const { data } = useQuery(FIND_ALL_MODELS);
//   const { data: products } = useQuery(GET_ALL_PRODUCTS);
//   const { data: shoesInStore } = useQuery(SHOES_IN_STORE);
//   const { data: shoesInWarehouse } = useQuery(SHOES_IN_WAREHOUSE);
//   const { data: soldShoes } = useQuery(SOLD_SHOES);
//   const { data: productById } = useQuery(GET_PRODUCT_BY_ID, {
//     variables: { id: 26642 },
//   });

//   const [createModel] = useMutation(CREATE_MODEL);
//   const [createBrand] = useMutation(CREATE_BRAND);
//   const [createColor] = useMutation(CREATE_COLOR);
//   const [createProducts] = useMutation(CREATE_PRODUCTS);

//   useEffect(() => {
//     createProducts({
//       variables: {
//         createProductInput: {
//           products: [
//             {
//               brand: 'Puma',
//               model: 'Timon',
//               color: 'Scarlet',
//               pares: 10,
//               size: 48,
//             },
//           ],
//         },
//       },
//     });
//   }, [createProducts]);

//   useEffect(() => {
//     createBrand({
//       variables: {
//         createBrandInput: {
//           name: 'Puma', // El campo `name` debe estar dentro de `input`
//         },
//       },
//     });
//   }, [createBrand]);

//   useEffect(() => {
//     createModel({
//       variables: {
//         createModelInput: {
//           name: 'Timon', // El campo `name` debe estar dentro de `input`
//         },
//       },
//     });
//   }, [createModel]);

//   useEffect(() => {
//     createColor({
//       variables: {
//         createColorInput: {
//           name: 'Scarlet', // El campo `name` debe estar dentro de `input`
//         },
//       },
//     });
//   }, [createColor]);

//   useEffect(() => {
//     createProducts({
//       variables: {
//         products: [
//           {
//             brand: 'Puma',
//             model: 'Timon',
//             color: 'Scarlet',
//             pares: 10,
//             size: '48',
//           },
//         ],
//       },
//     });
//   }, [createProducts]);

//   useEffect(() => {
//     console.log('brands', brands);
//   }, [brands]);

//   useEffect(() => {
//     console.log('colors', colors);
//   }, [colors]);

//   useEffect(() => {
//     console.log('models', data);
//   }, [data]);

//   useEffect(() => {
//     console.log('products', products);
//   }, [products]);

//   useEffect(() => {
//     console.log('shoesInStore', shoesInStore);
//   }, [shoesInStore]);

//   useEffect(() => {
//     console.log('shoesInWarehouse', shoesInWarehouse);
//   }, [shoesInWarehouse]);

//   useEffect(() => {
//     console.log('soldShoes', soldShoes);
//   }, [soldShoes]);

//   useEffect(() => {
//     console.log('productById', productById);
//   }, [productById]);

//   return (
//     <div>
//       <RegisterPresentation />
//     </div>
//   );
// };

// export default RegisterContainer;
