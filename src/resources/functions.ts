import QRCode from 'qrcode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { QRCodeData } from '@/resources/types/general-types';

export const generateAndDownloadQRCodes = async (
  dataArray: QRCodeData[]
): Promise<void> => {
  const zip = new JSZip();

  for (const item of dataArray) {
    try {
      if (
        !item.id ||
        !item.brand?.name ||
        !item.model?.name ||
        !item.color?.name ||
        !item.size
      ) {
        console.error(`Datos inválidos para ${item.id}:`, item);
        continue;
      }

      const qrContent = JSON.stringify({
        id: item.id,
        brand: item.brand.name,
        model: item.model.name,
        color: item.color.name,
        size: item.size,
      });

      const labelLine1 = `${item.id}-${item.brand.name}`;
      const labelLine2 = `${item.model.name}-${item.color.name}-${item.size}`;

      const paperWidth = 284; // 75 mm ≈ 284 px
      const paperHeight = 170; // 49 mm ≈ 185 px
      const qrSize = 135;
      const marginTop = 1; // Margen superior

      const canvas = document.createElement('canvas');
      canvas.width = paperWidth;
      canvas.height = paperHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('No se pudo obtener el contexto del canvas');

      const qrCodeDataUrl: string = await QRCode.toDataURL(qrContent, {
        width: qrSize,
        margin: 1,
      });

      const qrImage = new Image();
      qrImage.src = qrCodeDataUrl;

      await new Promise(resolve => (qrImage.onload = resolve));

      ctx.clearRect(0, 0, paperWidth, paperHeight);

      // Posicionar el QR ocupando el máximo espacio posible
      const qrX = (paperWidth - qrSize) / 2;
      ctx.drawImage(qrImage, qrX, marginTop, qrSize, qrSize);

      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';

      const textYStart = qrSize + marginTop + 15;
      const lineSpacing = 15;

      ctx.fillText(labelLine1, paperWidth / 2, textYStart, paperWidth - 20);
      ctx.fillText(
        labelLine2,
        paperWidth / 2,
        textYStart + lineSpacing,
        paperWidth - 20
      );

      const blob: Blob = await new Promise(resolve =>
        canvas.toBlob(b => b && resolve(b), 'image/png')
      );

      zip.file(`${item.id}.png`, blob, { binary: true });
    } catch (error) {
      console.error(`Error generando el QR para ${item.id}:`, error);
    }
  }

  try {
    const now = new Date();
    const formattedDate = `${now.getDate()}-${
      now.getMonth() + 1
    }-${now.getFullYear()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;

    const zipBlob: Blob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, `qrs_${formattedDate}.zip`);
  } catch (error) {
    console.error('Error generando el archivo ZIP:', error);
  }
};
