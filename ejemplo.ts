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